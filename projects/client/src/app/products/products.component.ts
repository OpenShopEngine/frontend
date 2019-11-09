import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ProductsService} from '../products.service';
import {Product} from '../models/product';
import {ServerLocalesService} from '../server-locales.service';
import {ConfigService} from '../config.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  products: Product[];
  config;
  constructor(private http: HttpClient, private productsService: ProductsService, private configService: ConfigService) {
    this.configService.get()
      .then(r => {
        this.config = r;
      });
  }
  ngOnInit() {
    this.productsService.getProducts()
      .then(res => this.products = res);
  }

}
