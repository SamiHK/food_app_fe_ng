import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BranchRoutingModule } from './branch-routing.module';
import { BranchComponent } from './components/branch/branch.component';
import { BranchListComponent } from './components/branch-list/branch-list.component';
import { BranchViewComponent } from './components/branch-view/branch-view.component';
import { AlertModule, ButtonModule, CardModule, FormModule, GridModule, SpinnerModule, TableModule } from '@coreui/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { SharedModule } from 'src/app/shared/shared.module';
import { IconModule } from '@coreui/icons-angular';
import { BranchSalespersonListComponent } from './components/branch-salesperson-list/branch-salesperson-list.component';

const CORE_UI_MODULES = [GridModule,
  CardModule,
  AlertModule,
  FormModule,
  ButtonModule,
  SpinnerModule,
  TableModule,
  IconModule
]

@NgModule({
  declarations: [
    BranchComponent,
    BranchListComponent,
    BranchViewComponent,
    BranchSalespersonListComponent
  ],
  imports: [
    CommonModule,
    BranchRoutingModule,
    SharedModule,
    ...CORE_UI_MODULES,
    ReactiveFormsModule, FormsModule,
    PaginationModule.forRoot()
  ]
})
export class BranchModule { }
