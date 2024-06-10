import { Module } from '@nestjs/common';
import { LocationControllerV1 } from './v1/controllers/location.controller';
import { LocationControllerV2 } from './v2/controllers/location.controller';
import { LocationControllerV3 } from './v3/controllers/location.controller';

@Module({
  imports: [],
  controllers: [LocationControllerV1, LocationControllerV2, LocationControllerV3],
  providers: [],
})
export class LocationModule {}
