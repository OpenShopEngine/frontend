import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CartComponent} from './checkout/cart/cart.component';
import {ProductsComponent} from './products/products.component';
import {StatusCheckComponent} from './checkout/status-check/status-check.component';


export const clientRoutes: Routes = [
  { path: '', component: ProductsComponent },
  { path: 'cart', component: CartComponent },
  { path: 'checkout-status', component: StatusCheckComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(clientRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
