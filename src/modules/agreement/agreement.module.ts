import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { AgreementControllerNeutral } from './neutral/controllers/agreement.controller';
import { AgreementControllerV1 } from './v1/controllers/agreement.controller';
import { AgreementControllerV2 } from './v2/controllers/agreement.controller';
import { AgreementControllerV3 } from './v3/controllers/agreement.controller';

@Module({
  imports: [AuthModule],
  controllers: [AgreementControllerNeutral, AgreementControllerV1, AgreementControllerV2, AgreementControllerV3],
  providers: [],
})
export class AgreementModule {}
