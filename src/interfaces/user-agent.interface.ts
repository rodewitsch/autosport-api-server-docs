import { Platform } from 'general/enums/platform.enum';

export interface UserAgent {
  raw?: string;
  app_version?: string;
  build_version?: string;
  device_model?: string;
  device_name?: string;
  device_platform?: Platform;
}
