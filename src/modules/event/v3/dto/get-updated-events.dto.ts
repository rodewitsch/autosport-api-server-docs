import { ApiProperty, ApiPropertyOptional, OmitType } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsDate, IsInt, IsOptional } from 'class-validator';
import dayjs from 'dayjs';
import { GetEventsQueryDtoV3 } from './get-events.dto';

export class GetUpdatedEventQueryDtoV3 extends OmitType(GetEventsQueryDtoV3, ['limit', 'offset'] as const) {
  @ApiPropertyOptional({
    description: 'Min event id',
  })
  @Transform(({ value }) => value && +value)
  @IsInt()
  @IsOptional()
  min_event_id?: number;

  @ApiProperty({
    description: 'Last updated date',
    default: dayjs().subtract(1, 'h').toDate(),
  })
  @Transform(({ value }) => new Date(value))
  @IsDate()
  last_updated_at: Date;
}
