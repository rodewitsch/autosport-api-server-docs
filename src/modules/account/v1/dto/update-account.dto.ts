import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose, Transform } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';
import { Translations } from 'general/interfaces/translations.interface';
import { getTranslation, i18nValidationMsg } from 'general/utils/translation.utils';

export class UpdateAccountBodyDtoV1 {
  @ApiProperty({
    description: 'Account first name',
  })
  @IsString({ message: i18nValidationMsg('account.validations.first_name_must_be_string') })
  @IsNotEmpty({ message: i18nValidationMsg('account.validations.first_name_not_empty') })
  @Transform(({ value }) => value?.trim())
  first_name: string;

  @ApiProperty({
    description: 'Account last name',
  })
  @IsString({ message: i18nValidationMsg('account.validations.last_name_must_be_string') })
  @IsNotEmpty({ message: i18nValidationMsg('account.validations.last_name_not_empty') })
  @Transform(({ value }) => value?.trim())
  last_name: string;
}

@Exclude()
export class UpdateAccountResponseDtoV1 {
  @Expose()
  @ApiProperty({
    description: 'Account id',
  })
  account_id: number;

  @Expose()
  @ApiProperty({
    description: 'Account first name',
    type: 'string',
  })
  @Transform(({ value }) => getTranslation(value))
  first_name: Translations;

  @Expose()
  @ApiProperty({
    description: 'Account last name',
    type: 'string',
  })
  @Transform(({ value }) => getTranslation(value))
  last_name: Translations;

  @Expose()
  @ApiProperty({
    description: 'New access token with first_name, last_name',
  })
  access_token: string;

  constructor(partial: Partial<UpdateAccountResponseDtoV1>) {
    Object.assign(this, partial);
  }
}
