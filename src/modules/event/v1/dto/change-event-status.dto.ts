import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsIn, IsNumber } from 'class-validator';
import { EventStatus } from 'general/enums/event-status.enum';
import { i18nValidationMsg } from 'general/utils/translation.utils';

export class ChangeEventStatusBodyDtoV1 {
  @ApiPropertyOptional({
    description: 'Event status (code)',
  })
  @IsNumber({}, { message: i18nValidationMsg('validations.must_be_number') })
  @IsIn([EventStatus.REGISTRATION_OPENED, EventStatus.REGISTRATION_CLOSED, EventStatus.STARTED, EventStatus.FINISHED])
  c_event_status: EventStatus;
}
