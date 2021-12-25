import { Dictionary } from '../common/types';

export class Translate {
  private m_locale: Dictionary
  private m_fallbackLocale: Dictionary;

  constructor(locale: string) {
    (async () => {
      await this.loadLocale(locale);
    })();
  }

  loadLocale = async (locale: string) => {
    try {
      this.m_fallbackLocale = require('./en').default;
      this.m_locale = require(`./${locale}`).default;
    } catch (e) {
      // Fallback to English
      this.m_locale = require('./en').default;
    }
  }

  translate = (key: string) => {
    let translated = this.m_locale[key];
    if (translated === undefined) {
      // Fallback to English
      translated = this.m_fallbackLocale[key];
    }
    if (translated === undefined) {
      // Return raw key;
      return key;
    }
    return translated;
  }
  t = this.translate;
}