import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  constructor(private http: HttpClient) {}

  private objectify(array) {
    return array.reduce((obj, item) => {
      obj[item.property] = item.value;
      return obj;
    }, {})
  }

  get(): Promise<Object> {
    return this.http.get(`/api/configs`)
      .toPromise()
      .then(v => this.objectify(v));
  }
}
