import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Exclude, Expose, Transform } from 'class-transformer';
import { IsBase64, IsEnum, IsOptional, Min } from 'class-validator';
import { DriveType } from 'general/enums/drive-types.enum';
import { EngineType } from 'general/enums/engine-types.enum';
import { VehicleType } from 'general/enums/vehicle-types.enum';
import { i18nValidationMsg } from 'general/utils/translation.utils';
import { Base64MaxSize } from 'general/validators/base64-image-size.validator';

export class AddDriverVehicleBodyDtoV3 {
  @ApiPropertyOptional({
    description: 'Vehicle type (code)',
    default: 1,
  })
  @IsEnum(VehicleType)
  @IsOptional()
  c_vehicle_type?: VehicleType = 1;

  @ApiProperty({
    description: 'Drive type (code)',
  })
  @IsEnum(DriveType)
  c_drive_type: DriveType;

  @ApiProperty({
    description: 'Engine type (code)',
  })
  @IsEnum(EngineType)
  c_engine_type: EngineType;

  @ApiProperty({
    description: 'Vehicle weight',
  })
  @Min(1, { message: i18nValidationMsg('validations.min_value') })
  @Transform(({ value }) => Number(value))
  weight: number;

  @ApiProperty({
    description: 'Vehicle power',
  })
  @Min(1, { message: i18nValidationMsg('validations.min_value') })
  @Transform(({ value }) => Number(value))
  power: number;

  @ApiProperty({
    description: 'Vehicle name',
  })
  name: string;

  @ApiProperty({
    description: 'Vehicle label',
  })
  label: string;

  @ApiProperty({
    description: 'Main vehicle',
  })
  main: boolean;

  @ApiPropertyOptional({
    description: 'Vehicle photo',
    type: 'string',
  })
  @IsOptional()
  @IsBase64()
  @Base64MaxSize(10240, { message: i18nValidationMsg('vehicle.validations.image_too_big') })
  photo?: string;
}

export class UpdateDriverVehicleBodyDtoV3 extends AddDriverVehicleBodyDtoV3 {}

@Exclude()
export class DriverVehicleResponseDtoV3 {
  @Expose()
  @ApiProperty({
    description: 'Vehicle id',
  })
  vehicle_id: number;

  @Expose()
  @ApiProperty({
    description: 'Vehicle type (code)',
  })
  c_vehicle_type: VehicleType;

  @Expose()
  @ApiProperty({
    description: 'Drive type (code)',
  })
  c_drive_type: DriveType;

  @Expose()
  @ApiProperty({
    description: 'Engine type (code)',
  })
  c_engine_type: EngineType;

  @Expose()
  @ApiProperty({
    description: 'Vehicle weight',
  })
  weight: number;

  @Expose()
  @ApiProperty({
    description: 'Vehicle power',
  })
  power: number;

  @Expose()
  @ApiProperty({
    description: 'Vehicle name',
  })
  name: string;

  @Expose()
  @ApiProperty({
    description: 'Vehicle label',
  })
  label: string;

  @Expose()
  @ApiProperty({
    description: 'Main vehicle',
  })
  main: boolean;

  @Expose({ name: 'photo_url' })
  @ApiPropertyOptional({
    description: 'Vehicle photo url',
    type: 'string',
    name: 'photo_url',
  })
  @Transform(({ obj }) =>
    obj.photo ? `/api/v3/drivers/${obj.driver_id}/vehicles/${obj.vehicle_id}/photo?d=${obj.updated_at}` : null,
  )
  photo?: boolean;

  constructor(partial: Partial<DriverVehicleResponseDtoV3>) {
    Object.assign(this, partial);
  }
}
