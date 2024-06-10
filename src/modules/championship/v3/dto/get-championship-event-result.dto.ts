import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose, Transform, Type } from 'class-transformer';

@Exclude()
export class GetTimeAttackChampionshipEventResultResponseDtoV3 {
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

  constructor(partial: Partial<GetTimeAttackChampionshipEventResultResponseDtoV3>) {
    Object.assign(this, partial);
  }
}

@Exclude()
export class GetTimeAttackChampionshipEventResultsResponseDtoV3 {
  @Expose()
  @ApiProperty({
    description: 'Race number',
  })
  number: number;

  @Expose()
  @ApiProperty({
    description: 'Group records',
    type: [GetTimeAttackChampionshipEventResultResponseDtoV3],
  })
  @Type(() => GetTimeAttackChampionshipEventResultResponseDtoV3)
  records: GetTimeAttackChampionshipEventResultResponseDtoV3[];

  constructor(partial: Partial<GetTimeAttackChampionshipEventResultsResponseDtoV3>) {
    Object.assign(this, partial);
  }
}
