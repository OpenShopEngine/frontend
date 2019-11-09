import {BaseProduct} from '../../../../admin/src/app/model/BaseProduct';

export class Product extends BaseProduct {
  id: number;
}

export class CartPosition {
  product: Product;
  quantity: number;
}
