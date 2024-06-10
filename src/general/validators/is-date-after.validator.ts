import { ValidationArguments, ValidationOptions, registerDecorator } from 'class-validator';

export function IsDateAfter(property: string, validationOptions?: ValidationOptions) {
  return (object: object, propertyName: string) => {
    registerDecorator({
      name: 'isDateAfter',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [property],
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          const [relatedPropertyName] = args.constraints;
          const relatedValue = (args.object as any)[relatedPropertyName];
          if (!relatedValue) return true;
          if ((!relatedValue || relatedValue instanceof Date) && value instanceof Date) {
            return value > relatedValue;
          }
          return true;
        },
        defaultMessage(args: ValidationArguments) {
          const [relatedPropertyName] = args.constraints;
          return `${propertyName} must be after ${relatedPropertyName}`;
        },
      },
    });
  };
}
