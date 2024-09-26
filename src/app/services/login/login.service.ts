import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { first, map, Observable, of, switchMap } from 'rxjs';
import { API_CONTEXT } from 'src/app/constants';
import { CredentialLogin } from 'src/app/interfaces/login/login.interface';

@Injectable()
export class LoginService {
  constructor(private _http: HttpClient) {}

  private _isAllow(): Observable<CredentialLogin> {
    return this._http.get<CredentialLogin>(`${API_CONTEXT}/login`);
  }

  public goLogin(credentials: CredentialLogin): Observable<boolean> {
    return this._isAllow().pipe(
      first(),
      switchMap((response) => {
        return of(
          response.email === credentials.email &&
            response.password === credentials.password
        );
      })
    );
  }
}
