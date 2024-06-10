import { PathImpl2 } from '@nestjs/config';
import { ValidationArguments } from 'class-validator';
import { I18nContext, i18nValidationMessage } from 'nestjs-i18n';
import { I18nTranslations } from '../../generated/i18n.generated';
import { Translations } from '../interfaces/translations.interface';

export function getTranslation(value: Translations, lang?: string): string | null {
  if (!value) return null;
  const i18n = I18nContext.current<I18nTranslations>();
  if (!lang) lang = i18n?.lang;
  if (value[lang]) return value[lang];
  return value[Object.keys(value)[0]] || null;
}

export function i18nValidationMsg(key: PathImpl2<I18nTranslations>, args?: any): (a: ValidationArguments) => string {
  return i18nValidationMessage(key, args);
}
