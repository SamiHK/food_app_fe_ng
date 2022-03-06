import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrderAcceptedComponent } from './components/order-accepted/order-accepted.component';
import { OrderCanceledComponent } from './components/order-canceled/order-canceled.component';
import { OrderDeliveredComponent } from './components/order-delivered/order-delivered.component';
import { OrderDetailComponent } from './components/order-detail/order-detail.component';
import { OrderDispatchComponent } from './components/order-dispatch/order-dispatch.component';
import { OrderInProgressComponent } from './components/order-in-progress/order-in-progress.component';
import { OrderListComponent } from './components/order-list/order-list.component';
import { OrderPendingComponent } from './components/order-pending/order-pending.component';
import { OrderReturnedComponent } from './components/order-returned/order-returned.component';

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
