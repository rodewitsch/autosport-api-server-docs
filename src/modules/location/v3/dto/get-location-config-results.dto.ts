import { ApiProperty, ApiPropertyOptional, OmitType } from '@nestjs/swagger';
import { Expose, Transform } from 'class-transformer';
import { IsEnum, IsInt, IsOptional, Max, Min } from 'class-validator';
import { RaceType } from 'general/enums/race-types.enum';
import { Translations } from 'general/interfaces/translations.interface';
import { enumToString } from 'general/utils/enum-to-string.utils';
import { getTranslation } from 'general/utils/translation.utils';
import { GetEventResultsQueryDtoV3 } from '../../../event/v3/dto/get-event-results.dto';

export class GetLocationConfigResultsQueryDtoV3 extends OmitType(GetEventResultsQueryDtoV3, ['type']) {
  @ApiProperty({
    description: `Race type: ${enumToString(RaceType)}`,
    enum: RaceType,
  })
  @Transform(({ value }) => value && +value)
  @IsEnum(RaceType)
  c_race_type: RaceType;

  @ApiPropertyOptional({
    description: 'Event year',
  })
  @Transform(({ value }) => value && +value)
  @IsInt()
  @IsOptional()
  year?: number;

  @ApiPropertyOptional({
    description: 'Number of records',
  })
  @Transform(({ value }) => value && +value)
  @IsInt()
  @IsOptional()
  @Max(100)
  @Min(1)
  count?: number;

  @ApiPropertyOptional({
    description: 'Road condition (code)',
  })
  @Transform(({ value }) => value && +value)
  @IsInt()
  @IsOptional()
  c_road_condition?: number;
}

export class GetLocationConfigTimeAttackResultsResponseDtoV3 {
  @Expose()
  @ApiProperty({
    description: 'Driver ID',
    type: 'number',
  })
  driver_id: number;

  @Expose()
  @ApiProperty({
    description: 'Event ID',
    type: 'number',
  })
  event_id: number;

  @Expose()
  @ApiProperty({
    description: 'Vehicle ID',
    type: 'number',
  })
  vehicle_id: number;

  @Expose()
  @ApiProperty({
    description: 'Driver first name',
    type: 'string',
  })
  @Transform(({ value, obj }) => getTranslation(value, obj.i18n?.lang))
  first_name: Translations;

  @Expose()
  @ApiProperty({
    description: 'Driver last name',
    type: 'string',
  })
  @Transform(({ value, obj }) => getTranslation(value, obj.i18n?.lang))
  last_name: Translations;

  @Expose()
  @ApiProperty({
    description: 'Vehicle name',
    type: 'string',
  })
  vehicle_name: string;

  @Expose()
  @ApiProperty({
    description: 'Tires name',
    type: 'string',
  })
  tires_name: string;

  @Expose()
  @ApiProperty({
    description: 'Lap number',
  })
  lap_number: number;

  @Expose()
  @ApiProperty({
    description: 'Lap time',
  })
  @Transform(({ value }) => value && value.padEnd(9, '0'))
  lap_time: string;

  @Expose()
  @ApiProperty({
    description: 'Best result',
  })
  best_result: boolean;

  @Expose()
  @ApiProperty({
    description: 'Penalty time (seconds)',
  })
  @Transform(({ value }) => Number(value))
  penalty_time: number;

  @Expose()
  @ApiProperty({
    description: 'Canceled',
  })
  @Transform(({ value }) => Boolean(value))
  canceled: boolean;

  @Expose()
  @ApiProperty({
    description: 'Road condition (code)',
  })
  c_road_condition: number;

  @Expose()
  @ApiPropertyOptional({
    description: 'Vehicle power density class ID (for time-attack events)',
  })
  power_den_class_id?: number;

  constructor(partial: Partial<GetLocationConfigTimeAttackResultsResponseDtoV3>) {
    Object.assign(this, partial);
  }
}

export class GetLocationConfigDragRaceResultsResponseDtoV3 extends GetLocationConfigTimeAttackResultsResponseDtoV3 {
  @Expose()
  @ApiProperty({
    description: 'Lap time',
  })
  @Transform(({ value }) => value && value.substring(0, 6))
  lap_time: string;

  constructor(partial: Partial<GetLocationConfigDragRaceResultsResponseDtoV3>) {
    super(partial);
    Object.assign(this, partial);
  }
}
