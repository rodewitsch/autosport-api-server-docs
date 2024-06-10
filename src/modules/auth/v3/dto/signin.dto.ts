import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Exclude, Expose, Transform } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';
import { Translations } from 'general/interfaces/translations.interface';
import { getTranslation, i18nValidationMsg } from 'general/utils/translation.utils';
import { number } from 'joi';

export class SigninDtoV3 {
  @ApiProperty({
    description: 'Account login or email',
  })
  @IsString({ message: i18nValidationMsg('auth.validations.login_must_be_string') })
  @IsNotEmpty({ message: i18nValidationMsg('auth.validations.login_cannot_be_empty') })
  @Transform(({ value }) => value?.trim()?.toLowerCase())
  login: string;

  @ApiProperty({
    description: 'Account password',
  })
  @IsString({ message: i18nValidationMsg('auth.validations.password_must_be_string') })
  @IsNotEmpty({ message: i18nValidationMsg('auth.validations.password_cannot_be_empty') })
  @Transform(({ value }) => value?.trim())
  password: string;
}

@Exclude()
export class SigninResponseDtoV3 {
  @Expose()
  @ApiProperty({
    description: 'Account id',
  })
  account_id: number;

  @Expose()
  @ApiPropertyOptional({
    description: 'Driver id',
  })
  driver_id?: number;

  @Expose()
  @ApiProperty({
    description: 'IDs of managed organizations',
    type: [number],
    example: [1, 2, 3],
  })
  organizer_ids: number[];

  @Expose()
  @ApiPropertyOptional({
    description: 'Driver first name',
    type: 'string',
  })
  @Transform(({ value }) => getTranslation(value))
  first_name?: Translations;

  @Expose()
  @ApiPropertyOptional({
    description: 'Driver last name',
    type: 'string',
  })
  @Transform(({ value }) => getTranslation(value))
  last_name?: Translations;

  @Expose()
  @ApiProperty({
    description: 'Account email',
  })
  email: string;

  @Expose()
  @ApiPropertyOptional({
    description: 'Account phone number',
  })
  phone?: string;

  @Expose()
  @ApiProperty({
    description: 'Account login',
  })
  login: string;

  @Expose()
  @ApiProperty({
    description: 'JWT token',
  })
  token: string;

  @Expose()
  @ApiProperty({
    description: 'JWT refresh token',
  })
  refresh_token: string;

  @Expose()
  @ApiPropertyOptional({
    description: 'Driver photo',
    type: 'string',
  })
  @Transform(({ value }) => value?.toString('base64'))
  photo?: Buffer;

  constructor(partial: Partial<SigninResponseDtoV3>) {
    Object.assign(this, partial);
  }
}
