import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from '@nestjs/common';
import { I18nContext } from 'nestjs-i18n';
import { TypeORMError } from 'typeorm';
import { I18nTranslations } from '../../generated/i18n.generated';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const i18n = I18nContext.current<I18nTranslations>(host);
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    const status = exception?.getStatus?.() || HttpStatus.INTERNAL_SERVER_ERROR;

    if (exception instanceof TypeORMError) {
      return response.status(status).json({ message: i18n.t('errors.common_error') });
    }

    if (exception?.response?.statusCode) {
      response.status(status).json({
        message:
          exception.response.message && Array.isArray(exception.response.message)
            ? exception.response.message.join('. ')
            : exception.response.message,
      });
    } else {
      if (exception?.response?.code) {
        response.status(status).json({ message: exception.message, code: exception.response.code });
      } else {
        response.status(status).json({ message: exception.message });
      }
    }
  }
}
