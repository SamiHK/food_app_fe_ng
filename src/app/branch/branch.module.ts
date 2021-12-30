import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BranchRoutingModule } from './branch-routing.module';
import { BranchListComponent } from './components/branch-list/branch-list.component';
import { BranchProfileComponent } from './components/branch-profile/branch-profile.component';
import { BranchSaveComponent } from './components/branch-save/branch-save.component';
import { SharedModule } from '../shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CollapseModule } from 'ngx-bootstrap/collapse';


@NgModule({
  declarations: [
    BranchListComponent,
    BranchProfileComponent,
    BranchSaveComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BranchRoutingModule,
    PaginationModule.forRoot(),
    CollapseModule.forRoot()
  ]
})
export class BranchModule { }
