import { NgModule } from '@angular/core';

import {ProductCardComponent} from "./card/card.component";
import {MaterialModule} from "../material.module";
import { ProductsComponent } from './products.component';
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";

@NgModule({
  imports: [
    MaterialModule,
    CommonModule,
    RouterModule
  ],
  exports: [
    ProductCardComponent,
    ProductsComponent
  ],
  declarations: [
    ProductCardComponent,
    ProductsComponent
  ]
})
export class ProductsModule { }
