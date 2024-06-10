import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class AvailabilityResponseDtoV1 {
  @Expose()
  @ApiProperty({
    description: 'Account login/email availability',
  })
  available: boolean;

  constructor(partial: Partial<AvailabilityResponseDtoV1>) {
    Object.assign(this, partial);
  }
}
