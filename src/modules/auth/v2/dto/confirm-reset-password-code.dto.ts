import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';
import { i18nValidationMsg } from 'general/utils/translation.utils';

export class ConfirmResetPasswordCodeBodyDtoV2 {
  @ApiProperty({
    description: 'Account login or email',
  })
  @IsString({ message: i18nValidationMsg('auth.validations.login_must_be_string') })
  @Transform(({ value }) => value?.toLowerCase()?.trim())
  login: string;

  @ApiProperty({
    description: 'Reset code',
  })
  @IsString({ message: i18nValidationMsg('auth.validations.confirmation_code_cannot_be_empty') })
  @IsNotEmpty({ message: i18nValidationMsg('auth.validations.confirmation_code_cannot_be_empty') })
  reset_code: string;
}

export class ConfirmResetPasswordCodeResponseDtoV2 {
  @ApiProperty({
    description: 'Reset token',
  })
  @IsString()
  reset_token: string;

  constructor(data: ConfirmResetPasswordCodeResponseDtoV2) {
    Object.assign(this, data);
  }
}
