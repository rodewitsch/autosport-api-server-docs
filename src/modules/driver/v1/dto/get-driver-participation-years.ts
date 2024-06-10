import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose, Transform } from 'class-transformer';

@Exclude()
export class GetDriverParticipationYearsOldResponseDtoV1 {
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

  constructor(partial: Partial<GetDriverParticipationYearsOldResponseDtoV1>) {
    Object.assign(this, partial);
  }
}

@Exclude()
export class ParticipationYearsDtoV1 {
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

  constructor(partial: Partial<ParticipationYearsDtoV1>) {
    Object.assign(this, partial);
  }
}

@Exclude()
export class GetDriverParticipationYearsResponseDtoV1 {
  @Expose()
  @ApiProperty({
    description: 'Race type (code)',
    example: 1,
  })
  c_race_type: number;

  @Expose()
  @ApiProperty({
    description: 'Participation years',
    type: [ParticipationYearsDtoV1],
  })
  @Transform(({ value }) => value && value.map((elem) => new ParticipationYearsDtoV1(elem)))
  years: ParticipationYearsDtoV1[];

  constructor(partial: Partial<GetDriverParticipationYearsResponseDtoV1>) {
    Object.assign(this, partial);
  }
}
