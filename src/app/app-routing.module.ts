import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HeroDetailComponent } from './pages/heroes/hero-detail/hero-detail.component';
import { HeroesComponent } from './pages/heroes/heroes.component';
import { Shell } from '@app/shell/shell.service';
import { AuthenticationGuard } from '@app/auth/authentication.guard';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
// import { LoginComponent } from './auth/login.component';

// const routes: Routes = [
//   { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
//   { path: 'dashboard', component: DashboardComponent },
//   { path: 'detail/:id', component: HeroDetailComponent },
//   { path: 'heroes', component: HeroesComponent }
// ];

const routes: Routes = [
  Shell.childRoutes([
    // {
    //   path: 'login',
    //   canActivate: [AuthenticationGuard],
    //   component: LoginComponent
    // },
    {
      path: 'home',
      canActivate: [AuthenticationGuard],
      loadChildren: () => import('./pages/home-new/home-new.module').then((m) => m.HomeNewModule),
    },
    {
      path: 'customize',
      canActivate: [AuthenticationGuard],
      loadChildren: () => import('./pages/customize/customize.module').then((m) => m.Customizemodule),
    },
    // {
    //   path: 'home',
    //   canActivate: [AuthenticationGuard],
    //   loadChildren: () => import('./pages/home/home.module').then((m) => m.HomeModule),
    // },
    {
      path: 'users',
      canActivate: [AuthenticationGuard],
      loadChildren: () => import('./pages/users/users.module').then((m) => m.UsersModule),
    },
    // {
    //   path: 'user',
    //   canActivate: [AuthenticationGuard],
    //   loadChildren: () => import('./pages/user/user.module').then((m) => m.UserModule),
    // },
    // {
    //   path: '',
    //   redirectTo: 'home',
    //   pathMatch: 'full',
    // },
    { path: '', redirectTo: '/home', pathMatch: 'full' },
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
