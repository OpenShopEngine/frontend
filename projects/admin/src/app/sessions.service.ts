import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Session} from './model/session';
import {LoginResponse} from './model/LoginResponse';
import {IsAdminResponse} from './model/IsAdminResponse';

@Injectable({
  providedIn: 'root'
})
export class SessionsService {

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Promise<LoginResponse<Session>> {
    return this.http.get(`/api/sessions/login?username=${username}&password=${password}`)
      .toPromise()
      .then(d => {
        const data = d as LoginResponse<Session>;
        if (!data.success) {
          throw Error(data.error);
        }
        return data;
      });
  }

  logout(): Promise<LoginResponse<null>> {
    return this.http.get(`/api/sessions/logout`)
      .toPromise()
      .then(d => d as LoginResponse<null>);
  }

  isAuthorized(): Promise<boolean> {
    return this.http.get(`/api/sessions/current`)
      .toPromise()
      .then(data => {
        return (data as Session).user_id !== undefined;
      });
  }

  isAdmin(): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      this.isAuthorized()
        .then(v => {
          if (v) {
            this.http.get(`/api/sessions/is_admin`)
              .toPromise()
              .then(data => {
                resolve((data as IsAdminResponse).admin);
              })
              .catch(error => reject(error));
          }
        })
        .catch(error => reject(error));
    });
  }
}
