import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Exclude, Expose, Transform } from 'class-transformer';
import { IsPhoneNumber } from 'class-validator';
import { Translations } from 'general/interfaces/translations.interface';
import { getTranslation } from 'general/utils/translation.utils';

export class AddDriverBodyDtoV3 {
  @ApiPropertyOptional({
    description: 'Driver phone number',
  })
  @IsPhoneNumber()
  phone?: string;
}

@Exclude()
export class AddDriverResponseDtoV3 {
  @Expose()
  @ApiProperty({
    description: 'Driver id',
  })
  driver_id: number;

  @Expose()
  @ApiProperty({
    description: 'Driver first name',
    type: 'string',
  })
  @Transform(({ value }) => getTranslation(value))
  first_name: Translations;

  @Expose()
  @ApiProperty({
    description: 'Driver last name',
    type: 'string',
  })
  @Transform(({ value }) => getTranslation(value))
  last_name: Translations;

  @Expose()
  @ApiProperty({
    description: 'Driver phone number',
  })
  phone: string;

  @Expose()
  @ApiProperty({
    description: 'New access token with first_name, last_name, driver_id',
  })
  access_token: string;

  constructor(partial: Partial<AddDriverResponseDtoV3>) {
    Object.assign(this, partial);
  }
}
