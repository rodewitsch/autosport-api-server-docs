import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';
import { i18nValidationMsg } from 'general/utils/translation.utils';

export class ConfirmResetPasswordBodyDtoV3 {
  @ApiProperty({
    description: 'Account login or email',
  })
  @IsString({ message: i18nValidationMsg('auth.validations.login_must_be_string') })
  @IsNotEmpty({ message: i18nValidationMsg('auth.validations.login_cannot_be_empty') })
  @Transform(({ value }) => value?.toLowerCase()?.trim())
  login: string;

  @ApiProperty({
    description: 'Account password',
  })
  @IsString({ message: i18nValidationMsg('auth.validations.password_must_be_string') })
  @IsNotEmpty({ message: i18nValidationMsg('auth.validations.password_cannot_be_empty') })
  @Transform(({ value }) => value?.trim())
  password: string;

  @ApiProperty({
    description: 'Reset token',
  })
  @IsString({ message: i18nValidationMsg('validations.must_be_string') })
  @IsNotEmpty({ message: i18nValidationMsg('validations.not_be_empty') })
  reset_token: string;
}
