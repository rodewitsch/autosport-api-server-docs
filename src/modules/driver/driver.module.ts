import { Module } from '@nestjs/common';
import { DriverDocumentsControllerV1 } from './v1/controllers/driver-documents.controller';
import { DriverTiresControllerV1 } from './v1/controllers/driver-tires.controller';
import { DriverVehicleControllerV1 } from './v1/controllers/driver-vehicle.controller';
import { DriverControllerV1 } from './v1/controllers/driver.controller';
import { DriverDocumentsControllerV2 } from './v2/controllers/driver-documents.controller';
import { DriverTiresControllerV2 } from './v2/controllers/driver-tires.controller';
import { DriverVehicleControllerV2 } from './v2/controllers/driver-vehicle.controller';
import { DriverControllerV2 } from './v2/controllers/driver.controller';
import { DriverDocumentsControllerV3 } from './v3/controllers/driver-documents.controller';
import { DriverTiresControllerV3 } from './v3/controllers/driver-tires.controller';
import { DriverVehicleControllerV3 } from './v3/controllers/driver-vehicle.controller';
import { DriverControllerV3 } from './v3/controllers/driver.controller';

@Module({
  imports: [],
  controllers: [
    DriverControllerV1,
    DriverDocumentsControllerV1,
    DriverTiresControllerV1,
    DriverVehicleControllerV1,
    DriverControllerV2,
    DriverDocumentsControllerV2,
    DriverTiresControllerV2,
    DriverVehicleControllerV2,
    DriverControllerV3,
    DriverDocumentsControllerV3,
    DriverTiresControllerV3,
    DriverVehicleControllerV3,
  ],
  providers: [],
})
export class DriverModule {}
