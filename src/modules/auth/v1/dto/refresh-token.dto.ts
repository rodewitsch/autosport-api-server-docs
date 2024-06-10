import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { i18nValidationMsg } from 'general/utils/translation.utils';

export class RefreshTokenDtoV1 {
  @ApiProperty({
    description: 'Refresh token',
  })
  @IsString({ message: i18nValidationMsg('validations.must_be_string') })
  @IsNotEmpty({ message: i18nValidationMsg('validations.not_be_empty') })
  refresh_token: string;
}
