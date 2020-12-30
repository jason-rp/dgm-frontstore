import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

/** Components */
import { UserComponent } from './user.component';
import { UserDetailsComponent } from './details/details.component';

/** Modules */
import { SharedModule } from '@shared/shared.module';

/** PrimeNG modules */
//import { PrimeNgModule } from '@app/@shared/primeng.module';
import { MultiSelectModule } from 'primeng/multiselect';

/** Services */
import { UserService } from './user.service';
import { UserRoutingModule } from './user-routing.module';
import { PasswordComponent } from './password/password.component';

@NgModule({
  declarations: [UserComponent, UserDetailsComponent, PasswordComponent],
  imports: [
    // Angular modules
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,

    // App modules
    UserRoutingModule,
    SharedModule,

    // PrimeNG modules
    // PrimeNgModule,
    MultiSelectModule,
  ],
  providers: [UserService],
})
export class UserModule {}
