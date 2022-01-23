import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerRoutingModule } from './customer-routing.module';
import { DealsComponent } from './modules/deals/components/deals/deals.component';
import { CustomerComponent } from './components/customer/customer.component';


@NgModule({
  declarations: [
    DealsComponent,
    CustomerComponent
  ],
  imports: [
    CommonModule,
    CustomerRoutingModule
  ]
})
export class CustomerModule { }
