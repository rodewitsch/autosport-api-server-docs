import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Exclude, Expose, Transform } from 'class-transformer';
import { IsEnum, IsInt, IsNumber, ValidateIf } from 'class-validator';
import { DriveType } from 'general/enums/drive-types.enum';
import { EngineType } from 'general/enums/engine-types.enum';
import { VehicleType } from 'general/enums/vehicle-types.enum';
import { Translations } from 'general/interfaces/translations.interface';
import { getTranslation, i18nValidationMsg } from 'general/utils/translation.utils';
import { EventMemberClassesResponseDtoV3 } from './get-event-members.dto';

export class AddEventMemberDtoV3 {
  @ApiPropertyOptional({
    description: 'Registration code',
  })
  code?: string;

  @ApiPropertyOptional({
    description: 'Vehicle id',
    example: 1,
  })
  @ValidateIf((o) => !o.vehicle_name)
  @IsInt({ message: i18nValidationMsg('validations.must_be_integer') })
  vehicle_id: number;

  @ApiPropertyOptional({
    description: 'Vehicle type (code)',
    example: 1,
    default: 1,
  })
  @ValidateIf((o) => !o.vehicle_id)
  @IsEnum(VehicleType)
  c_vehicle_type: VehicleType = 1;

  @ApiPropertyOptional({
    description: 'Drive type (code)',
    example: 1,
  })
  @ValidateIf((o) => !o.vehicle_id)
  @IsEnum(DriveType)
  c_drive_type: DriveType;

  @ApiPropertyOptional({
    description: 'Engine type (code)',
    example: 1,
  })
  @ValidateIf((o) => !o.vehicle_id)
  @IsEnum(EngineType)
  c_engine_type: EngineType;

  @ApiPropertyOptional({
    description: 'Vehicle weight',
  })
  @ValidateIf((o) => !o.vehicle_id)
  @IsNumber({}, { message: i18nValidationMsg('validations.must_be_number') })
  weight: number;

  @ApiPropertyOptional({
    description: 'Vehicle power',
  })
  @ValidateIf((o) => !o.vehicle_id)
  @IsNumber({}, { message: i18nValidationMsg('validations.must_be_number') })
  power: number;

  @ApiPropertyOptional({
    description: 'Vehicle name',
    example: 'Honda Civic',
  })
  @ValidateIf((o) => !o.vehicle_id)
  vehicle_name: string;

  @ApiPropertyOptional({
    description: 'Tires id',
    example: 2,
  })
  @ValidateIf((o) => !o.tires_name)
  @IsInt({ message: i18nValidationMsg('validations.must_be_integer') })
  tires_id: number;

  @ApiPropertyOptional({
    description: 'Tires name',
    example: 'Michelin Pilot Sport 4',
  })
  @ValidateIf((o) => !o.tires_id)
  tires_name: string;

  @ApiPropertyOptional({
    description: 'IDs of required documents',
    type: [Number],
  })
  documents: number[] = [];

  @ApiPropertyOptional({
    description: 'IDs of race classes',
    type: [Number],
  })
  classes: number[] = [];

  @ApiPropertyOptional({
    description: 'Member start number',
  })
  start_num: string;
}

@Exclude()
export class OwnEventMemberResponseDtoV3 {
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
    description: 'Power density class id',
  })
  power_den_class_id?: number;

  @Expose()
  @ApiProperty({
    description: 'Vehicle id',
  })
  @Transform(({ value }) => Number(value))
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
  @Transform(({ value }) => Number(value))
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
  @ApiPropertyOptional({
    description: 'Member start number',
  })
  start_num?: string;

  @Expose()
  @ApiProperty({
    description: 'Member status (code)',
    type: 'number',
  })
  c_member_status: number;

  @Expose()
  @ApiProperty({
    description: 'Classes',
    example: [1, 2],
  })
  @Transform(({ value }) => value?.map((item) => item.championship_class_id))
  classes: EventMemberClassesResponseDtoV3[] = [];

  @Expose()
  @ApiProperty({
    description: 'Documents',
    type: [Number],
  })
  documents: number[] = [];

  constructor(partial: Partial<OwnEventMemberResponseDtoV3>, lang?: string) {
    Object.assign(this, partial, { i18n: { lang } });
  }
}
