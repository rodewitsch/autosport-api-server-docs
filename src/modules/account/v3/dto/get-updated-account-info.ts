import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Exclude, Expose, Transform } from 'class-transformer';
import { Translations } from 'general/interfaces/translations.interface';
import { getTranslation } from 'general/utils/translation.utils';

export class GetUpdatedAccountInformationQueryDtoV3 {
  @ApiProperty({
    description: 'Last updated date',
    default: new Date(),
  })
  last_updated_at: Date;
}

@Exclude()
export class UpdatedAccountInformationResponseDtoV3 {
  @Expose()
  @ApiPropertyOptional({
    description: 'Account first name',
    type: 'string',
  })
  @Transform(({ value }) => value && getTranslation(value))
  first_name?: Translations;

  @Expose()
  @ApiPropertyOptional({
    description: 'Account last name',
    type: 'string',
  })
  @Transform(({ value }) => value && getTranslation(value))
  last_name?: Translations;

  @Expose()
  @ApiPropertyOptional({
    description: 'Driver phone number',
    type: 'string',
  })
  phone?: string;

  @Expose()
  @ApiPropertyOptional({
    description: 'Account photo',
    type: 'string',
  })
  @Transform(({ value }) => value && value.toString('base64'))
  photo?: Buffer;

  @Expose()
  @ApiProperty({
    description: 'Account email',
  })
  email?: string;

  @Expose()
  @ApiPropertyOptional({
    description: 'New access token with first_name, last_name',
  })
  access_token?: string;

  constructor(partial: Partial<UpdatedAccountInformationResponseDtoV3>) {
    Object.assign(this, partial);
  }
}
