import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { LanguageSelectorComponent } from './language-selector.component';
import { DropdownModule } from 'primeng/dropdown';

@NgModule({
  imports: [CommonModule, FormsModule, TranslateModule, DropdownModule],
  declarations: [LanguageSelectorComponent],
  exports: [LanguageSelectorComponent],
})
export class I18nModule {}
