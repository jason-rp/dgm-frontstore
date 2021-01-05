import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { TranslateModule } from '@ngx-translate/core';
import { MenuModule } from 'primeng/menu';
import { FormsModule } from '@angular/forms';
import { LoaderComponent } from './components/loader/loader.component';
import { ActionMenuComponent } from './components/action-menu/action-menu.component';
import { PageHeaderComponent } from './components/page-header/page-header.component';
import { ButtonModule } from 'primeng/button';
import { HeaderComponent } from './components/header/header.component';
import { ProfileDropdownComponent } from './components/header/profile-dropdown/profile-dropdown.component';

@NgModule({
  imports: [CommonModule, TranslateModule, FormsModule, ProgressSpinnerModule, MenuModule, ButtonModule],
  declarations: [LoaderComponent, ActionMenuComponent, PageHeaderComponent, HeaderComponent, ProfileDropdownComponent],
  exports: [LoaderComponent, ActionMenuComponent, PageHeaderComponent, HeaderComponent, ProfileDropdownComponent],
})
export class SharedModule {}
