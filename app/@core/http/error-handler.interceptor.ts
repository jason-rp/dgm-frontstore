import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable, from, throwError, BehaviorSubject, of } from 'rxjs';
import { catchError, switchMap, finalize, filter, take } from 'rxjs/operators';

import { environment } from '@env/environment';
import { MessageService } from 'primeng/api';
import { Logger } from '@app/@shared/services/logger.service';
import { AppService } from '@app/app.service';
import { TranslateService } from '@ngx-translate/core';
import { StorageEnum } from '@app/@shared/enums/storage.enum';

const log = new Logger('ErrorHandlerInterceptor');

/**
 * Adds a default error handler to all requests.
 */
@Injectable({
  providedIn: 'root',
})
export class ErrorHandlerInterceptor implements HttpInterceptor {
  private isTokenRefreshing = false;
  private tokenRefreshSubject = new BehaviorSubject<any>(null);

  constructor(
    private messageService: MessageService,
    private appService: AppService,
    private translateService: TranslateService
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(catchError((error) => this.errorHandler(error, request, next)));
  }

  // Customize the default error handler here if needed
  private errorHandler(error: any, request: HttpRequest<any>, next: HttpHandler): Observable<any> {
    if (!environment.production) {
      // Do something with the error
      log.error('Request error', error.status);
    }

    switch (error.status) {
      case 401:
        return this.handle401Error(error, request, next);
      case 403:
        this.handle403Error();
        break;
      case 500:
        this.handle500Error();
        break;
    }

    throw error;
  }

  /* 
    Refresh access token when it's expired.
    Note: the refresh token expiry time is 14 days.
    This is configurable in ADD B2C by adjusting 'Refresh token lifetime' (days)
  */
  private handle401Error(error: any, request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!this.isTokenRefreshing) {
      this.isTokenRefreshing = true;
      this.tokenRefreshSubject.next(null);

      // TODO: replace 'of('test')' with real API request to get new access token
      return from(of('test')).pipe(
        switchMap((resp) => {
          if (!resp) {
            return throwError(error);
          }

          // TODO: replace 'MOCK_TOKEN' with real value
          this.tokenRefreshSubject.next('MOCK_TOKEN');
          localStorage.setItem(StorageEnum.AccessToken, 'MOCK_TOKEN');

          return next.handle(request);
        }),
        catchError((err) => {
          // TODO: navigate to login page here

          return throwError(err);
        }),
        finalize(() => (this.isTokenRefreshing = false))
      );
    }

    return this.tokenRefreshSubject.pipe(
      filter((accessToken) => accessToken),
      take(1),
      switchMap((accessToken) => {
        localStorage.setItem(StorageEnum.AccessToken, accessToken);

        return next.handle(request);
      })
    );
  }

  private handle403Error() {
    this.messageService.clear();

    this.messageService.add({
      severity: 'error',
      summary: this.translateService.instant('You are not authorised to access the data.'),
    });
  }

  private handle500Error() {
    this.appService.isLoading = false;

    this.messageService.clear();

    this.messageService.add({
      severity: 'error',
      summary: this.translateService.instant('Internal server error. Please contact admin for support.'),
    });
  }
}
