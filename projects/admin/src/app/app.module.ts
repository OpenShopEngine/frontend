import { BrowserModule } from '@angular/platform-browser';
import {ModuleWithProviders, NgModule} from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import {MaterialModule} from '../../../client/src/app/material.module';
import {ReactiveFormsModule} from '@angular/forms';
import { ProductsListComponent } from './products-list/products-list.component';
import { ProductsEditComponent } from './products-edit/products-edit.component';
import { CheckoutsListComponent } from './checkouts-list/checkouts-list.component';
import { CheckoutsShowComponent } from './checkouts-show/checkouts-show.component';
import { ConfigListComponent } from './settings/config-list/config-list.component';
import { SettingsComponent } from './settings/settings.component';
import { LocalesListComponent } from './settings/locales-list/locales-list.component';
import { PaymentSystemsListComponent } from './settings/payment-systems-list/payment-systems-list.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ProductsListComponent,
    ProductsEditComponent,
    CheckoutsListComponent,
    CheckoutsShowComponent,
    ConfigListComponent,
    SettingsComponent,
    LocalesListComponent,
    PaymentSystemsListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

@NgModule({})
export class AdminSharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: AppModule,
      providers: []
    };
  }
}
