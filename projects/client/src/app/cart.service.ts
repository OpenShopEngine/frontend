import {Injectable} from '@angular/core';
import {CartPosition, Product} from './models/product';
import {HttpClient} from '@angular/common/http';
import {ProductsService} from './products.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private http: HttpClient, private productsService: ProductsService) { }

  private cartStorage = 'cart';

  private _getCart(): CartPosition[] {
    const d = JSON.parse(localStorage.getItem(this.cartStorage));
    return (d as CartPosition[] || []);
  }

  getCart(): Promise<CartPosition[]> {
    window.dispatchEvent(new Event('loadingBarStart'));
    return new Promise<CartPosition[]>((resolve) => {
      const poses = this._getCart();
      this.productsService.getProductsByIds(poses.map(v => v.product.id.toString(10)))
        .then(r => {
          const nPoses = poses.map(v => {
            v.product = r.find(e => e.id === v.product.id);
            return v;
          });
          resolve(nPoses);
          window.dispatchEvent(new Event('loadingBarStop'));
        });
    });
  }

  getCount(product = undefined): number {
    let all = this._getCart();
    if (product !== undefined) {
      all = all.filter((v) => {
        return v.product.id === parseInt(product.id);
      });
    }

    const prices = all.map(v => v.quantity);
    try {
      return prices.reduce((a, b) => (a + b));
    } catch (e) {
      return 0;
    }
  }

  private _setCart(cart: CartPosition[]) {
    localStorage.setItem(this.cartStorage, JSON.stringify(cart));
  }

  setCart(positions: CartPosition[]): Promise<CartPosition[]> {
    this._setCart(positions);
    return this.getCart();
  }

  addToCart(product: Product) {
    window.dispatchEvent(new Event('loadingBarStart'));
    this.getCart()
      .then(current => {
        console.log(current);
        const productInArray = current.find(v => {
          return v.product.id === product.id;
        });
        console.log(productInArray);
        if (productInArray === undefined) {
          const pos = new CartPosition();
          pos.product = product;
          pos.quantity = 0;
          console.log(pos);
          current.push(pos);
          console.log(current);
        }
        current.map(v => {
          if (v.product.id === product.id) {
            console.log('Added 1!');
            v.quantity += 1;
          }
        });
        this.setCart(current);
        window.dispatchEvent(new Event('loadingBarStop'));
      });
  }

  setQuantity(product: Product, quantity: number) {
    window.dispatchEvent(new Event('loadingBarStart'));
    return new Promise<void>((resolve) => {
      const current = this._getCart();
      const n = current.map(v => {
        if (v.product.id === product.id) {
          v.quantity = quantity;
        }
        return v;
      });
      resolve(this._setCart(n));
      window.dispatchEvent(new Event('loadingBarStop'));
    });
  }

  removeProductFromCart(product: Product) {
    window.dispatchEvent(new Event('loadingBarStart'));
    return new Promise<void>((resolve) => {
      const current = this._getCart();
      const found = current.find(v => {
        return v.product.id === product.id;
      });
      current.splice(current.indexOf(found), 1);
      resolve(this._setCart(current));
      window.dispatchEvent(new Event('loadingBarStop'));
    });
  }

}
