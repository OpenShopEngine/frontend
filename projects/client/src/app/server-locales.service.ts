import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ServerLocale} from './models/server_locale';

@Injectable({
  providedIn: 'root'
})
export class ServerLocalesService {
  constructor(private http: HttpClient) {}

  getLocales(): Promise<ServerLocale[]> {
    return this.http.get(`/api/locales`)
      .toPromise()
      .then(response => response as ServerLocale[]);
  }

  setLocale(locale: number): Promise<ServerLocale> {
    return this.http.get(`/api/locales/${locale}`)
      .toPromise()
      .then(response => response as ServerLocale);
  }
}
