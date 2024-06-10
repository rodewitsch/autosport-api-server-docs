import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Exclude, Expose, Transform } from 'class-transformer';
import { IsNumber, IsOptional } from 'class-validator';
import { Translations } from 'general/interfaces/translations.interface';
import { getTranslation } from 'general/utils/translation.utils';

export class GetEventMembersForDistributionQueryDtoV1 {
  @ApiPropertyOptional({
    description: 'Grouped results (any value)',
  })
  grouped: string;
}

export class ChangeEventMemberDistributionBodyDtoV1 {
  @ApiPropertyOptional({
    description: 'Start number',
    example: 1,
  })
  @IsNumber()
  @IsOptional()
  start_num?: string;

  @ApiPropertyOptional({
    description: 'Group number',
    example: 1,
  })
  @IsNumber()
  @IsOptional()
  c_group_num?: number;
}

@Exclude()
export class GetEventMemberDistributionResponseDtoV1 {
  @Expose()
  @ApiProperty({
    description: 'Driver ID',
    type: 'number',
  })
  driver_id: number;

  @Expose()
  @ApiProperty({
    description: 'First name',
    type: 'string',
  })
  @Transform(({ value, obj }) => getTranslation(value, obj?.i18n?.lang))
  first_name: Translations;

  @Expose()
  @ApiProperty({
    description: 'Last name',
    type: 'string',
  })
  @Transform(({ value, obj }) => getTranslation(value, obj?.i18n?.lang))
  last_name: Translations;

  @ApiProperty({
    description: 'Event id',
  })
  event_id: number;

  @Expose()
  @ApiProperty({
    description: 'Vehicle id',
  })
  vehicle_id: number;

  @Expose()
  @ApiProperty({
    description: 'Vehicle name',
    type: 'string',
  })
  @Transform(({ value }) => value || '')
  vehicle_name: string;

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
  @Transform(({ value }) => value || '')
  tires_name: string;

  @Expose()
  @ApiProperty({
    description: 'Drive type (code)',
    type: 'number',
  })
  c_drive_type: number;

  @Expose()
  @ApiProperty({
    description: 'Drive type',
    type: 'string',
  })
  @Transform(({ value, obj }) => getTranslation(value, obj?.i18n?.lang))
  drive_type: Translations;

  @Expose()
  @ApiProperty({
    description: 'Check in status',
  })
  check_in: boolean;

  @Expose()
  @ApiProperty({
    description: 'Start number',
    type: 'string',
  })
  start_num: number;

  @Expose()
  @ApiProperty({
    description: 'Group number (code)',
  })
  c_group_num: number;

  @Expose()
  @ApiProperty({
    description: 'Group number',
    type: 'string',
  })
  @Transform(({ value, obj }) => getTranslation(value, obj?.i18n?.lang))
  group_num: Translations;

  @Expose()
  @ApiProperty({
    description: 'Best result',
  })
  @Transform(({ value }) => value && value.padEnd(9, '0'))
  best_result: string;

  constructor(partial: Partial<GetEventMemberDistributionResponseDtoV1>, lang?: string) {
    Object.assign(this, partial, { i18n: { lang } });
  }
}

@Exclude()
export class GetGroupedEventMemberDistributionResponseDtoV1 {
  @Expose()
  @ApiProperty({
    description: 'Group number (code)',
  })
  c_group_num: number;

  @Expose()
  @ApiProperty({
    description: 'Group number',
    type: 'string',
  })
  @Transform(({ value }) => getTranslation(value))
  group_num: Translations;

  @Expose()
  @ApiProperty({
    description: 'Members',
    type: [GetEventMemberDistributionResponseDtoV1],
  })
  @Transform(({ value }) => value.map((member) => new GetEventMemberDistributionResponseDtoV1(member)))
  members: GetEventMemberDistributionResponseDtoV1[];

  constructor(partial: Partial<GetGroupedEventMemberDistributionResponseDtoV1>) {
    Object.assign(this, partial);
  }
}
