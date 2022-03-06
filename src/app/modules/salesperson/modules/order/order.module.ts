import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderRoutingModule } from './order-routing.module';
import { OrderListComponent } from './components/order-list/order-list.component';
import { OrderDetailComponent } from './components/order-detail/order-detail.component';
import { OrderPendingComponent } from './components/order-pending/order-pending.component';
import { OrderAcceptedComponent } from './components/order-accepted/order-accepted.component';
import { OrderInProgressComponent } from './components/order-in-progress/order-in-progress.component';
import { OrderDispatchComponent } from './components/order-dispatch/order-dispatch.component';
import { OrderCanceledComponent } from './components/order-canceled/order-canceled.component';
import { OrderDeliveredComponent } from './components/order-delivered/order-delivered.component';
import { OrderReturnedComponent } from './components/order-returned/order-returned.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { AlertModule, BadgeModule, ButtonModule, CardModule, FormModule, GridModule, NavModule, SidebarModule, SpinnerModule, TableModule, TabsModule, TooltipModule } from '@coreui/angular';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { IconModule } from '@coreui/icons-angular';

const CORE_UI_MODULES = [
  CardModule,
  ButtonModule,
  FormModule,
  GridModule,
  TableModule,
  SpinnerModule,
  AlertModule,
  IconModule,
  BadgeModule,
  PerfectScrollbarModule,
  NavModule, TabsModule,
  SidebarModule,
  TooltipModule,
]

const NGX_BOOTSTRAP_MODULES = [
  ModalModule.forRoot()
]


@NgModule({
  declarations: [
    OrderListComponent,
    OrderDetailComponent,
    OrderPendingComponent,
    OrderAcceptedComponent,
    OrderInProgressComponent,
    OrderDispatchComponent,
    OrderCanceledComponent,
    OrderDeliveredComponent,
    OrderReturnedComponent
  ],
  imports: [
    CommonModule,
    OrderRoutingModule,
    ...CORE_UI_MODULES, ...NGX_BOOTSTRAP_MODULES
  ]
})
export class OrderModule { }
