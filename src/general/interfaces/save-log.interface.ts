import { LogType } from '../enums/log.enum';

export interface SaveLog {
  message: string;
  code?: string;
  type?: LogType;
  stack?: string;
  prim?: string;
  module?: string;
  account_id?: number;
}
