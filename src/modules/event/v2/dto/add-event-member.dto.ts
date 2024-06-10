import { ApiProperty, ApiPropertyOptional, OmitType } from '@nestjs/swagger';
import { Exclude, Expose, Transform } from 'class-transformer';
import { IsEnum, IsInt, IsNumber, ValidateIf } from 'class-validator';
import { DriveType } from 'general/enums/drive-types.enum';
import { EngineType } from 'general/enums/engine-types.enum';
import { VehicleType } from 'general/enums/vehicle-types.enum';
import { i18nValidationMsg } from 'general/utils/translation.utils';
import { EventMemberClassesResponseDtoV2, GetEventMemberResponseDtoV2 } from './get-event-members.dto';

export class AddEventMemberDtoV2 {
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
export class OwnEventMemberResponseDtoV2 extends OmitType(GetEventMemberResponseDtoV2, ['classes'] as const) {
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
  classes: EventMemberClassesResponseDtoV2[] = [];

  @Expose()
  @ApiProperty({
    description: 'Documents',
    type: [Number],
  })
  documents: number[] = [];

  constructor(partial: Partial<OwnEventMemberResponseDtoV2>, lang?: string) {
    super(partial, lang);
    Object.assign(this, partial, { i18n: { lang } });
  }
}
