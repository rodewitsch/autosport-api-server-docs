import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Exclude, Expose, Transform } from 'class-transformer';
import { IsEnum, IsInt, IsOptional } from 'class-validator';
import { RaceType } from 'general/enums/race-types.enum';
import { Translations } from 'general/interfaces/translations.interface';
import { enumToString } from 'general/utils/enum-to-string.utils';
import { getTranslation } from 'general/utils/translation.utils';

export class GetDriverRecordsQueryDtoV1 {
  @ApiPropertyOptional({
    description: `Race type: ${enumToString(RaceType)}`,
    enum: RaceType,
    default: 1,
  })
  @Transform(({ value }) => value && +value)
  @IsEnum(RaceType)
  @IsOptional()
  c_race_type?: RaceType;

  @ApiProperty({
    description: 'Event year',
  })
  @Transform(({ value }) => value && +value)
  @IsInt()
  year: number;
}

@Exclude()
export class GetDriverTimeAttackRecordsResponseDtoV1 {
  @Expose()
  @ApiProperty({
    description: 'Vehicle id',
  })
  vehicle_id: number;

  @Expose()
  @ApiProperty({
    description: 'Vehicle name',
  })
  vehicle_name: string;

  @Expose()
  @ApiProperty({
    description: 'Location id',
  })
  location_id: number;

  @Expose()
  @ApiProperty({
    description: 'Location name',
    type: 'string',
  })
  @Transform(({ value }) => getTranslation(value))
  location_name: Translations;

  @Expose()
  @ApiProperty({
    description: 'Location config id',
  })
  location_config_id: number;

  @Expose()
  @ApiProperty({
    description: 'Location config name',
    type: 'string',
  })
  @Transform(({ value }) => getTranslation(value))
  location_config_name: Translations;

  @Expose()
  @ApiProperty({
    description: 'Tires id',
  })
  tires_id: number;

  @Expose()
  @ApiProperty({
    description: 'Tires name',
    type: 'string',
  })
  @Transform(({ value }) => value || 'N/A')
  tires_name: string;

  @Expose()
  @ApiProperty({
    description: 'Lap time',
  })
  @Transform(({ value }) => value && value.padEnd(9, '0'))
  lap_time: string;

  constructor(partial: Partial<GetDriverTimeAttackRecordsResponseDtoV1>) {
    Object.assign(this, partial);
  }
}
