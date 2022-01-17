import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SalespersonRoutingModule } from './salesperson-routing.module';
import { SalespersonComponent } from './components/salesperson/salesperson.component';
import { SalespersonListComponent } from './components/salesperson-list/salesperson-list.component';
import { SalespersonRegisterComponent } from './components/salesperson-register/salesperson-register.component';
import { SalespersonViewComponent } from './components/salesperson-view/salesperson-view.component';
import { HttpClientJsonpModule, HttpClientModule } from '@angular/common/http';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { AlertModule, BadgeModule, ButtonModule, CardModule, FormModule, GridModule, SpinnerModule, TableModule } from '@coreui/angular';
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
  BadgeModule
]

const REQUIRED_MODULES = [
  SharedModule,
  FormsModule, ReactiveFormsModule,
  PaginationModule.forRoot(),
  HttpClientModule, HttpClientJsonpModule
]


@NgModule({
  declarations: [
    SalespersonComponent,
    SalespersonListComponent,
    SalespersonRegisterComponent,
    SalespersonViewComponent
  ],
  imports: [
    CommonModule,
    SalespersonRoutingModule,
    ...CORE_UI_MODULES, ...REQUIRED_MODULES
  ]
})
export class SalespersonModule { }
