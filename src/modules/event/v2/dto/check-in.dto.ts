import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean } from 'class-validator';

export class CheckInBodyDtoV2 {
  @ApiPropertyOptional({
    description: 'Check in status',
  })
  @IsBoolean()
  check_in: boolean;
}
