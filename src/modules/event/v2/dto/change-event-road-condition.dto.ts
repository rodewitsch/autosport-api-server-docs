import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsNumber } from 'class-validator';
import { RoadCondition } from 'general/enums/road-conditions.enum';
import { i18nValidationMsg } from 'general/utils/translation.utils';

export class ChangeEventRoadConditionBodyDtoV2 {
  @ApiPropertyOptional({
    description: 'Event road status (code)',
  })
  @IsNumber({}, { message: i18nValidationMsg('validations.must_be_number') })
  @IsEnum(RoadCondition)
  c_road_condition: RoadCondition;
}
