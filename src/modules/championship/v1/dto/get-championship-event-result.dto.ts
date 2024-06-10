import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose, Transform } from 'class-transformer';

@Exclude()
export class GetTimeAttackChampionshipEventResultResponseDtoV1 {
  @Expose()
  @ApiProperty({
    description: 'Lap number',
  })
  lap_number: number;

  @Expose()
  @ApiProperty({
    description: 'Lap time',
  })
  @Transform(({ value }) => value && value.padEnd(9, '0'))
  lap_time: string;

  @Expose()
  @ApiProperty({
    description: 'Best lap',
  })
  @Transform(({ value }) => Boolean(value))
  best_lap: boolean;

  @Expose()
  @ApiProperty({
    description: 'Penalty time (seconds)',
  })
  @Transform(({ value }) => Number(value))
  penalty_time: number;

  @Expose()
  @ApiProperty({
    description: 'Canceled',
  })
  @Transform(({ value }) => Boolean(value))
  canceled: boolean;

  constructor(partial: Partial<GetTimeAttackChampionshipEventResultResponseDtoV1>) {
    Object.assign(this, partial);
  }
}
