/* eslint-disable @typescript-eslint/no-unused-vars */
import { ValidationArguments, ValidationOptions, registerDecorator } from 'class-validator';
const MAX_IMAGE_SIZE_KB = 500;

/**
 * Checks if base64 encoded string size is less then maxSizeKB.
 * Default value for maxSizeKB is 500KB.
 */
export function Base64MaxSize(maxSizeKB: number = MAX_IMAGE_SIZE_KB, validationOptions?: ValidationOptions) {
  return (object: object, propertyName: string) => {
    registerDecorator({
      name: 'Base64MaxSize',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          const length = Buffer.from(value.replace(/^data:image\/[a-z]+;base64,/, '')).length;
          let byteSize = Math.ceil(length / 4) * 3;
          if (length >= 2) {
            const paddings = value.slice(-2);
            if (paddings === '==') byteSize -= 2;
            else if (paddings[1] === '=') byteSize -= 1;
          }
          return byteSize <= maxSizeKB * 1024;
        },
        defaultMessage(args: ValidationArguments) {
          return `Image size exceeds the allowed limit of ${maxSizeKB}KB`;
        },
      },
    });
  };
}
