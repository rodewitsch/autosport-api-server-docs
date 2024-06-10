import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Exclude, Expose, Transform } from 'class-transformer';
import { IsEnum, IsOptional } from 'class-validator';
import { RaceType } from 'general/enums/race-types.enum';
import { Translations } from 'general/interfaces/translations.interface';
import { enumToString } from 'general/utils/enum-to-string.utils';
import { getTranslation } from 'general/utils/translation.utils';

export class GetOrganizerQueryDtoV3 {
  @ApiPropertyOptional({
    description: `Race types of organizer.  ${enumToString(RaceType)}`,
    example: '1,2',
    type: 'string',
  })
  @Transform(({ value }) => value && value.split(',').map(Number))
  @IsEnum(RaceType, { each: true })
  @IsOptional()
  c_race_types?: RaceType[];
}

@Exclude()
export class GetOrganizerResponseDtoV3 {
  @Expose()
  @ApiProperty({
    description: 'Organizer id',
  })
  organizer_id: number;

  @Expose()
  @ApiProperty({
    description: 'Organizer name',
    type: 'string',
  })
  @Transform(({ value }) => getTranslation(value))
  name: Translations;

  @Expose()
  @ApiProperty({
    description: 'Organizer logo',
    type: 'string',
  })
  @Transform(({ value }) => value && value.toString('base64'))
  logo: Buffer;

  @Expose()
  @ApiProperty({
    description: 'Organizer race types',
    type: 'number',
    isArray: true,
  })
  c_race_types: number[];

  constructor(partial: Partial<GetOrganizerResponseDtoV3>) {
    Object.assign(this, partial);
  }
}
