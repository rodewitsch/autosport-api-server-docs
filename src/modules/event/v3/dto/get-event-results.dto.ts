import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Exclude, Expose, Transform, Type } from 'class-transformer';
import { IsNumber, IsOptional } from 'class-validator';
import { Translations } from 'general/interfaces/translations.interface';
import { getTranslation } from 'general/utils/translation.utils';

export enum EventResultsType {
  BEST = 1,
  ALL = 2,
}

export class GetEventResultsQueryDtoV3 {
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

  @ApiPropertyOptional({
    description: 'Vehicle power density class ID',
  })
  @IsOptional()
  @Transform(({ value }) => Number(value))
  power_den_class_id?: number;

  @ApiPropertyOptional({
    description: 'ID of race class',
  })
  @Transform(({ value }) => Number(value))
  @IsOptional()
  @IsNumber()
  class_id?: number;
}

@Exclude()
export class TimeAttackResultClassesResponseDtoV3 {
  @Expose()
  @ApiProperty({
    description: 'Class ID',
    type: 'number',
  })
  championship_class_id: number;

  @Expose()
  @ApiProperty({
    description: 'Class name',
    type: 'string',
  })
  name: string;

  @Expose()
  @ApiProperty({
    description: 'Class color',
    type: 'string',
  })
  color: string;

  constructor(partial: Partial<TimeAttackResultClassesResponseDtoV3>) {
    Object.assign(this, partial);
  }
}

@Exclude()
export class GetTimeAttackDriverResultsResponseDtoV3 {
  @Expose()
  @ApiPropertyOptional({
    description: 'Time attack result ID',
    type: 'string',
  })
  id?: string;

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

  constructor(partial: Partial<GetTimeAttackDriverResultsResponseDtoV3>, lang?: string) {
    Object.assign(this, partial, { i18n: { lang } });
  }
}

@Exclude()
export class GetTimeAttackResultDriverResponseDtoV3 {
  @Expose()
  @ApiPropertyOptional({
    description: 'Time attack result ID',
    type: 'string',
  })
  id?: string;

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
    description: 'Vehicle power density class ID',
  })
  power_den_class_id: number;

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
  @ApiPropertyOptional({
    description: 'Member classes',
    type: [TimeAttackResultClassesResponseDtoV3],
  })
  @Transform(({ value }) => value?.map((item) => new TimeAttackResultClassesResponseDtoV3(item)))
  classes?: TimeAttackResultClassesResponseDtoV3[];

  @Expose()
  @ApiProperty({
    description: 'Driver results',
    type: [GetTimeAttackDriverResultsResponseDtoV3],
  })
  @Type(() => GetTimeAttackDriverResultsResponseDtoV3)
  @Transform(({ value, obj }) => value.map((item) => new GetTimeAttackDriverResultsResponseDtoV3(item, obj.i18n?.lang)))
  results: GetTimeAttackDriverResultsResponseDtoV3[];

  constructor(partial: Partial<GetTimeAttackResultDriverResponseDtoV3>) {
    Object.assign(this, partial);
  }
}

@Exclude()
export class GetTimeAttackResultsResponseDtoV3 {
  @Expose()
  @ApiProperty({
    description: 'Group number',
  })
  number: number;

  @Expose()
  @ApiProperty({
    description: 'Group records',
    type: [GetTimeAttackResultDriverResponseDtoV3],
  })
  @Type(() => GetTimeAttackResultDriverResponseDtoV3)
  records: GetTimeAttackResultDriverResponseDtoV3[];

  constructor(partial: Partial<GetTimeAttackResultsResponseDtoV3>, lang?: string) {
    Object.assign(this, partial, { i18n: { lang } });
  }
}

@Exclude()
export class GetDragResultResponseDtoV3 {
  @Expose()
  @ApiPropertyOptional({
    description: 'Drag race ID',
    type: 'number',
  })
  id?: number;

  @Expose()
  @ApiPropertyOptional({
    description: 'Driver ID',
    type: 'number',
  })
  driver_id?: number;

  @Expose()
  @ApiProperty({
    description: 'Pilot number',
  })
  pilot_number: string;

  @Expose()
  @ApiProperty({
    description: 'Reaction time',
  })
  reaction_time: string;

  @Expose()
  @ApiProperty({
    description: 'Sixty feet',
  })
  sixty_feet: string;

  @Expose()
  @ApiProperty({
    description: 'Half distance elapsed time',
  })
  half_distance_elapsed_time: string;

  @Expose()
  @ApiProperty({
    description: 'Full distance elapsed time',
  })
  full_distance_elapsed_time: string;

  @Expose()
  @ApiProperty({
    description: 'Full time',
  })
  full_time: string;

  @Expose()
  @ApiProperty({
    description: 'Speed',
  })
  speed: string;

  @Expose()
  @ApiProperty({
    description: 'Canceled',
  })
  canceled: boolean;

  @Expose()
  @ApiProperty({
    description: 'Winner',
  })
  winner: boolean;

  @Expose()
  @ApiProperty({
    description: 'Lane number (code)',
  })
  c_lane: number;

  @Expose()
  @ApiProperty({
    description: 'Road condition (code)',
  })
  c_road_condition: number;
}

@Exclude()
export class GetDragResultsResponseDtoV3 {
  @Expose()
  @ApiProperty({
    description: 'Group number',
  })
  number: number;

  @Expose()
  @ApiProperty({
    description: 'Group number time',
  })
  date: Date;

  @Expose()
  @ApiProperty({
    description: 'Group records',
    type: [GetDragResultResponseDtoV3],
  })
  @Type(() => GetDragResultResponseDtoV3)
  records: GetDragResultResponseDtoV3[];

  constructor(partial: Partial<GetDragResultsResponseDtoV3>, lang?: string) {
    Object.assign(this, partial, { i18n: { lang } });
  }
}
