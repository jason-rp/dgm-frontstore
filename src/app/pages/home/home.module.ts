import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { AppSharedModule } from '@shared/shared.module';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';

@NgModule({
  imports: [CommonModule, TranslateModule, AppSharedModule, HomeRoutingModule],
  declarations: [HomeComponent],
})
export class HomeModule {}
