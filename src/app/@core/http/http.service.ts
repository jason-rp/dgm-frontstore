import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { TransferState } from '@angular/platform-browser';
import { Observable, from } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';
import { environment } from '@env/environment';

@Injectable()
export class HttpService {
  apiUrl: string;

  constructor(protected transferState: TransferState, private httpClient: HttpClient) {}

  /**
   * Performs a request with `get` http method.
   */
  get(url: string, options: any = {}, customUri?: any): Observable<any> {
    //options = this.getHeaderOptions();
    return this.getData('get', url, options, (requestMethod: string, requestUrl: string, requestOptions: any) => {
      return this.httpClient.get(this.getHttpUrl(requestUrl, customUri), requestOptions);
    });
  }

  /**
   * Performs a request with `post` http method.
   */
  post(url: string, body: any, options: any = {}, customUri?: any): Observable<any> {
    //options = this.getHeaderOptions();
    return this.getPostData(
      url,
      body,
      options,
      (requestUrl: string, requestBody: any, requestOptions: any): Observable<any> => {
        return this.httpClient.post(this.getHttpUrl(requestUrl, customUri), requestBody, requestOptions);
      }
    );
  }

  postFile(url: string, body: any, customUri?: string): Observable<any> {
    return this.httpClient.post(this.getHttpUrl(url, customUri), body);
  }

  putFile(url: string, body: any, customUri?: string): Observable<any> {
    return this.httpClient.put(this.getHttpUrl(url, customUri), body);
  }

  /**
   * Performs a request with `put` http method.
   */
  put(url: string, body: any, options?: any, customUri?: any): Observable<any> {
    //options = this.getHeaderOptions();
    return this.getPostData(
      url,
      body,
      options,
      (requestUrl: string, requestBody: any, requestOptions: any): Observable<any> => {
        return this.httpClient.put(this.getHttpUrl(requestUrl, customUri), requestBody, requestOptions);
      }
    );
  }

  /**
   * Performs a request with `delete` http method.
   */
  delete(url: string, options?: { withCredentials?: boolean }, customUri?: any): Observable<any> {
    return this.getData('delete', url, options, (method: string, requestUrl: string, requestOptions: any) => {
      return this.httpClient.delete(this.getHttpUrl(requestUrl, customUri), requestOptions);
    });
  }

  download(url: string, customUri?: any): Observable<any> {
    // tslint:disable-next-line:max-line-length
    return this.getData(
      'get',
      url,
      { observe: 'body', responseType: 'blob' },
      (method: string, requestUrl: string, requestOptions: any) => {
        return this.httpClient.get(this.getHttpUrl(requestUrl, customUri), requestOptions);
      }
    );
  }

  downloadPost(url: string, body: any, customUri?: any): Observable<any> {
    // tslint:disable-next-line:max-line-length
    return this.getPostData(
      url,
      body,
      { observe: 'body', responseType: 'blob' },
      (requestUrl: string, requestBody: any, requestOptions: any): Observable<any> => {
        return this.httpClient.post(this.getHttpUrl(requestUrl, customUri), requestBody, requestOptions);
      }
    );
  }

  private getData(
    method: string,
    uri: string | Request,
    options: any,
    callback: (method: string, uri: string | Request, options: any) => Observable<any>
  ): any {
    let url = uri;

    if (typeof uri !== 'string') {
      url = uri.url;
    }

    const key = url + (options ? JSON.stringify(options) : '');

    try {
      return this.resolveData(key);
    } catch (e) {
      return callback(method, uri, options).pipe(
        finalize(() => {}),
        tap((data) => {
          if (options !== undefined && options.isCached) {
            this.setCache(key, data);
          }
        })
      );
    }
  }

  private getHttpUrl(url: string, serverUrl: string = 'serverUrl'): any {
    if (environment.production) {
      return environment[serverUrl] + '/' + url;
    } else {
      return url;
    }
  }

  private getPostData(
    uri: string | Request,
    body: any,
    options: any,
    callback: (uri: string | Request, body: any, options: any) => Observable<Response>
  ): any {
    let url = uri;

    if (typeof uri !== 'string') {
      url = uri.url;
    }

    const key = url + (body ? JSON.stringify(body) : '') + (options ? JSON.stringify(options) : '');
    try {
      return this.resolveData(key);
    } catch (e) {
      return callback(uri, body, options).pipe(
        finalize(() => {}),
        tap((data: any) => {
          if (data && data.failed) {
            console.log(data);
            throw new Error(data.message);
          }

          if (options !== undefined && options.isCached) {
            this.setCache(key, data);
          }
        })
      );
    }
  }

  private resolveData(key: string): any {
    const data = this.getFromCache(key);

    if (!data) {
      throw new Error();
    }

    return from(Promise.resolve(data));
  }

  private setCache(key: any, data: any): any {
    return this.transferState.set(key, data);
  }

  private getFromCache(key: any): any {
    return this.transferState.get(key, null);
  }

  private getHeaderOptions(options?: {
    headers?:
      | HttpHeaders
      | {
          [header: string]: string | string[];
        };
    observe?: 'response';
    params?:
      | HttpParams
      | {
          [param: string]: string | string[];
        };
    reportProgress?: boolean;
    responseType?: 'json';
    withCredentials?: boolean;
  }) {
    const headerOptions = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'Access-Control-Allow-Credentials': 'true',
      'Access-Control-Max-Age': 3600,
    };

    const headers = new HttpHeaders((<any>Object).assign(headerOptions));

    return { headers: headers };
  }

  private mapDownloadData(res: Response): any {
    if (res.status === 204) {
      return null;
    }
    return res.blob();
  }
}
