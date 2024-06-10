import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsNumber } from 'class-validator';
import { EventStatus } from 'general/enums/event-status.enum';
import { i18nValidationMsg } from 'general/utils/translation.utils';

export class ChangeEventStatusBodyDtoV3 {
  @ApiPropertyOptional({
    description: 'Event status (code)',
  })
  @IsNumber({}, { message: i18nValidationMsg('validations.must_be_number') })
  @IsEnum(EventStatus)
  c_event_status: EventStatus;
}
