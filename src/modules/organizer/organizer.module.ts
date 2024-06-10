import { Module } from '@nestjs/common';
import { OrganizerControllerV1 } from './v1/controllers/organizer.controller';
import { OrganizerControllerV2 } from './v2/controllers/organizer.controller';
import { OrganizerControllerV3 } from './v3/controllers/organizer.controller';

@Module({
  imports: [],
  controllers: [OrganizerControllerV1, OrganizerControllerV2, OrganizerControllerV3],
  providers: [],
})
export class OrganizerModule {}
