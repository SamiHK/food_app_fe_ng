import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManagerRoutingModule } from './manager-routing.module';
import { ManagerListComponent } from './components/manager-list/manager-list.component';
import { ManagerViewComponent } from './components/manager-view/manager-view.component';
import { AlertModule, BadgeModule, ButtonModule, CardModule, FormModule, GridModule, SpinnerModule, TableModule } from '@coreui/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { ManagerComponent } from './components/manager/manager.component';
import { ManagerRegisterComponent } from './components/manager-register/manager-register.component';
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
    ManagerListComponent,
    ManagerViewComponent,
    ManagerComponent,
    ManagerRegisterComponent
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
