import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
import { marker } from '@biesbjerg/ngx-translate-extract-marker';

const routes: Routes = [
  // Module is lazy loaded, see app-routing.module.ts
  { path: '', component: HomeComponent, data: { title: marker('Home') } },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [],
})
export class HomeRoutingModule {}
