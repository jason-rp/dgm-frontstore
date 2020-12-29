// import { NgModule } from '@angular/core';
// import { RouterModule, Routes } from '@angular/router';

// import { HeroDetailComponent } from './pages/heroes/hero-detail/hero-detail.component';
// import { HeroesComponent } from './pages/heroes/heroes.component';
// import { Shell } from '@app/shell/shell.service';
// import { AuthenticationGuard } from '@app/auth/authentication.guard';
// import { DashboardComponent } from './pages/dashboard/dashboard.component';

// // const routes: Routes = [
// //   { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
// //   { path: 'dashboard', component: DashboardComponent },
// //   { path: 'detail/:id', component: HeroDetailComponent },
// //   { path: 'heroes', component: HeroesComponent }
// // ];

// const routes: Routes = [
//   Shell.childRoutes([
//     {
//       path: 'home',
//       canActivate: [AuthenticationGuard],
//       loadChildren: () => import('./pages/home/home.module').then((m) => m.HomeModule),
//     },
//     {
//       path: 'users',
//       canActivate: [AuthenticationGuard],
//       loadChildren: () => import('./pages/users/users.module').then((m) => m.UsersModule),
//     },
//     // {
//     //   path: '',
//     //   redirectTo: 'home',
//     //   pathMatch: 'full',
//     // },
//     { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
//     { path: 'dashboard', component: DashboardComponent },
//     { path: 'detail/:id', component: HeroDetailComponent },
//     { path: 'heroes', component: HeroesComponent }
//   ]),
//   // Fallback when no prior route is matched
//   {
//     path: '**',
//     redirectTo: 'home',
//     pathMatch: 'full',
//     canActivate: [AuthenticationGuard],
//   },
// ];

// @NgModule({
//   imports: [RouterModule.forRoot(routes)],
//   exports: [RouterModule]
// })
// export class AppRoutingModule { }

import { RouterModule, Routes } from '@angular/router';
import { CanActivateViaAuthGuard } from './@core/core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    loadChildren: './home/index#HomeModule' },
  {
    path: 'checkout',
    loadChildren: './checkout/checkout.module#CheckoutModule' },
  {
    path: 'user',
    loadChildren: './user/index#UserModule',
    canActivate: [ CanActivateViaAuthGuard ]
  },
  {
    path: 'product',
    loadChildren: './product/index#ProductModule'
  },
  {
    path: 'auth',
    loadChildren: './auth/auth.module#AuthModule'
  }
];
