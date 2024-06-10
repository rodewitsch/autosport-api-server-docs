import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose, Transform } from 'class-transformer';

@Exclude()
export class GetDriverParticipationYearsOldResponseDtoV3 {
  @Expose()
  @ApiProperty({
    description: 'Race type (code)',
    example: 1,
  })
  c_race_type: number;

  @Expose()
  @ApiProperty({
    description: 'Participation years',
    type: [Number],
    example: [2021, 2020],
  })
  years: number[];

  constructor(partial: Partial<GetDriverParticipationYearsOldResponseDtoV3>) {
    Object.assign(this, partial);
  }
}

@Exclude()
export class ParticipationYearsDtoV3 {
  @Expose()
  @ApiProperty({
    description: 'Year',
  })
  year: number;

  @Expose()
  @ApiProperty({
    description: 'Organizers',
    example: [1, 2],
  })
  organizer_ids: number[];

  constructor(partial: Partial<ParticipationYearsDtoV3>) {
    Object.assign(this, partial);
  }
}

@Exclude()
export class GetDriverParticipationYearsResponseDtoV3 {
  @Expose()
  @ApiProperty({
    description: 'Race type (code)',
    example: 1,
  })
  c_race_type: number;

  @Expose()
  @ApiProperty({
    description: 'Participation years',
    type: [ParticipationYearsDtoV3],
  })
  @Transform(({ value }) => value && value.map((elem) => new ParticipationYearsDtoV3(elem)))
  years: ParticipationYearsDtoV3[];

  constructor(partial: Partial<GetDriverParticipationYearsResponseDtoV3>) {
    Object.assign(this, partial);
  }
}
