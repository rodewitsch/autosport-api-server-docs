import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Exclude, Expose, Transform, Type } from 'class-transformer';
import { Translations } from 'general/interfaces/translations.interface';
import { getTranslation } from 'general/utils/translation.utils';

@Exclude()
export class EventMemberClassesResponseDtoV3 {
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

  constructor(partial: Partial<EventMemberClassesResponseDtoV3>) {
    Object.assign(this, partial);
  }
}

@Exclude()
export class EventMemberVehicleInfoDtoV3 {
  @Expose({ name: 'id' })
  @ApiProperty({
    description: 'Vehicle id',
    name: 'id',
  })
  @Transform(({ value }) => Number(value))
  vehicle_id: number;

  @Expose({ name: 'name' })
  @ApiProperty({
    description: 'Vehicle name',
    type: 'string',
    name: 'name',
  })
  @Transform(({ value }) => value || '')
  vehicle_name: string;

  @Expose()
  @ApiProperty({
    description: 'Power',
  })
  power: number;

  @Expose()
  @ApiProperty({
    description: 'Weight',
  })
  weight: number;

  @Expose()
  @ApiPropertyOptional({
    description: 'Power density class id (only for TimeAttack)',
  })
  power_den_class_id?: number;

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
    description: 'Engine type (code)',
    type: 'number',
  })
  c_engine_type: number;

  @Expose()
  @ApiProperty({
    description: 'Engine type',
    type: 'string',
  })
  @Transform(({ value, obj }) => value && getTranslation(value, obj?.i18n?.lang))
  engine_type: Translations;

  @Expose({ name: 'photo_url' })
  @ApiProperty({
    description: 'Vehicle photo url',
    type: 'string',
    name: 'photo_url',
  })
  @Transform(({ obj }) =>
    obj.vehicle_photo
      ? `/api/v3/drivers/${obj.driver_id}/vehicles/${obj.vehicle_id}/photo?d=${obj.vehicle_updated_at}`
      : null,
  )
  vehicle_photo: boolean;

  constructor(partial: Partial<EventMemberVehicleInfoDtoV3>) {
    Object.assign(this, partial);
  }
}

@Exclude()
export class EventMemberTiresInfoDtoV3 {
  @Expose({ name: 'id' })
  @ApiProperty({
    description: 'Tires id',
    name: 'id',
  })
  @Transform(({ value }) => Number(value))
  tires_id: number;

  @Expose({ name: 'name' })
  @ApiProperty({
    description: 'Tires name',
    type: 'string',
    name: 'name',
  })
  @Transform(({ value }) => value || '')
  tires_name: string;

  constructor(partial: Partial<EventMemberTiresInfoDtoV3>) {
    Object.assign(this, partial);
  }
}

@Exclude()
export class GetEventMemberResponseDtoV3 {
  @Expose()
  @ApiProperty({
    description: 'Driver ID',
    type: 'number',
  })
  driver_id: number;

  @Expose()
  @ApiPropertyOptional({
    description: 'Driver phone',
    type: 'string',
  })
  phone?: string;

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

  @Expose({ name: 'photo_url' })
  @ApiProperty({
    description: 'Driver photo url',
    type: 'string',
    name: 'photo_url',
  })
  @Transform(({ obj }) => (obj.photo ? `/api/v3/drivers/${obj.driver_id}/photo?d=${obj.driver_updated_at}` : null))
  photo: boolean;

  @Expose()
  @ApiPropertyOptional({
    description: 'Check in status (only for organizers)',
  })
  check_in?: boolean;

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
    description: 'Event member vehicle',
    type: EventMemberVehicleInfoDtoV3,
  })
  @Transform(({ obj }) => new EventMemberVehicleInfoDtoV3(obj))
  @Type(() => EventMemberVehicleInfoDtoV3)
  vehicle: EventMemberVehicleInfoDtoV3;

  @Expose()
  @ApiProperty({
    description: 'Event member tires',
    type: EventMemberTiresInfoDtoV3,
  })
  @Transform(({ obj }) => new EventMemberTiresInfoDtoV3(obj))
  @Type(() => EventMemberTiresInfoDtoV3)
  tires: EventMemberTiresInfoDtoV3;

  @Expose()
  @ApiPropertyOptional({
    description: 'Member classes',
    type: [EventMemberClassesResponseDtoV3],
  })
  @Transform(({ value }) => value?.map((item) => new EventMemberClassesResponseDtoV3(item)))
  @Type(() => EventMemberClassesResponseDtoV3)
  classes?: EventMemberClassesResponseDtoV3[];

  @Expose()
  @ApiPropertyOptional({
    description: 'Member start number',
  })
  start_num?: string;

  constructor(partial: Partial<GetEventMemberResponseDtoV3>, lang?: string) {
    Object.assign(this, partial, { i18n: { lang } });
  }
}
