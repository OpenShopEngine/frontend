import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Checkout, CheckoutBase, CheckoutProcess} from './models/checkout';
import {PaymentSystem} from './models/payment_system';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  constructor(protected http: HttpClient) {}

  checkout(paymentSystem: PaymentSystem, checkout: CheckoutBase): Promise<CheckoutProcess> {
    return this.http.post(paymentSystem.provider + 'checkout', checkout)
      .toPromise()
      .then(v => v as CheckoutProcess);
  }

  get(id: number): Promise<Checkout> {
    return this.http.get(`/api/ppu/checkouts/${id}`)
      .toPromise()
      .then(v => v as Checkout);
  }
}
