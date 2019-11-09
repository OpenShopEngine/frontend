import { Injectable } from '@angular/core';
import {ProductsService} from '../../../client/src/app/products.service';
import {Product} from '../../../client/src/app/models/product';
import {FormGroup} from '@angular/forms';
import {BaseProduct} from './model/BaseProduct';

@Injectable({
  providedIn: 'root'
})
export class AdminProductsService extends ProductsService {
  add(product: BaseProduct, file: File): Promise<Product> {
    const formData = new FormData();
    formData.append('name', product.name);
    formData.append('description', product.description);
    formData.append('price', product.price);
    formData.append('available', product.available);
    formData.append('photo', file);

    return this.http.post(`/api/products`, formData)
      .toPromise()
      .then(resp => resp as Product);
  }

  edit(id: number, changes: BaseProduct, file: File): Promise<Product> {
    const formData = new FormData();
    formData.append('name', changes.name);
    formData.append('description', changes.description);
    formData.append('price', changes.price);
    formData.append('available', changes.available);
    if (file !== undefined) {
      formData.append('photo', file);
    }

    return this.http.patch(`/api/products/${id}`, formData)
      .toPromise()
      .then(resp => resp as Product);
  }

  delete(id: number): Promise<null> {
    return this.http.delete(`/api/products/${id}`)
      .toPromise()
      .then(v => null);
  }
}
