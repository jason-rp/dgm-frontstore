import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ShellComponent } from './shell.component';
import { I18nModule } from '@app/i18n/i18n.module';
import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { InputTextModule } from 'primeng/inputtext';
import { SidebarModule } from 'primeng/sidebar';
import { MenuModule } from 'primeng/menu';
import { NavbarComponent } from './components/navbar/navbar.component';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    RouterModule,
    FormsModule,
    I18nModule,
    ButtonModule,
    ToolbarModule,
    ScrollPanelModule,
    InputTextModule,
    SidebarModule,
    MenuModule,
  ],
  declarations: [ShellComponent, NavbarComponent],
})
export class ShellModule {}
