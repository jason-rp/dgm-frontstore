import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';
import {  STORAGE } from '@app/@shared/enums/storage.enum';
import { Credentials, CredentialsService } from './credentials.service';
import { Logger } from '@app/@shared/services/logger.service';

const log = new Logger('AuthenticationService');
export interface LoginContext {
  username: string;
  password: string;
  remember?: boolean;
}

/**
 * Provides a base for authentication workflow.
 * The login/logout methods should be replaced with proper implementation.
 */
@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  authenticationState = new BehaviorSubject(false);

  constructor(private credentialsService: CredentialsService) {}

  /**
   * Note: this is only a mocked function
   * Authenticates the user.
   * @param context The login parameters.
   * @return The user credentials.
   */
  login(context: LoginContext): Observable<Credentials> {
    // Replace by proper authentication call
    const data = {
      username: context.username,
      token: '123456',
    };
    this.credentialsService.setCredentials(data, context.remember);
    return of(data);
  }

  /**
   * Logs out the user and clear app state.
   */
  logout(): void {
    this.credentialsService.setCredentials();

    // TODO: clear cache & logout here
  }

  isAuthenticated() {
    const token = localStorage.getItem(STORAGE.accessToken);
    return !!token;
  }

  setStorage(key: string, value: any) {
    localStorage.setItem(key, value);
  }

  getStorage(key: string) {
    return localStorage.getItem(key);
  }
}
