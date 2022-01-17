import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManagerRoutingModule } from './manager-routing.module';
import { AlertModule, BadgeModule, ButtonModule, CardModule, FormModule, GridModule, SpinnerModule, TableModule } from '@coreui/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { ManagerComponent } from './components/manager/manager.component';
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

@NgModule({
  declarations: [
    ManagerComponent,
  ],
  imports: [
    CommonModule,
    ManagerRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
      ...CORE_UI_MODULES,
    PaginationModule.forRoot()
  ]
})
export class ManagerModule { }
