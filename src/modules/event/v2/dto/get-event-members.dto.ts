import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Exclude, Expose, Transform } from 'class-transformer';
import { Translations } from 'general/interfaces/translations.interface';
import { getTranslation } from 'general/utils/translation.utils';

@Exclude()
export class EventMemberClassesResponseDtoV2 {
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

  constructor(partial: Partial<EventMemberClassesResponseDtoV2>) {
    Object.assign(this, partial);
  }
}

@Exclude()
export class GetEventMemberResponseDtoV2 {
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

  @Expose()
  @ApiPropertyOptional({
    description: 'Vehicle power density class ID (for time-attack events)',
  })
  power_den_class_id?: number;

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

  @Expose({ name: 'photo_url' })
  @ApiProperty({
    description: 'Driver photo url',
    type: 'string',
  })
  @Transform(({ obj }) => (obj.photo ? `/api/v2/drivers/${obj.driver_id}/photo?d=${obj.driver_updated_at}` : null))
  photo: boolean;

  @Expose()
  @ApiProperty({
    description: 'Check in status (only for organizers)',
    type: 'boolean',
  })
  check_in: boolean;

  @Expose()
  @ApiPropertyOptional({
    description: 'Member classes',
    type: [EventMemberClassesResponseDtoV2],
  })
  @Transform(({ value }) => value?.map((item) => new EventMemberClassesResponseDtoV2(item)))
  classes?: EventMemberClassesResponseDtoV2[];

  @Expose()
  @ApiPropertyOptional({
    description: 'Member start number',
  })
  start_num?: string;

  constructor(partial: Partial<GetEventMemberResponseDtoV2>, lang?: string) {
    Object.assign(this, partial, { i18n: { lang } });
  }
}
