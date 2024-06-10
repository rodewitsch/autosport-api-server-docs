import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { AccountControllerV1 } from './v1/controllers/account.controller';
import { AccountControllerV2 } from './v2/controllers/account.controller';
import { AccountControllerV3 } from './v3/controllers/account.controller';

@Module({
  imports: [AuthModule],
  controllers: [AccountControllerV1, AccountControllerV2, AccountControllerV3],
  providers: [],
})
export class AccountModule {}
