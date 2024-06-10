import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class CommonMessageResponseDto {
  @Expose()
  @ApiProperty({ description: 'Message Text' })
  message: string;

  constructor(val: Partial<CommonMessageResponseDto>) {
    Object.assign(this, val);
  }
}
