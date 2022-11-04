import { getLanguageByDevice } from '../utils/';
import I18n from 'i18n-js';
import en from './languages/en-US';
import pt from './languages/pt-BR';

const normalizeTranslate = {
  en_US: 'en_US',
  pt_BR: 'pt_BR',
  en: 'en_US',
  pt_US: 'pt_BR',
};

I18n.fallbacks = true;

I18n.translations = {
  en_US: en,
  pt_BR: pt,
};

const setLanguageToI18n = () => {
  const language = getLanguageByDevice();
  const translateNormalize = normalizeTranslate[language];
  const iHaveThisLanguage =
    I18n.translations.hasOwnProperty(translateNormalize);
  iHaveThisLanguage
    ? (I18n.locale = translateNormalize)
    : (I18n.defaultLocale = 'en_US');
};

setLanguageToI18n();

export const translate = (key) => I18n.t(key);
