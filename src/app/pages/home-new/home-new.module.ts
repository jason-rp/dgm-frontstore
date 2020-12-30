import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '@shared/shared.module';
import { HomeRoutingModule } from './home-new-routing.module';
import { HomeNewComponent } from './home-new.component';

@NgModule({
  imports: [CommonModule, TranslateModule, SharedModule, HomeRoutingModule],
  declarations: [HomeNewComponent],
})
export class HomeNewModule {}
