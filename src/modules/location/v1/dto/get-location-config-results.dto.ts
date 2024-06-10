import { ApiProperty, ApiPropertyOptional, OmitType } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEnum, IsInt, IsOptional, Max, Min } from 'class-validator';
import { RaceType } from 'general/enums/race-types.enum';
import { enumToString } from 'general/utils/enum-to-string.utils';
import {
  GetEventResultsQueryDtoV1,
  GetTimeAttackResultDriverResponseDtoV1,
} from '../../../event/v1/dto/get-event-results.dto';

export class GetLocationConfigResultsQueryDtoV1 extends OmitType(GetEventResultsQueryDtoV1, ['type']) {
  @ApiProperty({
    description: `Race type: ${enumToString(RaceType)}`,
    enum: RaceType,
  })
  @Transform(({ value }) => value && +value)
  @IsEnum(RaceType)
  c_race_type: RaceType;

  @ApiPropertyOptional({
    description: 'Event year',
  })
  @Transform(({ value }) => value && +value)
  @IsInt()
  @IsOptional()
  year?: number;

  @ApiPropertyOptional({
    description: 'Number of records',
  })
  @Transform(({ value }) => value && +value)
  @IsInt()
  @IsOptional()
  @Max(100)
  @Min(1)
  count?: number;
}

export class GetLocationConfigTimeAttackResultsResponseDtoV1 extends GetTimeAttackResultDriverResponseDtoV1 {
  constructor(partial: Partial<GetLocationConfigTimeAttackResultsResponseDtoV1>) {
    super(partial);
    Object.assign(this, partial);
  }
}
