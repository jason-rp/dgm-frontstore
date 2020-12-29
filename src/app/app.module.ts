// // import { NgModule } from '@angular/core';
// // import { BrowserModule } from '@angular/platform-browser';
// // import { FormsModule } from '@angular/forms';
// // import { HttpClientModule } from '@angular/common/http';

// // import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
// // import { InMemoryDataService } from './in-memory-data.service';

// // import { AppRoutingModule } from './app-routing.module';

// // import { AppComponent } from './app.component';
// // import { MessagesComponent } from './messages/messages.component';

// // import { PLATFORM_ID, APP_ID, Inject } from '@angular/core';
// // import { isPlatformBrowser } from '@angular/common';
// // import { HeroesComponent } from './pages/heroes/heroes.component';
// // import { HeroDetailComponent } from './pages/heroes/hero-detail/hero-detail.component';
// // import { HeroSearchComponent } from './pages/heroes/hero-search/hero-search.component';
// // import { ShellModule } from '@app/shell/shell.module';
// // import { MissingTranslationHandler, TranslateModule, MissingTranslationHandlerParams } from '@ngx-translate/core';
// // import { BlockUIModule } from '@prmng/blockui';
// // import { ToastModule } from '@prmng/toast';
// // import { ConfirmDialogModule } from '@prmng/confirmdialog';
// // import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// // import { DashboardComponent } from './pages/dashboard/dashboard.component';
// // // required for AoT
// // export class MyMissingTranslationHandler implements MissingTranslationHandler {
// //   handle(params: MissingTranslationHandlerParams) {
// //     return params.key;
// //   }
// // }

// // @NgModule({
// //   imports: [
// //     BrowserModule.withServerTransition({ appId: 'tour-of-heroes' }),
// //     BrowserAnimationsModule,
// //     FormsModule,
// //     AppRoutingModule,
// //     HttpClientModule,
// //     ShellModule,
// //     TranslateModule.forRoot({
// //       missingTranslationHandler: { provide: MissingTranslationHandler, useClass: MyMissingTranslationHandler },
// //     }),
// //     BlockUIModule,
// //     ToastModule,
// //     ConfirmDialogModule,
// //     // The HttpClientInMemoryWebApiModule module intercepts HTTP requests
// //     // and returns simulated server responses.
// //     // Remove it when a real server is ready to receive requests.
// //     HttpClientInMemoryWebApiModule.forRoot(
// //       InMemoryDataService, { dataEncapsulation: false }
// //     )
// //   ],
// //   declarations: [
// //     AppComponent,
// //     DashboardComponent,
// //     HeroesComponent,
// //     HeroDetailComponent,
// //     MessagesComponent,
// //     HeroSearchComponent,
// //   ],
// //   bootstrap: [ AppComponent ]
// // })
// // export class AppModule {
// //   constructor(
// //     @Inject(PLATFORM_ID) private platformId: object,
// //     @Inject(APP_ID) private appId: string) {
// //     const platform = isPlatformBrowser(platformId) ?
// //       'in the browser' : 'on the server';
// //     console.log(`Running ${platform} with appId=${appId}`);
// //   }
// // }


// import { EffectsModule } from '@ngrx/effects';
// import { environment } from './../environments/environment.prod';
// import { BrowserModule } from '@angular/platform-browser';
// import { NgModule } from '@angular/core';
// import { FormsModule } from '@angular/forms';
// import { HttpModule } from '@angular/http';
// import { RouterModule, PreloadAllModules } from '@angular/router';
// import { StoreDevtoolsModule } from '@ngrx/store-devtools';

// // Components
// import { AppComponent } from './app.component';
// // Routes
// import { routes } from './app.routes';
// // Modules
// import { SharedModule } from './shared/index';
// import { UserModule } from './user/index';
// import { HomeModule } from './home/index';
// import { LayoutModule } from './layout/index';
// import { CoreModule } from './core/index';
// import { StoreModule } from '@ngrx/store';
// import { reducers, metaReducers } from './app.reducers';
// import { CheckoutHeaderComponent } from './layout/checkout-header/checkout-header.component';
// import { CheckoutFooterComponent } from './layout/checkout-footer/checkout-footer.component';

// // adding rx operators
// import 'rxjs/add/operator/map';
// import 'rxjs/add/operator/filter';
// import 'rxjs/add/operator/switchMap';
// import 'rxjs/add/operator/catch';
// import 'rxjs/add/operator/do';
// import 'rxjs/add/operator/finally';
// import 'rxjs/add/observable/of';

// @NgModule({
//   declarations: [
//     AppComponent,
//     CheckoutHeaderComponent,
//     CheckoutFooterComponent
//   ],
//   imports: [
//     RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
//     StoreModule.forRoot(reducers, { metaReducers }),

//     /**
//      * Store devtools instrument the store retaining past versions of state
//      * and recalculating new states. This enables powerful time-travel
//      * debugging.
//      *
//      * To use the debugger, install the Redux Devtools extension for either
//      * Chrome or Firefox
//      *
//      * See: https://github.com/zalmoxisus/redux-devtools-extension
//      */
//     !environment.production ? StoreDevtoolsModule.instrument() : [],

//     /**
//      * EffectsModule.forRoot() is imported once in the root module and
//      * sets up the effects class to be initialized immediately when the
//      * application starts.
//      *
//      * See: https://github.com/ngrx/platform/blob/master/docs/effects/api.md#forroot
//      */
//     EffectsModule.forRoot([]),

//     BrowserModule,
//     FormsModule,
//     HttpModule,
//     HomeModule,
//     LayoutModule,
//     CoreModule,
//     SharedModule
//   ],
//   providers: [],
//   bootstrap: [AppComponent]
// })
// export class AppModule { }


// import { EffectsModule } from '@ngrx/effects';
import { environment } from './../environments/environment.prod';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
// import { HttpModule } from '@angular/http';
import { RouterModule, PreloadAllModules } from '@angular/router';
// import { StoreDevtoolsModule } from '@ngrx/store-devtools';

// Components
import { AppComponent } from './app.component';
// Routes
import { routes } from './app-routing.module';
// Modules
import { SharedModule } from './@shared/shared/index';
import { UserModule } from './pages/user/index';
import { HomeModule } from './pages/home/index';
import { LayoutModule } from './layout/index';
import { CoreModule } from './@core/core/index';
// import { StoreModule } from '@ngrx/store';
// import { reducers, metaReducers } from './app.reducers';
import { CheckoutHeaderComponent } from './layout/checkout-header/checkout-header.component';
import { CheckoutFooterComponent } from './layout/checkout-footer/checkout-footer.component';

// adding rx operators
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/finally';
import 'rxjs/add/observable/of';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    CheckoutHeaderComponent,
    CheckoutFooterComponent
  ],
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
    // StoreModule.forRoot(reducers, { metaReducers }),

    /**
     * Store devtools instrument the store retaining past versions of state
     * and recalculating new states. This enables powerful time-travel
     * debugging.
     *
     * To use the debugger, install the Redux Devtools extension for either
     * Chrome or Firefox
     *
     * See: https://github.com/zalmoxisus/redux-devtools-extension
     */
    // !environment.production ? StoreDevtoolsModule.instrument() : [],

    /**
     * EffectsModule.forRoot() is imported once in the root module and
     * sets up the effects class to be initialized immediately when the
     * application starts.
     *
     * See: https://github.com/ngrx/platform/blob/master/docs/effects/api.md#forroot
     */
    // EffectsModule.forRoot([]),

    BrowserModule,
    FormsModule,
    HttpClientModule,
    HomeModule,
    LayoutModule,
    CoreModule,
    SharedModule,
    CommonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
