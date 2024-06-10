import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEnum, IsInt, IsOptional } from 'class-validator';
import { RaceType } from '../../../../general/enums/race-types.enum';

export class GetEventYearsQueryDtoV3 {
  @ApiPropertyOptional({
    description: 'Organizer id',
  })
  @Transform(({ value }) => value && +value)
  @IsInt()
  @IsOptional()
  organizer_id?: number;

  @ApiPropertyOptional({
    description: 'Race type (code)',
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
