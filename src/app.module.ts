import { Module } from '@nestjs/common';
import { AccountModule } from './modules/account/account.module';
import { AgreementModule } from './modules/agreement/agreement.module';
import { AuthModule } from './modules/auth/auth.module';
import { ChampionshipModule } from './modules/championship/championship.module';
import { ClassifierModule } from './modules/classifier/classifier.module';
import { CoreModule } from './modules/core/core.module';
import { DriverModule } from './modules/driver/driver.module';
import { EventModule } from './modules/event/event.module';
import { HealthCheckModule } from './modules/health-check/health-check.module';
import { LocationModule } from './modules/location/location.module';
import { OrganizerModule } from './modules/organizer/organizer.module';

@Module({
  imports: [
    HealthCheckModule,
    AgreementModule,
    AccountModule,
    AuthModule,
    DriverModule,
    LocationModule,
    OrganizerModule,
    EventModule,
    ClassifierModule,
    ChampionshipModule,
    CoreModule,
  ],
})
export class AppModule {}
