import { Module } from '@nestjs/common';
import { EventMembershipControllerV1 } from './v1/controllers/event-membership.controller';
import { EventControllerV1 } from './v1/controllers/event.controller';
import { EventMembershipControllerV2 } from './v2/controllers/event-membership.controller';
import { EventControllerV2 } from './v2/controllers/event.controller';
import { EventMembershipControllerV3 } from './v3/controllers/event-membership.controller';
import { EventControllerV3 } from './v3/controllers/event.controller';

@Module({
  imports: [],
  controllers: [
    EventControllerV1,
    EventMembershipControllerV1,
    EventControllerV2,
    EventMembershipControllerV2,
    EventControllerV3,
    EventMembershipControllerV3,
  ],
  providers: [],
})
export class EventModule {}
