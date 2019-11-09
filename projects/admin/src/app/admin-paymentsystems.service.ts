import { Injectable } from '@angular/core';
import {PaymentSystemsService} from '../../../client/src/app/paymentsystems.service';
import {BasePaymentSystem} from './model/BasePaymentSystem';
import {PaymentSystem} from '../../../client/src/app/models/payment_system';

@Injectable({
  providedIn: 'root'
})
export class AdminPaymentSystemsService extends PaymentSystemsService {
  add(paymentSystem: BasePaymentSystem): Promise<PaymentSystem> {
    const formData = new FormData();
    formData.append('name', paymentSystem.name);
    formData.append('provider', paymentSystem.provider);

    return this.http.post(`/api/payment_systems`, formData)
      .toPromise()
      .then(resp => resp as PaymentSystem);
  }

  edit(id: number, changes: BasePaymentSystem): Promise<PaymentSystem> {
    const formData = new FormData();
    formData.append('name', changes.name);
    formData.append('provider', changes.provider);

    return this.http.patch(`/api/payment_systems/${id}`, formData)
      .toPromise()
      .then(resp => resp as PaymentSystem);
  }

  delete(id: number): Promise<null> {
    return this.http.delete(`/api/payment_systems/${id}`)
      .toPromise()
      .then(v => null);
  }
}
