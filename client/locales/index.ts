export type Dictionary = { [key: string]: string };

export class Translate {
  private _locale: Dictionary
  private _fallbackLocale: Dictionary;

  constructor(locale?: string) {
    this._fallbackLocale = require('./en').default;
    this._locale = require('./en').default;
    if (locale) {
      this.loadLocale(locale);
    }
  }

  loadLocale = (locale: string) => {
    try {
      this._locale = require(`./${locale}`).default;
    } catch (e) {
    }
  }

  translate = (key: string) => {
    let translated = this._locale[key];
    if (translated === undefined) {
      // Fallback to English
      translated = this._fallbackLocale[key];
    }
    if (translated === undefined) {
      // Return raw key;
      return key;
    }
    return translated;
  }
  t = this.translate;
}