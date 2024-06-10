import { applyDecorators, SetMetadata } from '@nestjs/common';
import { LogConfigs } from '../interfaces/log-config.interface';

/**
 * The decorator is designed for additional logging settings.
 * Allowed config props: skip, onlyErrors, responseData
 *
 * @param logConfigs object with config props.
 * @returns [applyDecorators](https://docs.nestjs.com/custom-decorators#decorator-composition)
 *
 * @example common
 * ```typescript
 * LogConfig({
 *   skip: true, - disables request logging completely (default is false)
 *   onlyErrors: true, - logs only if the request ended with an error (default is false)
 *   responseData: true, - enable/disable logging of successful server responses (default is false)
 * })
 * ```
 */

export const LogConfig = (logConfigs: LogConfigs) => applyDecorators(SetMetadata('logConfigs', logConfigs));
