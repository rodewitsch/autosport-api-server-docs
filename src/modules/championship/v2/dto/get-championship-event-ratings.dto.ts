import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose, Transform, Type } from 'class-transformer';
import { Translations } from 'general/interfaces/translations.interface';
import { getTranslation } from 'general/utils/translation.utils';

@Exclude()
export class GetTimeAttackChampionshipEventRatingRecordsResponseDtoV2 {
  @Expose()
  @ApiProperty({
    description: 'Driver ID',
    type: 'number',
  })
  driver_id: number;

  @Expose()
  @ApiProperty({
    description: 'Event member class id',
  })
  event_member_class_id: number;

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
  @Transform(({ value }) => getTranslation(value))
  first_name: Translations;

  @Expose()
  @ApiProperty({
    description: 'Driver last name',
    type: 'string',
  })
  @Transform(({ value }) => getTranslation(value))
  last_name: Translations;

  @Expose()
  @ApiProperty({
    description: 'Vehicle name',
    type: 'string',
  })
  @Transform(({ value }) => value || '')
  vehicle_name: string;

  @Expose()
  @ApiProperty({
    description: 'Best lap time',
  })
  lap_time: string;

  @Expose()
  @ApiProperty({
    description: 'Canceled result',
  })
  canceled: boolean;

  @Expose()
  @ApiProperty({
    description: 'Place',
  })
  place: number;

  @Expose({ name: 'photo_url' })
  @ApiProperty({
    description: 'Driver photo url',
    type: 'string',
  })
  @Transform(({ obj }) => (obj.photo ? `/api/v2/drivers/${obj.driver_id}/photo?d=${obj.driver_updated_at}` : null))
  photo: boolean;

  @Expose()
  @ApiProperty({
    description: 'Points',
  })
  @Transform(({ value }) => (value !== null && value !== undefined ? Number(value) : value))
  points: number;

  @Expose()
  @ApiProperty({
    description: 'Sign of results absence',
  })
  no_results: boolean;

  constructor(partial: Partial<GetTimeAttackChampionshipEventRatingRecordsResponseDtoV2>) {
    Object.assign(this, partial);
  }
}

@Exclude()
export class GetTimeAttackChampionshipEventRatingResponseDtoV2 {
  @Expose({ name: 'class_id' })
  @ApiProperty({
    name: 'class_id',
    description: 'Championship class id',
  })
  championship_class_id: number;

  @Expose({ name: 'name' })
  @ApiProperty({
    name: 'name',
    description: 'Championship class name',
    type: 'string',
  })
  championship_class_name: string;

  @Expose({ name: 'color' })
  @ApiProperty({
    name: 'color',
    description: 'Championship class color',
  })
  championship_class_color: string;

  @Expose()
  @ApiProperty({
    description: 'Championship event records',
    type: [GetTimeAttackChampionshipEventRatingRecordsResponseDtoV2],
  })
  @Type(() => GetTimeAttackChampionshipEventRatingRecordsResponseDtoV2)
  records: GetTimeAttackChampionshipEventRatingRecordsResponseDtoV2[];

  constructor(partial: Partial<GetTimeAttackChampionshipEventRatingResponseDtoV2>) {
    Object.assign(this, partial);
  }
}
