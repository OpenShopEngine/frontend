import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Product} from './models/product';
import {forkJoin, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(protected http: HttpClient) {}

  private _getProducts(): Observable<object> {
    return this.http.get('/api/products');
  }

  private _getProduct(id: string): Observable<object> {
    return this.http.get(`/api/products/${id}`);
  }

  getProducts(): Promise<Product[]> {
    window.dispatchEvent(new Event('loadingBarStart'));
    return this._getProducts()
      .toPromise()
      .then(response => {
        window.dispatchEvent(new Event('loadingBarStop'));
        return response as Product[]
      })
  }

  getProduct(id: string): Promise<Product> {
    window.dispatchEvent(new Event('loadingBarStart'));
    return this._getProduct(id)
      .toPromise()
      .then(response => {
        window.dispatchEvent(new Event('loadingBarStop'));
        return response as Product;
      })
  }

  getProductsByIds(ids: string[]): Promise<Product[]> {
    window.dispatchEvent(new Event('loadingBarStart'));
    return forkJoin(ids.map(id => this._getProduct(id)))
      .toPromise()
      .then(response => {
        window.dispatchEvent(new Event('loadingBarStop'));
        return (response as Product[]);
      })
  }
}
