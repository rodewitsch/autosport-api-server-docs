import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEnum, IsInt, IsOptional } from 'class-validator';
import { RaceType } from 'general/enums/race-types.enum';
import { enumToString } from 'general/utils/enum-to-string.utils';

export class GetEventYearsQueryDtoV1 {
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
    description: 'Driver id',
  })
  @Transform(({ value }) => value && +value)
  @IsInt()
  @IsOptional()
  driver_id?: number;
}
