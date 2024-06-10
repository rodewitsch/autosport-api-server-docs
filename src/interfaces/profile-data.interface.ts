import { Translations } from '../general/interfaces/translations.interface';

export interface ProfileData {
  account_id: number;
  driver_id?: number;
  phone?: string;
  organizer_ids: number[];
  first_name?: Translations;
  last_name?: Translations;
  email: string;
  login: string;
}
