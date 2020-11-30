import { Injectable } from '@angular/core';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { Logger } from '@app/@shared/services/logger.service';
import de from '../../translations/de.json';
import en from '../../translations/en.json';

const log = new Logger('I18nService');
const languageKey = 'language';

/**
 * Pass-through function to mark a string for translation extraction.
 *  e.g. import { marker } from '@biesbjerg/ngx-translate-extract-marker';
 *  marker('Extract me');
 *  More info: https://github.com/biesbjerg/ngx-translate-extract#marker-function
 * Running `npm translations:extract` will include the given string by using this.
 */

@Injectable({
  providedIn: 'root',
})
export class I18nService {
  defaultLanguage!: string;
  supportedLanguages!: string[];

  private langChangeSubscription!: Subscription;

  constructor(private translateService: TranslateService) {
    // Embed languages to avoid extra HTTP requests
    translateService.setTranslation('de', de);
    translateService.setTranslation('en', en);
  }

  /**
   * Initializes i18n for the application.
   * Loads language from local storage if present, or sets default language.
   * @param defaultLanguage The default language to use.
   * @param supportedLanguages The list of supported languages.
   */
  init(defaultLanguage: string, supportedLanguages: string[]) {
    this.defaultLanguage = defaultLanguage;
    this.supportedLanguages = supportedLanguages;
    this.language = this.language ? this.language : 'en';

    // Warning: this subscription will always be alive for the app's lifetime
    this.langChangeSubscription = this.translateService.onLangChange.subscribe((event: LangChangeEvent) => {
      localStorage.setItem(languageKey, event.lang);
      setTimeout(() => {
        window.location.reload();
      }, 100);
    });
  }

  /**
   * Cleans up language change subscription.
   */
  destroy() {
    if (this.langChangeSubscription) {
      this.langChangeSubscription.unsubscribe();
    }
  }

  /**
   * Sets the current language.
   * Note: The current language is saved to the local storage.
   * If no parameter is specified, the language is loaded from local storage (if present).
   * @param language The IETF language code to set.
   */
  set language(language: string) {
    language = language || localStorage.getItem(languageKey) || this.translateService.getBrowserCultureLang();
    let isSupportedLanguage = this.supportedLanguages.includes(language);

    // If no exact match is found, search without the region
    if (language && !isSupportedLanguage) {
      language = language.split('-')[0];
      language = this.supportedLanguages.find((supportedLanguage) => supportedLanguage.startsWith(language)) || '';
      isSupportedLanguage = Boolean(language);
    }

    // Fallback if language is not supported
    if (!isSupportedLanguage) {
      language = this.defaultLanguage;
    }

    log.debug(`Language set to ${language}`);
    this.translateService.use(language);
  }
  /**
   * Gets the current language.
   * @return The current language code.
   */
  get language(): string {
    let lang = this.translateService.currentLang;
    if (!lang) {
      lang = localStorage.getItem(languageKey) || this.translateService.getBrowserCultureLang();
    }
    return lang;
  }
}
