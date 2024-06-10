import { ApiProperty } from '@nestjs/swagger';
import { IsInt } from 'class-validator';
import { i18nValidationMsg } from 'general/utils/translation.utils';

export class AcceptAgreementBodyDtoV1 {
  @ApiProperty({
    description: 'Agreement type (code)',
  })
  @IsInt({ message: i18nValidationMsg('validations.must_be_integer') })
  c_agreement: number;
}
