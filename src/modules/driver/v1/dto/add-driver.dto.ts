import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Exclude, Expose, Transform } from 'class-transformer';
import { IsOptional } from 'class-validator';
import { Translations } from 'general/interfaces/translations.interface';
import { getTranslation } from 'general/utils/translation.utils';

export class AddDriverBodyDtoV1 {
  @ApiPropertyOptional({
    description: 'Driver phone number',
  })
  @IsOptional()
  phone?: string;
}

@Exclude()
export class AddDriverResponseDtoV1 {
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

  constructor(partial: Partial<AddDriverResponseDtoV1>) {
    Object.assign(this, partial);
  }
}
