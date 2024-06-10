import { IResult } from 'ua-parser-js';
import { AuthStatus } from '../enums/auth-status.enum';

export interface SaveAuthLog {
  account_id?: number;
  login: string;
  status_auth: AuthStatus;
  user_agent?: IResult;
  ip?: string;
}
