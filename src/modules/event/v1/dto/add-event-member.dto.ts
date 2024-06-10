import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { IsEnum, IsInt, IsNumber, ValidateIf } from 'class-validator';
import { DriveType } from 'general/enums/drive-types.enum';
import { EngineType } from 'general/enums/engine-types.enum';
import { VehicleType } from 'general/enums/vehicle-types.enum';
import { i18nValidationMsg } from 'general/utils/translation.utils';
import { GetEventMemberResponseDtoV1 } from './get-event-members.dto';

export class AddEventMemberDtoV1 {
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
  documents: number[];

  @ApiPropertyOptional({
    description: 'IDs of race classes',
    type: [Number],
  })
  classes: number[];
}

@Exclude()
export class OwnEventMemberResponseDtoV1 extends GetEventMemberResponseDtoV1 {
  @Expose()
  @ApiProperty({
    description: 'Member status (code)',
    type: 'number',
  })
  c_member_status: number;

  @Expose()
  @ApiProperty({
    description: 'Classes',
    type: [Number],
  })
  classes: number[] = [];

  @Expose()
  @ApiProperty({
    description: 'Documents',
    type: [Number],
  })
  documents: number[] = [];

  constructor(partial: Partial<OwnEventMemberResponseDtoV1>) {
    super(partial);
    Object.assign(this, partial);
  }
}
