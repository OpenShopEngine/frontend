import { Injectable } from '@angular/core';
import {CheckoutService} from '../../../client/src/app/checkout.service';
import {Checkout} from '../../../client/src/app/models/checkout';

class AdminCheckoutStatus {
  status: string;
  track_number: string;
}

@Injectable({
  providedIn: 'root'
})
export class AdminCheckoutsService extends CheckoutService {
  all(): Promise<Checkout[]> {
    return this.http.get(`/api/ppu/checkouts`)
      .toPromise()
      .then(v => v as Checkout[]);
  }

  edit(id: number, changes: object): Promise<Checkout> {
    const formData = new FormData();
    const changesOk = (changes as AdminCheckoutStatus);
    formData.append('status', changesOk.status);
    formData.append('track_number', changesOk.track_number);

    return this.http.patch(`/api/ppu/checkouts/${id}`, formData)
      .toPromise()
      .then(resp => resp as Checkout);
  }
}
