import { ApiProperty, OmitType } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';
import { i18nValidationMsg } from 'general/utils/translation.utils';
import { SignupDtoV2, SignupResponseDtoV2 } from './signup.dto';

export class ConfirmSignupDtoV2 extends SignupDtoV2 {
  @ApiProperty({
    description: 'Account confirmation code',
  })
  @IsNotEmpty({ message: i18nValidationMsg('auth.validations.confirmation_code_cannot_be_empty') })
  confirmation_code: string;
}

@Exclude()
export class ConfirmSignupResponseDtoV2 extends OmitType(SignupResponseDtoV2, ['confirmation_code_expires_at']) {
  constructor(partial: Partial<ConfirmSignupResponseDtoV2>) {
    super(partial);
    Object.assign(this, partial);
  }
}
