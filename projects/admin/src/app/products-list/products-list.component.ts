import { Component, OnInit } from '@angular/core';
import {Product} from '../../../../client/src/app/models/product';
import {AdminProductsService} from '../admin-products.service';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'price', 'available', 'actions'];
  dataSource: Product[] = [];

  constructor(private productsService: AdminProductsService) { }

  ngOnInit() {
    this.productsService.getProducts()
      .then(products => this.dataSource = products);
  }

  remove(product: Product) {
    if (confirm(`Would you like to remove product "${product.name}"?`)) {
      this.productsService.delete(product.id)
        .then(ok => { this.ngOnInit(); });
    }
  }

}
