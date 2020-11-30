import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { HeroDetailComponent } from './pages/heroes/hero-detail/hero-detail.component';
import { HeroesComponent } from './pages/heroes/heroes.component';
import { Shell } from '@app/shell/shell.service';
import { AuthenticationGuard } from '@app/auth/authentication.guard';

// const routes: Routes = [
//   { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
//   { path: 'dashboard', component: DashboardComponent },
//   { path: 'detail/:id', component: HeroDetailComponent },
//   { path: 'heroes', component: HeroesComponent }
// ];

const routes: Routes = [
  Shell.childRoutes([
    {
      path: 'home',
      canActivate: [AuthenticationGuard],
      loadChildren: () => import('./pages/home/home.module').then((m) => m.HomeModule),
    },
    {
      path: 'users',
      canActivate: [AuthenticationGuard],
      loadChildren: () => import('./pages/users/users.module').then((m) => m.UsersModule),
    },
    // {
    //   path: '',
    //   redirectTo: 'home',
    //   pathMatch: 'full',
    // },
    { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'detail/:id', component: HeroDetailComponent },
    { path: 'heroes', component: HeroesComponent }
  ]),
  // Fallback when no prior route is matched
  {
    path: '**',
    redirectTo: 'home',
    pathMatch: 'full',
    canActivate: [AuthenticationGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
