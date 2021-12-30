import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManagerRoutingModule } from './manager-routing.module';
import { ManagerListComponent } from './components/manager-list/manager-list.component';
import { ManagerRegisterComponent } from './components/manager-register/manager-register.component';
import { ManagerProfileComponent } from './components/manager-profile/manager-profile.component';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { TabsModule } from 'ngx-bootstrap/tabs';


@NgModule({
  declarations: [
    ManagerListComponent,
    ManagerRegisterComponent,
    ManagerProfileComponent,
  ],
  imports: [
    CommonModule,
    ManagerRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    CollapseModule.forRoot(),
    PaginationModule.forRoot(),
    TabsModule.forRoot()
  ]
})
export class ManagerModule { }
