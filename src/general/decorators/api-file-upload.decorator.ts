import { HttpCode, UseInterceptors, applyDecorators } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes } from '@nestjs/swagger';

/**
 * Decorator encapsulates set of NestJS and Swagger decorators,
 * required for handling single file upload in multipart/form-data enctype
 *
 * @param fieldName string with file field name
 * @returns [applyDecorators](https://docs.nestjs.com/custom-decorators#decorator-composition)
 */
export const ApiFormDataUpload = (fieldName: string) => {
  return applyDecorators(
    HttpCode(200),
    ApiConsumes('multipart/form-data'),
    ApiBody({
      schema: {
        type: 'object',
        properties: {
          [fieldName]: {
            type: 'string',
            format: 'binary',
          },
        },
        required: [fieldName],
      },
    }),
    UseInterceptors(FileInterceptor(fieldName)),
  );
};
