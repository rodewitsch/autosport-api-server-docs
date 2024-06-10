import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose, Transform } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';
import { i18nValidationMsg } from 'general/utils/translation.utils';

export class ResetPasswordBodyDtoV3 {
  @ApiProperty({
    description: 'Account login or email',
  })
  @IsString({ message: i18nValidationMsg('auth.validations.login_must_be_string') })
  @IsNotEmpty({ message: i18nValidationMsg('auth.validations.login_cannot_be_empty') })
  @Transform(({ value }) => value?.trim()?.toLowerCase())
  login: string;
}

@Exclude()
export class ResetPasswordResponseDtoV3 {
  @Expose()
  @ApiProperty({
    description: 'Email',
  })
  @Transform(
    ({ value }) => value && value.replaceAll(/(?<=.)[^@](?=[^@]*[^@]@)|(?:(?<=@.)|(?!^)\\G(?=[^@]*$)).(?!$)/g, '*'),
  )
  email: string;

  @Expose()
  @ApiProperty({
    description: 'Reset code expiration date',
  })
  reset_code_expires_at: Date;

  constructor(partial: Partial<ResetPasswordResponseDtoV3>) {
    Object.assign(this, partial);
  }
}
