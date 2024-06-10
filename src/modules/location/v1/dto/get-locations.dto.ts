import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Exclude, Expose, Transform, Type } from 'class-transformer';
import { IsEnum, IsOptional } from 'class-validator';
import { RaceType } from 'general/enums/race-types.enum';
import { Translations } from 'general/interfaces/translations.interface';
import { enumToString } from 'general/utils/enum-to-string.utils';
import { getTranslation } from 'general/utils/translation.utils';

export class GetLocationsQueryDtoV1 {
  @ApiPropertyOptional({
    description: `Race type: ${enumToString(RaceType)}`,
    enum: RaceType,
  })
  @IsOptional()
  @IsEnum(RaceType)
  @Transform(({ value }) => Number(value))
  c_race_type?: RaceType;
}

@Exclude()
export class Coordinates {
  @Expose()
  @ApiProperty({
    description: 'Longitude',
    type: 'number',
  })
  lng: number;

  @Expose()
  @ApiProperty({
    description: 'Latitude',
    type: 'number',
  })
  lat: number;

  constructor(partial: Partial<Coordinates>) {
    Object.assign(this, partial);
  }
}

@Exclude()
export class GetLocationsResponseDtoV1 {
  @Expose()
  @ApiProperty({
    description: 'Location id',
  })
  location_id: number;

  @Expose()
  @ApiProperty({
    description: 'Location name',
    type: 'string',
  })
  @Transform(({ value }) => getTranslation(value))
  name: Translations;

  @Expose()
  @ApiProperty({
    description: 'Location photo',
    type: 'string',
  })
  @Transform(({ value }) => value && value.toString('base64'))
  photo: Buffer;

  @Expose({ name: 'photo_url' })
  @ApiProperty({
    name: 'photo_url',
    description: 'Location photo url',
    type: 'string',
  })
  @Transform(({ obj }) => (obj.photo ? `/api/v1/locations/${obj.location_id}/photo?d=${obj.updated_at}` : null))
  photo_url: Buffer;

  updated_at: string;

  @Expose()
  @ApiProperty({
    description: 'Location coordinates',
    example: {
      lng: 24.123,
      lat: 56.123,
    },
  })
  @Transform(({ value }) => ({ lng: value.x, lat: value.y }))
  @Type(() => Coordinates)
  coordinates: Coordinates;

  @Expose()
  @ApiProperty({
    description: 'Location address',
    type: 'string',
  })
  address: string;

  @Expose()
  @ApiProperty({
    description: 'Location configs count',
    type: 'number',
  })
  configs_count: number;

  constructor(partial: Partial<GetLocationsResponseDtoV1>) {
    Object.assign(this, partial);
  }
}
