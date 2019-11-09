import {Product} from './product';

export class CheckoutBase {
  // tslint:disable-next-line:variable-name
  user_id: number;

  fullname: string;
  email: string;
  phone: string;
  address: string;
  products: number[];
}

export class Checkout extends CheckoutBase {
  id: number;

  // tslint:disable-next-line:variable-name
  ppu_transaction_id: number;
  // tslint:disable-next-line:variable-name
  payment_system_id: number;

  status: string;
  // tslint:disable-next-line:variable-name
  track_number: string;
  // tslint:disable-next-line:variable-name
  created_at: string;
}

export class CheckoutProcess {
  checkout: Checkout;
  // tslint:disable-next-line:variable-name
  redirect_url: string;
}
