import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CheckoutRoutingModule } from './checkout-routing.module';
import { CartComponent } from './components/cart/cart.component';
import { CustomerComponent } from './components/customer/customer.component';
import { AddressComponent } from './components/address/address.component';
import { PaymentComponent } from './components/payment/payment.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AlertModule, BadgeModule, ButtonModule, CardModule, FormModule, GridModule, NavModule, SidebarModule, SpinnerModule, TableModule, TabsModule, TooltipModule } from '@coreui/angular';
import { IconModule } from '@coreui/icons-angular';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { ModalModule } from 'ngx-bootstrap/modal';
import { CheckoutComponent } from './components/checkout/checkout.component';


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
    CartComponent,
    CustomerComponent,
    AddressComponent,
    PaymentComponent,
    CheckoutComponent
  ],
  imports: [
    CommonModule,
    CheckoutRoutingModule,
    FormsModule, ReactiveFormsModule,
    ... CORE_UI_MODULES, ... NGX_BOOTSTRAP_MODULES
  ]
})
export class CheckoutModule { }
