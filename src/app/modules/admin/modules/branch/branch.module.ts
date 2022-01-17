import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BranchRoutingModule } from './branch-routing.module';
import { BranchComponent } from './components/branch/branch.component';
import { BranchListComponent } from './components/branch-list/branch-list.component';
import { BranchViewComponent } from './components/branch-view/branch-view.component';
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
    BranchComponent,
    BranchListComponent,
    BranchViewComponent
  ],
  imports: [
    CommonModule,
    BranchRoutingModule,
    ...CORE_UI_MODULES, ...REQUIRED_MODULES
  ]
})
export class BranchModule { }
