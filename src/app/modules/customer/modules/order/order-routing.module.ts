import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrderDetailComponent } from './components/order-detail/order-detail.component';
import { OrderListComponent } from './components/order-list/order-list.component';

const routes: Routes = [
  { path: '', redirectTo: 'PENDING', },
  { path: ':status', component: OrderListComponent, data: { title: 'List' }, },
  { path: 'detail/:id', component: OrderDetailComponent, data: { title: 'Detail' } }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderRoutingModule { }
