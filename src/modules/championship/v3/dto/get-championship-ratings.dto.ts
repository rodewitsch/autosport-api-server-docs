import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose, Transform, Type } from 'class-transformer';
import { Translations } from 'general/interfaces/translations.interface';
import { getTranslation } from 'general/utils/translation.utils';

@Exclude()
export class TimeAttackChampionshipEventResponseDtoV3 {
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

  constructor(partial: Partial<TimeAttackChampionshipEventResponseDtoV3>) {
    Object.assign(this, partial);
  }
}

@Exclude()
export class TimeAttackChampionshipRatingRecordResponseDtoV3 {
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
  @Transform(({ obj }) => (obj.photo ? `/api/v3/drivers/${obj.driver_id}/photo?d=${obj.driver_updated_at}` : null))
  photo: boolean;

  @Expose()
  @ApiProperty({
    description: 'Points',
  })
  points: number;

  @Expose()
  @ApiProperty({
    description: 'Events',
    type: [TimeAttackChampionshipEventResponseDtoV3],
  })
  @Transform(({ value }) => value.map((event) => new TimeAttackChampionshipEventResponseDtoV3(event)))
  @Type(() => TimeAttackChampionshipEventResponseDtoV3)
  events: TimeAttackChampionshipEventResponseDtoV3[];

  constructor(partial: Partial<TimeAttackChampionshipRatingRecordResponseDtoV3>) {
    Object.assign(this, partial);
  }
}

@Exclude()
export class GetTimeAttackChampionshipRatingResponseDtoV3 {
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
    type: [TimeAttackChampionshipRatingRecordResponseDtoV3],
  })
  @Transform(({ value }) => value.map((record) => new TimeAttackChampionshipRatingRecordResponseDtoV3(record)))
  @Type(() => TimeAttackChampionshipRatingRecordResponseDtoV3)
  records: TimeAttackChampionshipRatingRecordResponseDtoV3[];

  constructor(partial: Partial<GetTimeAttackChampionshipRatingResponseDtoV3>) {
    Object.assign(this, partial);
  }
}
