import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AppComponent} from './app.component';
import {LoginComponent} from './login/login.component';
import {ProductsListComponent} from './products-list/products-list.component';
import {ProductsEditComponent} from './products-edit/products-edit.component';
import {CheckoutsListComponent} from './checkouts-list/checkouts-list.component';
import {CheckoutsShowComponent} from './checkouts-show/checkouts-show.component';
import {ConfigListComponent} from './config-list/config-list.component';
import {SettingsComponent} from './settings/settings.component';


export const adminRoutes: Routes = [
  {path: '', component: AppComponent},
  {path: 'products', component: ProductsListComponent},
  {path: 'products/:id', component: ProductsEditComponent},
  {path: 'checkouts', component: CheckoutsListComponent},
  {path: 'checkouts/:id', component: CheckoutsShowComponent},
  {path: 'settings', component: SettingsComponent},
  {path: 'login', component: LoginComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(adminRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
