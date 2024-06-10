import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class GetOrganizerEventsYearsResponseDtoV1 {
  @Expose()
  @ApiProperty({
    description: 'Race type (code)',
    example: 1,
  })
  c_race_type: number;

  @Expose()
  @ApiProperty({
    description: 'Events years',
    type: [Number],
    example: [2021, 2020],
  })
  years: number[];

  constructor(partial: Partial<GetOrganizerEventsYearsResponseDtoV1>) {
    Object.assign(this, partial);
  }
}
