import { AuthStatus } from '../enums/auth-status.enum';

export interface SaveAuthLog {
  account_id?: number;
  login: string;
  status_auth: AuthStatus;
  user_agent?: string;
  ip?: string;
}
