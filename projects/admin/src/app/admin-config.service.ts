import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BaseConfig, Config} from './model/Config';

@Injectable({
  providedIn: 'root'
})
export class AdminConfigService {
  constructor(private http: HttpClient) {}

  get(): Promise<Config[]> {
    return this.http.get(`/api/configs`)
      .toPromise()
      .then(resp => resp as Config[]);
  }

  add(config: BaseConfig): Promise<Config> {
    const formData = new FormData();
    formData.append('property', config.property);
    formData.append('value', config.value);

    return this.http.post(`/api/configs`, formData)
      .toPromise()
      .then(resp => resp as Config);
  }

  edit(id: number, changes: BaseConfig): Promise<Config> {
    const formData = new FormData();
    formData.append('property', changes.property);
    formData.append('value', changes.value);

    return this.http.patch(`/api/configs/${id}`, formData)
      .toPromise()
      .then(resp => resp as Config);
  }

  delete(id: number): Promise<null> {
    return this.http.delete(`/api/configs/${id}`)
      .toPromise()
      .then(v => null);
  }
}
