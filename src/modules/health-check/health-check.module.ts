import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { HealthCheckControllerNeutral } from './neutral/controllers/health-check.controller';

@Module({
  imports: [TerminusModule],
  controllers: [HealthCheckControllerNeutral],
  providers: [],
})
export class HealthCheckModule {}
