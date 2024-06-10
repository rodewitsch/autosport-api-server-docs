import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class AvailabilityResponseDtoV2 {
  @Expose()
  @ApiProperty({
    description: 'Account login/email availability',
  })
  available: boolean;

  constructor(partial: Partial<AvailabilityResponseDtoV2>) {
    Object.assign(this, partial);
  }
}
