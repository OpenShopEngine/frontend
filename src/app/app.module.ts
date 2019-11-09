import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {ClientSharedModule} from '../../projects/client/src/app/app.module';
import {AdminSharedModule} from '../../projects/admin/src/app/app.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MaterialModule} from '../../projects/client/src/app/material.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ClientSharedModule.forRoot(),
    AdminSharedModule.forRoot(),
    BrowserAnimationsModule,
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
