import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StorageEnum } from '@app/@shared/enums/storage.enum';

@Injectable()
export class HeaderInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const headersConfig = {};

    const token = localStorage.getItem(StorageEnum.AccessToken);
    if (token) {
      // tslint:disable-next-line: no-string-literal
      headersConfig['Authorization'] = 'Bearer ' + token;
    }

    request = request.clone({ setHeaders: headersConfig });
    return next.handle(request);
  }
}
