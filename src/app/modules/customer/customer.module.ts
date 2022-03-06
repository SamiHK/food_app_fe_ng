import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerRoutingModule } from './customer-routing.module';
import { DealsComponent } from './modules/deals/components/deals/deals.component';
import { CustomerComponent } from './components/customer/customer.component';
import { StoreModule } from '@ngrx/store';
import { cartReducer } from 'src/app/ngrx/cart/reducers';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { AlertModule, BadgeModule, ButtonModule, CardModule, FooterModule, FormModule, GridModule, HeaderModule, NavModule, SidebarModule, SpinnerModule, TableModule, TooltipModule } from '@coreui/angular';
import { IconModule } from '@coreui/icons-angular';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BranchModalComponent } from './components/branch-modal/branch-modal.component';
import { branchReducer } from 'src/app/ngrx/branch/reducers';
import { FormsModule } from '@angular/forms';
import { CartComponent } from './components/cart/cart.component';
import { AddressComponent } from './components/address/address.component';
import { OrderDoneComponent } from './components/order-done/order-done.component';

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
  NavModule,
  SidebarModule,
  TooltipModule,
  HeaderModule, FooterModule, 
]

const NGX_BOOTSTRAP_MODULES = [
  ModalModule.forRoot()
]

@NgModule({
  declarations: [
    DealsComponent,
    CustomerComponent,
    CheckoutComponent,
    BranchModalComponent,
    CartComponent,
    AddressComponent,
    OrderDoneComponent
  ],
  imports: [
    CommonModule,
    CustomerRoutingModule,
    FormsModule,
    ... CORE_UI_MODULES, ... NGX_BOOTSTRAP_MODULES
  ]
})
export class CustomerModule { }
