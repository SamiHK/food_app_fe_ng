import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderRoutingModule } from './order-routing.module';
import { OrderListComponent } from './components/order-list/order-list.component';
import { OrderDetailComponent } from './components/order-detail/order-detail.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { AlertModule, BadgeModule, ButtonModule, CardModule, FormModule, GridModule, NavModule, SidebarModule, SpinnerModule, TableModule, TabsModule, TooltipModule } from '@coreui/angular';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { IconModule } from '@coreui/icons-angular';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';

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
  PaginationModule.forRoot(),
  ModalModule.forRoot()
]


@NgModule({
  declarations: [
    OrderListComponent,
    OrderDetailComponent,
  ],
  imports: [
    CommonModule,
    OrderRoutingModule,
    ...CORE_UI_MODULES, ...NGX_BOOTSTRAP_MODULES,
    FormsModule,
    SharedModule
  ]
})
export class OrderModule { }
