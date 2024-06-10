import { CanActivate, ExecutionContext, Inject, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { WsException } from '@nestjs/websockets';
import { I18nContext, I18nService } from 'nestjs-i18n';
import { AppRole } from '../enums/app-roles.enum';
import { I18nTranslations } from '../generated/i18n.generated';
import { AuthConfigs } from '../interfaces/auth-config.interface';
import { ProfileData } from '../interfaces/profile-data.interface';

@Injectable()
export class WSAuthGuard implements CanActivate {
  constructor(
    @Inject(Reflector.name) private readonly reflector: Reflector,
    private readonly jwtService: JwtService,
    private readonly i18n: I18nService<I18nTranslations>,
  ) {}

  async checkToken(token: string, authConfigs: AuthConfigs, roles: AppRole[]) {
    const lang = I18nContext.current().lang;
    let profileData: ProfileData;
    try {
      profileData = await this.jwtService.verifyAsync(token, {
        ignoreExpiration: authConfigs.ignoreExpiration,
      });
    } catch (e) {
      throw new Error(this.i18n.t('auth.errors.invalid_token', { lang }));
    }

    if (roles.includes(AppRole.USER) && !profileData?.account_id) {
      throw new Error(this.i18n.t('auth.errors.need_auth', { lang }));
    }

    if (roles.includes(AppRole.DRIVER) && (!profileData?.account_id || !profileData?.driver_id)) {
      throw new Error(this.i18n.t('auth.errors.only_drivers_allowed', { lang }));
    }

    if (roles.includes(AppRole.ORGANIZER) && (!profileData?.account_id || !profileData?.organizer_ids?.length)) {
      throw new Error(this.i18n.t('auth.errors.only_organizers_allowed', { lang }));
    }

    return true;
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const lang = I18nContext.current().lang;
    const authConfigs = this.reflector.getAllAndMerge<AuthConfigs>('authConfigs', [
      context.getHandler(),
      context.getClass(),
    ]);

    const roles = this.reflector.getAllAndMerge<AppRole[]>('roles', [context.getHandler(), context.getClass()]);
    if (roles.includes(AppRole.GUEST)) return true;

    const REQUEST = context.switchToWs().getClient();

    if (REQUEST.headers && REQUEST.headers.authorization) {
      if (REQUEST.headers.authorization.startsWith('Bearer ')) {
        const authToken = REQUEST.headers.authorization.substring(7);
        try {
          return await this.checkToken(authToken, authConfigs, roles);
        } catch (e) {
          throw new WsException(e.message);
        }
      }
      throw new WsException(this.i18n.t('auth.errors.invalid_token', { lang }));
    }
    throw new WsException(this.i18n.t('auth.errors.need_auth', { lang }));
  }
}
