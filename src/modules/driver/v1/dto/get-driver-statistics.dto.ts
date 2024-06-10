import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Exclude, Expose, Transform } from 'class-transformer';
import { IsInt } from 'class-validator';
import { Translations } from 'general/interfaces/translations.interface';
import { getTranslation } from 'general/utils/translation.utils';
import { GetDriverRaceTypeRecordsResponseDtoV1 } from './get-driver-rating.dto';
import { GetDriverTimeAttackRecordsResponseDtoV1 } from './get-driver-records.dto';

export class GetDriverStatisticsQueryDtoV1 {
  @ApiProperty({
    description: 'Statistics year',
  })
  @Transform(({ value }) => value && +value)
  @IsInt()
  year: number;
}

@Exclude()
export class DriverResponseDtoV1 {
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
  @Transform(({ value }) => getTranslation(value))
  first_name: Translations;

  @Expose()
  @ApiProperty({
    description: 'Last name',
    type: 'string',
  })
  @Transform(({ value }) => getTranslation(value))
  last_name: Translations;

  @Expose({ name: 'photo_url' })
  @ApiProperty({
    name: 'photo_url',
    description: 'Photo url',
  })
  @Transform(({ obj }) =>
    obj.driver_photo_id ? `/api/v1/drivers/${obj.driver_id}/photo?d=${obj.updated_at.valueOf()}` : null,
  )
  driver_photo_id: number;

  @Expose()
  @ApiPropertyOptional({
    description: 'Main vehicle id',
  })
  vehicle_id?: number;

  @Expose()
  @ApiPropertyOptional({
    description: 'Main vehicle name',
  })
  @Transform(({ value }) => value || '')
  vehicle_name?: string;

  constructor(partial: Partial<DriverResponseDtoV1>) {
    Object.assign(this, partial);
  }
}

@Exclude()
export class DriverStatisticsDtoV1 {
  @Expose()
  @ApiProperty({
    description: 'Race type (code)',
  })
  c_race_type: number;

  @Expose()
  @ApiProperty({
    description: 'Race type',
  })
  @Transform(({ value }) => getTranslation(value))
  race_type: Translations;

  @Expose()
  @ApiProperty({
    description: 'Ratings',
    type: GetDriverRaceTypeRecordsResponseDtoV1,
  })
  @Transform(({ value }) => value && new GetDriverRaceTypeRecordsResponseDtoV1(value))
  rating: GetDriverRaceTypeRecordsResponseDtoV1;

  @Expose()
  @ApiProperty({
    description: 'Driver records',
    type: [GetDriverTimeAttackRecordsResponseDtoV1],
  })
  @Transform(({ value }) => value && value.map((record) => new GetDriverTimeAttackRecordsResponseDtoV1(record)))
  records: GetDriverTimeAttackRecordsResponseDtoV1[];

  constructor(partial: Partial<DriverStatisticsDtoV1>) {
    Object.assign(this, partial);
  }
}

@Exclude()
export class GetDriverStatisticsResponseDtoV1 {
  @Expose()
  @ApiProperty({
    description: 'Driver',
    type: DriverResponseDtoV1,
  })
  @Transform(({ value }) => value && new DriverResponseDtoV1(value))
  driver: DriverResponseDtoV1;

  @Expose()
  @ApiPropertyOptional({
    description: 'Statistics',
    type: [DriverStatisticsDtoV1],
  })
  @Transform(({ value }) => value && value.map((item) => new DriverStatisticsDtoV1(item)))
  statistics?: DriverStatisticsDtoV1[] = [];

  constructor(partial: Partial<GetDriverStatisticsResponseDtoV1>) {
    Object.assign(this, partial);
  }
}
