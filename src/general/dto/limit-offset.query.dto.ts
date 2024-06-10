import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsInt, Max, Min } from 'class-validator';

export class LimitOffsetQueryDto {
  @ApiProperty({
    description: 'Amount of records to return',
    default: 10,
  })
  @Transform(({ value }) => +value)
  @IsInt()
  @Min(1)
  @Max(100)
  limit: number;

  @ApiProperty({
    description: 'Amount of records to skip',
    default: 0,
  })
  @Transform(({ value }) => +value)
  @IsInt()
  @Min(0)
  offset: number;
}
