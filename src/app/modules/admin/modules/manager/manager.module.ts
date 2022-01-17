import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManagerRoutingModule } from './manager-routing.module';
import { ManagerComponent } from './components/manager/manager.component';
import { ManagerRegisterFormComponent } from './components/manager-register-form/manager-register-form.component';
import { ManagerViewComponent } from './components/manager-view/manager-view.component';
import { AlertModule, BadgeModule, ButtonModule, CardModule, FormModule, GridModule, SpinnerModule, TableModule } from '@coreui/angular';
import { IconModule } from '@coreui/icons-angular';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { HttpClientJsonpModule, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { ManagerListComponent } from './components/manager-list/manager-list.component';

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
    ManagerComponent,
    ManagerRegisterFormComponent,
    ManagerViewComponent,
    ManagerListComponent
  ],
  imports: [
    CommonModule,
    ManagerRoutingModule,
    ...CORE_UI_MODULES,
    ...REQUIRED_MODULES
  ]
})
export class ManagerModule { }
