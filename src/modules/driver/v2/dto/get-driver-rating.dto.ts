import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Exclude, Expose, Transform } from 'class-transformer';
import { IsEnum, IsInt, IsOptional } from 'class-validator';
import { RaceType } from 'general/enums/race-types.enum';
import { Translations } from 'general/interfaces/translations.interface';
import { enumToString } from 'general/utils/enum-to-string.utils';
import { getTranslation } from 'general/utils/translation.utils';

export class GetDriverRatingQueryDtoV2 {
  @ApiPropertyOptional({
    description: `Race type: ${enumToString(RaceType)}`,
    enum: RaceType,
    default: 1,
  })
  @Transform(({ value }) => value && +value)
  @IsEnum(RaceType)
  @IsOptional()
  c_race_type?: RaceType;

  @ApiProperty({
    description: 'Event year',
  })
  @Transform(({ value }) => value && +value)
  @IsInt()
  year: number;

  @ApiPropertyOptional({
    description: 'Driver id',
  })
  @Transform(({ value }) => value && +value)
  @IsInt()
  @IsOptional()
  driver_id?: number;
}

@Exclude()
export class GetDriverRaceTypeRecordsResponseDtoV2 {
  @Expose()
  @ApiProperty({
    description: 'Race type (code)',
  })
  c_race_type: number;

  @Expose()
  @ApiProperty({
    description: 'Place',
  })
  place: number = 0;

  @Expose()
  @ApiProperty({
    description: 'Points',
  })
  @Transform(({ value }) => value && Number(value))
  points: number = 0;

  @Expose()
  @ApiProperty({
    description: 'First places',
  })
  @Transform(({ value }) => value && Number(value))
  first_places: number = 0;

  @Expose()
  @ApiProperty({
    description: 'Podiums',
  })
  @Transform(({ value }) => value && Number(value))
  podiums: number = 0;

  @Expose()
  @ApiProperty({
    description: 'Participation',
  })
  @Transform(({ value }) => value && Number(value))
  participation: number = 0;

  constructor(partial: Partial<GetDriverRaceTypeRecordsResponseDtoV2>) {
    Object.assign(this, partial);
  }
}

@Exclude()
export class GetDriverRatingResponseDtoV2 {
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
  @ApiPropertyOptional({
    description: 'Main vehicle id',
  })
  vehicle_id?: number;

  @Expose()
  @ApiPropertyOptional({
    description: 'Main vehicle name',
  })
  @Transform(({ value }) => value || '')
  vehicle_name?: string;

  @Expose({ name: 'photo_url' })
  @ApiProperty({
    name: 'photo_url',
    description: 'Photo url',
  })
  @Transform(({ obj }) => (obj.photo ? `/api/v2/drivers/${obj.driver_id}/photo?d=${obj.updated_at}` : null))
  photo: boolean;

  updated_at: string;

  @Expose()
  @ApiProperty({
    description: 'Rating',
    type: GetDriverRaceTypeRecordsResponseDtoV2,
  })
  @Transform(({ value }) => new GetDriverRaceTypeRecordsResponseDtoV2(value))
  rating: GetDriverRaceTypeRecordsResponseDtoV2;

  constructor(partial: Partial<GetDriverRatingResponseDtoV2>) {
    Object.assign(this, partial);
  }
}
