import { Module } from '@nestjs/common';
import { AuthControllerV1 } from './v1/controllers/auth.controller';
import { AuthControllerV2 } from './v2/controllers/auth.controller';
import { AuthControllerV3 } from './v3/controllers/auth.controller';

@Module({
  imports: [],
  controllers: [AuthControllerV1, AuthControllerV2, AuthControllerV3],
  providers: [],
})
export class AuthModule {}
