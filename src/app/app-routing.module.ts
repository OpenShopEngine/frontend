import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {adminRoutes} from '../../projects/admin/src/app/app-routing.module';
import {clientRoutes} from '../../projects/client/src/app/app-routing.module';

const routes: Routes = [
  {path: 'admin', children: adminRoutes},
  {path: '', children: clientRoutes},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
