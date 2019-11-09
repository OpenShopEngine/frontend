import { Injectable } from '@angular/core';
import {ServerLocalesService} from '../../../client/src/app/server-locales.service';
import {BaseServerLocale} from './model/BaseServerLocale';
import {ServerLocale} from '../../../client/src/app/models/server_locale';

@Injectable({
  providedIn: 'root'
})
export class AdminServerLocalesService extends ServerLocalesService {
  add(locale: BaseServerLocale): Promise<ServerLocale> {
    const formData = new FormData();
    formData.append('title', locale.title);
    formData.append('locale', locale.locale);

    return this.http.post(`/api/locales`, formData)
      .toPromise()
      .then(resp => resp as ServerLocale);
  }

  edit(id: number, changes: BaseServerLocale): Promise<ServerLocale> {
    const formData = new FormData();
    formData.append('title', changes.title);
    formData.append('locale', changes.locale);

    return this.http.patch(`/api/locales/${id}`, formData)
      .toPromise()
      .then(resp => resp as ServerLocale);
  }

  delete(id: number): Promise<null> {
    return this.http.delete(`/api/locales/${id}`)
      .toPromise()
      .then(v => null);
  }
}
