import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose, Transform } from 'class-transformer';
import { Translations } from 'general/interfaces/translations.interface';
import { getTranslation } from 'general/utils/translation.utils';

@Exclude()
export class GetEventMemberResponseDtoV1 {
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
  @Transform(({ obj }) => (obj.photo ? `/api/v1/drivers/${obj.driver_id}/photo?d=${obj.driver_updated_at}` : null))
  photo: boolean;

  @Expose()
  @ApiProperty({
    description: 'Check in status (only for organizers)',
    type: 'boolean',
  })
  check_in: boolean;

  constructor(partial: Partial<GetEventMemberResponseDtoV1>) {
    Object.assign(this, partial);
  }
}
