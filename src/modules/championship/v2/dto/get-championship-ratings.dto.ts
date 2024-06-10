import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose, Transform, Type } from 'class-transformer';
import { Translations } from 'general/interfaces/translations.interface';
import { getTranslation } from 'general/utils/translation.utils';

@Exclude()
export class TimeAttackChampionshipEventResponseDtoV2 {
  @Expose()
  @ApiProperty({
    description: 'Event ID',
    type: 'number',
  })
  event_id: number;

  @Expose({ name: 'name' })
  @ApiProperty({
    name: 'name',
    description: 'Event name',
    type: 'string',
  })
  @Transform(({ value }) => getTranslation(value))
  event_name: Translations;

  @Expose()
  @ApiProperty({
    description: 'Event points',
    type: 'number',
  })
  @Transform(({ value }) => (value !== null && value !== undefined ? Number(value) : value))
  points: number;

  @Expose()
  @ApiProperty({
    description: 'Event place',
    type: 'number',
  })
  place: number;

  constructor(partial: Partial<TimeAttackChampionshipEventResponseDtoV2>) {
    Object.assign(this, partial);
  }
}

@Exclude()
export class TimeAttackChampionshipRatingRecordResponseDtoV2 {
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
    description: 'Place',
  })
  place: number;

  @Expose({ name: 'photo_url' })
  @ApiProperty({
    name: 'photo_url',
    description: 'Driver photo url',
    type: 'string',
  })
  @Transform(({ obj }) => (obj.photo ? `/api/v2/drivers/${obj.driver_id}/photo?d=${obj.driver_updated_at}` : null))
  photo: boolean;

  @Expose()
  @ApiProperty({
    description: 'Points',
  })
  points: number;

  @Expose()
  @ApiProperty({
    description: 'Events',
    type: [TimeAttackChampionshipEventResponseDtoV2],
  })
  @Transform(({ value }) => value.map((event) => new TimeAttackChampionshipEventResponseDtoV2(event)))
  @Type(() => TimeAttackChampionshipEventResponseDtoV2)
  events: TimeAttackChampionshipEventResponseDtoV2[];

  constructor(partial: Partial<TimeAttackChampionshipRatingRecordResponseDtoV2>) {
    Object.assign(this, partial);
  }
}

@Exclude()
export class GetTimeAttackChampionshipRatingResponseDtoV2 {
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
    type: [TimeAttackChampionshipRatingRecordResponseDtoV2],
  })
  @Transform(({ value }) => value.map((record) => new TimeAttackChampionshipRatingRecordResponseDtoV2(record)))
  @Type(() => TimeAttackChampionshipRatingRecordResponseDtoV2)
  records: TimeAttackChampionshipRatingRecordResponseDtoV2[];

  constructor(partial: Partial<GetTimeAttackChampionshipRatingResponseDtoV2>) {
    Object.assign(this, partial);
  }
}
