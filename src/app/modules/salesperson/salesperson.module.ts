import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SalespersonRoutingModule } from './salesperson-routing.module';
import { SalespersonComponent } from './components/salesperson/salesperson.component';
import { AlertModule, BadgeModule, ButtonModule, CardModule, FormModule, GridModule, NavModule, SpinnerModule, TableModule, TabsModule, TooltipModule } from '@coreui/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { SharedModule } from 'src/app/shared/shared.module';
import { IconModule, IconSetModule } from '@coreui/icons-angular';


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
  NavModule,
  TooltipModule,
  NavModule, TabsModule,
]
const NGX_BOOTSTRAP_MODULES = [PaginationModule.forRoot()]

@NgModule({
  declarations: [
    SalespersonComponent,
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
