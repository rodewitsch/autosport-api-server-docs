import { ApiProperty, OmitType } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';
import { i18nValidationMsg } from 'general/utils/translation.utils';
import { SignupDtoV1, SignupResponseDtoV1 } from './signup.dto';

export class ConfirmSignupDtoV1 extends SignupDtoV1 {
  @ApiProperty({
    description: 'Account confirmation code',
  })
  @IsNotEmpty({ message: i18nValidationMsg('auth.validations.confirmation_code_cannot_be_empty') })
  confirmation_code: string;
}

@Exclude()
export class ConfirmSignupResponseDtoV1 extends OmitType(SignupResponseDtoV1, ['confirmation_code_expires_at']) {
  constructor(partial: Partial<ConfirmSignupResponseDtoV1>) {
    super(partial);
    Object.assign(this, partial);
  }
}
