import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '@shared/shared.module';
import { HomeRoutingModule } from './customize-routing.module';
import { CustomizeComponent } from './customize.component';

@NgModule({
  imports: [CommonModule, TranslateModule, SharedModule, HomeRoutingModule],
  declarations: [CustomizeComponent],
})
export class Customizemodule {}
