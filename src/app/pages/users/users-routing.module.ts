import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// App components
import { UsersComponent } from './users.component';

// Others
import { marker } from '@biesbjerg/ngx-translate-extract-marker';

const routes: Routes = [
  // Module is lazy loaded, see app-routing.module.ts
  { path: '', component: UsersComponent, data: { title: marker('User Management') } },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [],
})
export class UsersRoutingModule {}
