import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class SaveDeviceTokenDtoV2 {
  @ApiProperty({ description: 'Device token' })
  @IsString()
  token: string;
}
