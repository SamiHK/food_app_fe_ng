import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CheckoutRoutingModule } from './checkout-routing.module';
import { ModalModule } from 'ngx-bootstrap/modal';
import { AlertModule, BadgeModule, ButtonModule, CardModule, FormModule, GridModule, NavModule, SidebarModule, SpinnerModule, TableModule, TooltipModule } from '@coreui/angular';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { IconModule } from '@coreui/icons-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddressComponent } from './components/address/address.component';
import { CartComponent } from './components/cart/cart.component';
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
  NavModule,
  SidebarModule,
  TooltipModule
]

const NGX_BOOTSTRAP_MODULES = [
  ModalModule.forRoot()
]


@NgModule({
  declarations: [
    AddressComponent,
    CartComponent,
    CheckoutComponent
  ],
  imports: [
    CommonModule,
    CheckoutRoutingModule,
    ... CORE_UI_MODULES, ...NGX_BOOTSTRAP_MODULES,
    FormsModule, ReactiveFormsModule
  ]
})
export class CheckoutModule { }
