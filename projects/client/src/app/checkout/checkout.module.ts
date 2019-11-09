import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CartComponent} from './cart/cart.component';
import {MaterialModule} from "../material.module";
import { ItemComponent } from './cart/item/item.component';
import {RouterModule} from "@angular/router";
import {ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {ContentRestrictorComponent} from '../content-restrictor/content-restrictor.component';
import { StatusCheckComponent } from './status-check/status-check.component';
import { DetailsComponent } from './status-check/details/details.component';

@NgModule({
  declarations: [CartComponent, ItemComponent, ContentRestrictorComponent, StatusCheckComponent, DetailsComponent],
  exports: [CartComponent, StatusCheckComponent],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    ReactiveFormsModule,
    HttpClientModule
  ]
})
export class CheckoutModule { }
