import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { Exclude, Expose, Transform } from 'class-transformer';
import { IsEnum, IsInt, IsOptional } from 'class-validator';
import { LimitOffsetQueryDto } from 'general/dto/limit-offset.query.dto';
import { RaceType } from 'general/enums/race-types.enum';
import { Translations } from 'general/interfaces/translations.interface';
import { enumToString } from 'general/utils/enum-to-string.utils';
import { getTranslation } from 'general/utils/translation.utils';
import { GetEventResponseDtoV1 } from '../../../event/v1/dto/get-events.dto';
import { EventType } from '../../neutral/enums/event-type.enum';

export class GetChampionshipQueryDtoV1 extends PartialType(LimitOffsetQueryDto) {
  @ApiPropertyOptional({
    description: 'Championship status',
    enum: EventType,
  })
  @IsOptional()
  status?: EventType;

  @ApiPropertyOptional({
    description: 'Organizer id',
  })
  @Transform(({ value }) => value && +value)
  @IsInt()
  @IsOptional()
  organizer_id?: number;

  @ApiPropertyOptional({
    description: `Race type: ${enumToString(RaceType)}`,
    enum: RaceType,
    default: 1,
  })
  @Transform(({ value }) => value && +value)
  @IsEnum(RaceType)
  @IsOptional()
  c_race_type?: RaceType;

  @ApiPropertyOptional({
    description: 'Championship year',
  })
  @Transform(({ value }) => value && +value)
  @IsInt()
  @IsOptional()
  year?: number;
}

@Exclude()
export class GetChampionshipEventResponseDtoV1 extends GetEventResponseDtoV1 {
  constructor(partial: Partial<GetChampionshipEventResponseDtoV1>) {
    super(partial);
    Object.assign(this, partial);
  }
}

@Exclude()
export class GetChampionshipResponseDtoV1 {
  @Expose()
  @ApiProperty({
    description: 'Championship id',
  })
  championship_id: number;

  @Expose()
  @ApiProperty({
    description: 'Organizer id',
  })
  organizer_id: number;

  @Expose()
  @ApiProperty({
    description: 'Championship name',
    type: 'string',
  })
  @Transform(({ value }) => getTranslation(value))
  name: Translations;

  @Expose()
  @ApiPropertyOptional({
    description: 'Championship short name',
    type: 'string',
  })
  @Transform(({ value }) => getTranslation(value))
  short_name?: Translations;

  @Expose({ name: 'image_url' })
  @ApiProperty({
    name: 'image_url',
    description: 'Championship image url',
    type: 'string',
  })
  @Transform(({ obj }) => obj.image && `/api/v1/championships/${obj.championship_id}/image?d=${obj.updated_at}`)
  image: boolean;

  @Expose()
  @ApiProperty({
    description: 'Championship color',
    type: 'string',
  })
  color: string;

  @Expose()
  @ApiProperty({
    description: 'Championship color (additional, for gradient)',
    type: 'string',
  })
  color_2: string;

  @Expose()
  @ApiProperty({
    description: 'Short championship description',
    type: 'string',
  })
  @Transform(({ value }) => getTranslation(value) || '')
  short_description: Translations;

  @Expose()
  @ApiProperty({
    description: 'Championship description',
    type: 'string',
  })
  @Transform(({ value }) => getTranslation(value) || '')
  description: Translations;

  @Expose()
  @ApiProperty({
    description: 'Championship date start',
  })
  date_start: Date;

  @Expose()
  @ApiProperty({
    description: 'Championship date end',
  })
  date_end: Date;

  @Expose()
  @ApiProperty({
    description: 'Championship race type (code)',
  })
  c_race_type: RaceType;

  @Expose()
  @ApiProperty({
    description: 'Championship race type',
    type: 'string',
  })
  @Transform(({ value }) => getTranslation(value))
  race_type: Translations;

  @Expose()
  @ApiProperty({
    description: 'Organizer name',
  })
  @Transform(({ value }) => getTranslation(value))
  organizer_name: string;

  @Expose()
  @ApiProperty({
    description: 'Championship status (code)',
  })
  c_championship_status: number;

  @Expose()
  @ApiProperty({
    description: 'Championship status',
    type: 'string',
  })
  @Transform(({ value }) => getTranslation(value))
  championship_status: Translations;

  @Expose()
  @ApiProperty({
    description: 'Championship rules id',
  })
  championship_rules_id: number;

  @Expose()
  @ApiProperty({
    description: 'Championship events',
    type: [GetChampionshipEventResponseDtoV1],
  })
  @Transform(({ value }) => (value ? value.map((event) => new GetChampionshipEventResponseDtoV1(event)) : []))
  events: GetChampionshipEventResponseDtoV1[] = [];

  constructor(partial: Partial<GetChampionshipResponseDtoV1>) {
    Object.assign(this, partial);
  }
}
