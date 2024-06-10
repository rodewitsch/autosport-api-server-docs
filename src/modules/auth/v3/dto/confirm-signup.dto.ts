import { ApiProperty, OmitType } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';
import { i18nValidationMsg } from 'general/utils/translation.utils';
import { SignupDtoV3, SignupResponseDtoV3 } from './signup.dto';

export class ConfirmSignupDtoV3 extends SignupDtoV3 {
  @ApiProperty({
    description: 'Account confirmation code',
  })
  @IsNotEmpty({ message: i18nValidationMsg('auth.validations.confirmation_code_cannot_be_empty') })
  confirmation_code: string;
}

@Exclude()
export class ConfirmSignupResponseDtoV3 extends OmitType(SignupResponseDtoV3, ['confirmation_code_expires_at']) {
  constructor(partial: Partial<ConfirmSignupResponseDtoV3>) {
    super(partial);
    Object.assign(this, partial);
  }
}
