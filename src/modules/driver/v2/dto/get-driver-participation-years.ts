import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose, Transform } from 'class-transformer';

@Exclude()
export class GetDriverParticipationYearsOldResponseDtoV2 {
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

  constructor(partial: Partial<GetDriverParticipationYearsOldResponseDtoV2>) {
    Object.assign(this, partial);
  }
}

@Exclude()
export class ParticipationYearsDtoV2 {
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

  constructor(partial: Partial<ParticipationYearsDtoV2>) {
    Object.assign(this, partial);
  }
}

@Exclude()
export class GetDriverParticipationYearsResponseDtoV2 {
  @Expose()
  @ApiProperty({
    description: 'Race type (code)',
    example: 1,
  })
  c_race_type: number;

  @Expose()
  @ApiProperty({
    description: 'Participation years',
    type: [ParticipationYearsDtoV2],
  })
  @Transform(({ value }) => value && value.map((elem) => new ParticipationYearsDtoV2(elem)))
  years: ParticipationYearsDtoV2[];

  constructor(partial: Partial<GetDriverParticipationYearsResponseDtoV2>) {
    Object.assign(this, partial);
  }
}
