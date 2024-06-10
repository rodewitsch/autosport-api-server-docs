import { ClsStore } from 'nestjs-cls';

export interface ClsSessionStore extends ClsStore {
  driver_id: number;
  organizer_ids: number[];
}
