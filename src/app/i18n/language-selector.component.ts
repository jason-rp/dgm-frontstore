import { Component, OnInit, Input } from '@angular/core';
import { I18nService } from './i18n.service';
import { SelectItem } from 'primeng/api';

@Component({
  selector: 'app-language-selector',
  templateUrl: './language-selector.component.html',
  styleUrls: ['./language-selector.component.scss'],
})
export class LanguageSelectorComponent implements OnInit {
  @Input() icon = false;
  languages: SelectItem[] = [];
  selectedLanguage = '';

  constructor(private i18nService: I18nService) {}

  ngOnInit() {
    this.selectedLanguage = this.i18nService.language;
    this.getSupportedLanguages();
  }

  private getSupportedLanguages() {
    this.languages = this.i18nService.supportedLanguages.map((lang: string) => {
      return {
        label: lang.toLocaleUpperCase(),
        value: lang,
      };
    });
  }
}
