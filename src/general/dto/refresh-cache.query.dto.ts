import { ApiPropertyOptional } from '@nestjs/swagger';

export class RefreshCacheQueryDto {
  @ApiPropertyOptional({
    description: 'Something new to refresh cache',
    default: Date.now(),
  })
  d?: string;
}
