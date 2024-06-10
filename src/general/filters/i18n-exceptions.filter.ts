import { ArgumentsHost, Catch, ExceptionFilter, ValidationError } from '@nestjs/common';
import iterate from 'iterare';
import {
  I18nContext,
  I18nValidationError,
  I18nValidationException,
  I18nValidationExceptionFilterDetailedErrorsOption,
  I18nValidationExceptionFilterErrorFormatterOption,
} from 'nestjs-i18n';
import { formatI18nErrors, mapChildrenToValidationErrors } from 'nestjs-i18n/dist/utils';
import { I18nTranslations } from '../../generated/i18n.generated';

type I18nValidationExceptionFilterOptions =
  | I18nValidationExceptionFilterDetailedErrorsOption
  | I18nValidationExceptionFilterErrorFormatterOption;

@Catch(I18nValidationException)
export class I18nValidationExceptionFilter implements ExceptionFilter {
  constructor(
    private readonly options: I18nValidationExceptionFilterOptions = {
      detailedErrors: true,
    },
  ) {}
  catch(exception: any, host: ArgumentsHost) {
    const i18n = I18nContext.current<I18nTranslations>(host);
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    const errors = formatI18nErrors(exception.errors ?? [], i18n.service, {
      lang: i18n.lang,
    });
    const normalizedErrors = this.normalizeValidationErrors(errors);

    const responseBody = this.buildResponseBody(host, exception, normalizedErrors);
    return response.status(this.options.errorHttpStatusCode || exception.getStatus()).json({
      message:
        responseBody.errors && Array.isArray(responseBody.errors)
          ? responseBody.errors.join('. ')
          : responseBody.errors,
    });
  }

  private isWithErrorFormatter(
    options: I18nValidationExceptionFilterOptions,
  ): options is I18nValidationExceptionFilterErrorFormatterOption {
    return 'errorFormatter' in options;
  }

  protected normalizeValidationErrors(validationErrors: ValidationError[]): string[] | I18nValidationError[] | object {
    if (this.isWithErrorFormatter(this.options) && !('detailedErrors' in this.options))
      return this.options.errorFormatter(validationErrors);

    if (!this.isWithErrorFormatter(this.options) && !this.options.detailedErrors)
      return this.flattenValidationErrors(validationErrors);

    return validationErrors;
  }

  protected flattenValidationErrors(validationErrors: ValidationError[]): string[] {
    return iterate(validationErrors)
      .map((error) => mapChildrenToValidationErrors(error))
      .flatten()
      .filter((item) => !!item.constraints)
      .map((item) => Object.values(item.constraints))
      .flatten()
      .toArray();
  }
  protected buildResponseBody(
    host: ArgumentsHost,
    exc: I18nValidationException,
    errors: string[] | I18nValidationError[] | object,
  ) {
    if ('responseBodyFormatter' in this.options) {
      return this.options.responseBodyFormatter(host, exc, errors);
    } else {
      return {
        statusCode: this.options.errorHttpStatusCode === undefined ? exc.getStatus() : this.options.errorHttpStatusCode,
        message: exc.getResponse(),
        errors,
      };
    }
  }
}
