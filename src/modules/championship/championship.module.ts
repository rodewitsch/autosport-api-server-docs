import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { ChampionshipControllerV1 } from './v1/controllers/championship.controller';
import { ChampionshipControllerV2 } from './v2/controllers/championship.controller';
import { ChampionshipControllerV3 } from './v3/controllers/championship.controller';

@Module({
  imports: [AuthModule],
  controllers: [ChampionshipControllerV1, ChampionshipControllerV2, ChampionshipControllerV3],
  providers: [],
})
export class ChampionshipModule {}
