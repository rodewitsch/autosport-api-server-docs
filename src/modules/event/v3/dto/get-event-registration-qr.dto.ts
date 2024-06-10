import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose, Transform } from 'class-transformer';

@Exclude()
export class GetEventRegistrationQrResponseDto {
  @Expose()
  @ApiProperty({
    description: 'Registration code image (base64)',
  })
  @Transform(({ value }) => value?.replace(/^data:image\/[a-z]+;base64,/, ''))
  image: string;

  constructor(partial: Partial<GetEventRegistrationQrResponseDto>) {
    Object.assign(this, partial);
  }
}
