import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users.component';
import { UsersRoutingModule } from './users-routing.module';
import { TranslateModule } from '@ngx-translate/core';
import { AppSharedModule } from '@app/@shared/shared.module';
import { TableModule } from 'primeng/table';

@NgModule({
  declarations: [UsersComponent],
  imports: [CommonModule, UsersRoutingModule, TranslateModule, AppSharedModule, TableModule],
  exports: [UsersComponent],
})
export class UsersModule {}
