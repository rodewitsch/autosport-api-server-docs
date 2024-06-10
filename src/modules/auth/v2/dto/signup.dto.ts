import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose, Transform } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';
import { i18nValidationMsg } from 'general/utils/translation.utils';

export class SignupDtoV2 {
  @ApiProperty({
    description: 'Account login',
  })
  @IsString({ message: i18nValidationMsg('auth.validations.login_must_be_string') })
  @IsNotEmpty({ message: i18nValidationMsg('auth.validations.login_cannot_be_empty') })
  @Transform(({ value }) => value?.toLowerCase()?.trim())
  login: string;

  @ApiProperty({
    description: 'Account email',
  })
  @IsEmail({}, { message: i18nValidationMsg('validations.email_must_be_email') })
  @IsNotEmpty({ message: i18nValidationMsg('validations.not_be_empty') })
  @Transform(({ value }) => value?.toLowerCase())
  email: string;

  @ApiProperty({
    description: 'Account password',
  })
  @IsString({ message: i18nValidationMsg('auth.validations.password_must_be_string') })
  @IsNotEmpty({ message: i18nValidationMsg('auth.validations.password_cannot_be_empty') })
  @Length(5, 99, { message: i18nValidationMsg('auth.validations.password_length') })
  @Transform(({ value }) => value?.trim())
  password: string;
}

@Exclude()
export class SignupResponseDtoV2 {
  @Expose()
  @ApiProperty({
    description: 'Account email',
  })
  email: string;

  @Expose()
  @ApiProperty({
    description: 'Account login',
  })
  login: string;

  @Expose()
  @ApiProperty({
    description: 'Confirmation code expiration date',
  })
  confirmation_code_expires_at: Date;

  constructor(partial: Partial<SignupResponseDtoV2>) {
    Object.assign(this, partial);
  }
}
