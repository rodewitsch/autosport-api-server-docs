import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Exclude, Expose, Transform, Type } from 'class-transformer';
import { IsNumber, IsOptional } from 'class-validator';
import { Translations } from 'general/interfaces/translations.interface';
import { getTranslation } from 'general/utils/translation.utils';

export enum EventResultsType {
  BEST = 1,
  ALL = 2,
}

export class GetEventResultsQueryDtoV1 {
  @ApiProperty({
    description: 'Type of results. 1 - BEST, 2 - ALL',
    enum: EventResultsType,
  })
  @Transform(({ value }) => Number(value))
  type: EventResultsType;

  @ApiPropertyOptional({
    description: 'Driver ID',
    type: 'number',
  })
  @Transform(({ value }) => Number(value))
  @IsOptional()
  @IsNumber()
  driver_id?: number;

  @ApiPropertyOptional({
    description: 'Drive type',
  })
  @IsOptional()
  @Transform(({ value }) => Number(value))
  c_drive_type?: number;
}

@Exclude()
export class GetTimeAttackResultDriverResponseDtoV1 {
  @Expose()
  @ApiProperty({
    description: 'Driver ID',
    type: 'number',
  })
  driver_id: number;

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

  constructor(partial: Partial<GetTimeAttackResultDriverResponseDtoV1>) {
    Object.assign(this, partial);
  }
}

@Exclude()
export class GetTimeAttackResultsResponseDtoV1 {
  @Expose()
  @ApiProperty({
    description: 'Group number',
  })
  number: number;

  @Expose()
  @ApiProperty({
    description: 'Group records',
    type: [GetTimeAttackResultDriverResponseDtoV1],
  })
  @Type(() => GetTimeAttackResultDriverResponseDtoV1)
  records: GetTimeAttackResultDriverResponseDtoV1[];

  constructor(partial: Partial<GetTimeAttackResultsResponseDtoV1>, lang?: string) {
    Object.assign(this, partial, { i18n: { lang } });
  }
}
