import { applyDecorators, Type } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiExtraModels,
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiProperty,
  ApiUnauthorizedResponse,
  getSchemaPath,
} from '@nestjs/swagger';

type ApiResponseCodes = 200 | 201 | 400 | 401 | 403 | 404 | 500;

type Paginated = (model: Type<any>) => any[];

type ApiResponseProps = {
  [key in ApiResponseCodes]?: Type<any> | Type<any>[] | Paginated;
};

function isClass(value) {
  return (
    typeof value === 'function' &&
    (/^\s*class[^\w]+/.test(value.toString()) || (globalThis[value.name] === value && /^[A-Z]/.test(value.name)))
  );
}

export class PaginateResultDto<TData> {
  @ApiProperty()
  total: number;

  @ApiProperty()
  data: TData[];
}

export const Paginate = (model: Type<any>): any[] => {
  return [
    ApiExtraModels(PaginateResultDto, model),
    ApiOkResponse({
      schema: {
        allOf: [
          { $ref: getSchemaPath(PaginateResultDto) },
          {
            properties: {
              data: {
                type: 'array',
                items: { $ref: getSchemaPath(model) },
              },
            },
          },
        ],
      },
    }),
  ];
};

/**
 * Short form for @ApiResponse decorators.
 *
 * Allowed response codes: 200, 201, 401, 400, 404, 500
 *
 * @param props object with response codes and models.
 * @returns [applyDecorators](https://docs.nestjs.com/custom-decorators#decorator-composition)
 *
 * @example common
 * ```typescript
 * ApiResponses({
 *   200: LogResponseDto,
 *   500: CommonMessageResponse,
 * })
 * ```
 * @example array of models
 * ```typescript
 * ApiResponses({
 *   200: [LogResponseDto],
 *   500: CommonMessageResponse,
 * })
 * ```
 * @example paginated array of models (add wrapper dto with total and data properties)
 * ```typescript
 * ApiResponses({
 *   200: Paginate(LogResponseDto),
 *   500: CommonMessageResponse,
 * })
 * ```
 */
export const ApiResponses = (props: ApiResponseProps) => {
  const decorators = [];
  const statusResponse = {
    200: ApiOkResponse,
    201: ApiCreatedResponse,
    400: ApiBadRequestResponse,
    401: ApiUnauthorizedResponse,
    403: ApiForbiddenResponse,
    404: ApiNotFoundResponse,
    500: ApiInternalServerErrorResponse,
  };
  for (const key in props) {
    if (props[key].every?.((item) => !isClass(item))) {
      decorators.push(...props[key]);
    } else {
      decorators.push(statusResponse[key]({ type: props[key] }));
    }
  }
  return applyDecorators(...decorators);
};
