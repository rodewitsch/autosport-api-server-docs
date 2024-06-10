import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { AppRole } from '../enums/app-roles.enum';
import { WSAuthGuard } from '../guards/ws-auth.guard';
import { AuthConfigs } from '../interfaces/auth-config.interface';

export const WsAuth = (roles: AppRole[], authConfigs?: AuthConfigs) => {
  return applyDecorators(SetMetadata('authConfigs', authConfigs), SetMetadata('roles', roles), UseGuards(WSAuthGuard));
};
