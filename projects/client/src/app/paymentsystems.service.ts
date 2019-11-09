import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {PaymentSystem} from './models/payment_system';

@Injectable({
  providedIn: 'root'
})

export class PaymentSystemsService {

  constructor(private http: HttpClient) {}

  getSystems(): Promise<PaymentSystem[]> {
    window.dispatchEvent(new Event('loadingBarStart'));
    return this.http.get('/api/payment_systems')
      .toPromise()
      .then(response => {
        window.dispatchEvent(new Event('loadingBarStop'));
        return response as PaymentSystem[];
      });
  }

  getSystem(id: number): Promise<PaymentSystem> {
    window.dispatchEvent(new Event('loadingBarStart'));
    return this.http.get(`/api/payment_systems/${id}`)
      .toPromise()
      .then(response => {
        window.dispatchEvent(new Event('loadingBarStop'));
        return response as PaymentSystem;
      });
  }
}
