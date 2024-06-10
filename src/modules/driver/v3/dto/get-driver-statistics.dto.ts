import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Exclude, Expose, Transform } from 'class-transformer';
import { IsInt } from 'class-validator';
import { Translations } from 'general/interfaces/translations.interface';
import { getTranslation } from 'general/utils/translation.utils';
import { GetDriverRaceTypeRecordsResponseDtoV3 } from './get-driver-rating.dto';
import { GetDriverTimeAttackRecordsResponseDtoV3 } from './get-driver-records.dto';

export class GetDriverStatisticsQueryDtoV3 {
  @ApiProperty({
    description: 'Statistics year',
  })
  @Transform(({ value }) => value && +value)
  @IsInt()
  year: number;
}

@Exclude()
export class DriverResponseDtoV3 {
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
    obj.driver_photo_id ? `/api/v3/drivers/${obj.driver_id}/photo?d=${obj.updated_at.valueOf()}` : null,
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

  constructor(partial: Partial<DriverResponseDtoV3>) {
    Object.assign(this, partial);
  }
}

@Exclude()
export class DriverStatisticsDtoV3 {
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
    type: GetDriverRaceTypeRecordsResponseDtoV3,
  })
  @Transform(({ value }) => value && new GetDriverRaceTypeRecordsResponseDtoV3(value))
  rating: GetDriverRaceTypeRecordsResponseDtoV3;

  @Expose()
  @ApiProperty({
    description: 'Driver records',
    type: [GetDriverTimeAttackRecordsResponseDtoV3],
  })
  @Transform(({ value }) => value && value.map((record) => new GetDriverTimeAttackRecordsResponseDtoV3(record)))
  records: GetDriverTimeAttackRecordsResponseDtoV3[];

  constructor(partial: Partial<DriverStatisticsDtoV3>) {
    Object.assign(this, partial);
  }
}

@Exclude()
export class GetDriverStatisticsResponseDtoV3 {
  @Expose()
  @ApiProperty({
    description: 'Driver',
    type: DriverResponseDtoV3,
  })
  @Transform(({ value }) => value && new DriverResponseDtoV3(value))
  driver: DriverResponseDtoV3;

  @Expose()
  @ApiPropertyOptional({
    description: 'Statistics',
    type: [DriverStatisticsDtoV3],
  })
  @Transform(({ value }) => value && value.map((item) => new DriverStatisticsDtoV3(item)))
  statistics?: DriverStatisticsDtoV3[] = [];

  constructor(partial: Partial<GetDriverStatisticsResponseDtoV3>) {
    Object.assign(this, partial);
  }
}
