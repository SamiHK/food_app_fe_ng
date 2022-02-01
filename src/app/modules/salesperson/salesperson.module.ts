import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SalespersonRoutingModule } from './salesperson-routing.module';
import { SalespersonComponent } from './components/salesperson/salesperson.component';
import { AlertModule, ButtonModule, CardModule, FormModule, GridModule, SpinnerModule, TableModule } from '@coreui/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { SharedModule } from 'src/app/shared/shared.module';
import { CheckoutComponent } from './components/checkout/checkout.component';


const CORE_UI_MODULES = [
  GridModule, CardModule, ButtonModule, 
  FormModule, SpinnerModule,
  AlertModule, TableModule, 
]
const NGX_BOOTSTRAP_MODULES = [PaginationModule.forRoot()]

@NgModule({
  declarations: [
    SalespersonComponent,
    CheckoutComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    SalespersonRoutingModule,
    ReactiveFormsModule, FormsModule,
    ...CORE_UI_MODULES,
    ...NGX_BOOTSTRAP_MODULES
  ]
})
export class SalespersonModule { }
