import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiForbiddenResponse, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { CommonMessageResponseDto } from 'general/dto/common.response.dto';
import { AppRole } from '../enums/app-roles.enum';
import { AuthGuard } from '../guards/auth.guard';
import { AuthConfigs } from '../interfaces/auth-config.interface';

export const Auth = (roles: AppRole[], authConfigs?: AuthConfigs) => {
  return applyDecorators(
    SetMetadata('authConfigs', authConfigs),
    SetMetadata('roles', roles),
    UseGuards(AuthGuard),
    ApiBearerAuth(),
    ApiUnauthorizedResponse({
      description: 'Unauthorized',
      type: CommonMessageResponseDto,
    }),
    ApiForbiddenResponse({
      description: 'Forbidden',
      type: CommonMessageResponseDto,
    }),
  );
};
