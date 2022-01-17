import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SalespersonListComponent } from 'src/app/shared/components/salesperson-list/salesperson-list.component';
import { BranchListComponent } from './components/branch-list/branch-list.component';
import { BranchViewComponent } from './components/branch-view/branch-view.component';
import { BranchComponent } from './components/branch/branch.component';

const routes: Routes = [
  { path: '', component: BranchComponent, children: [
    { path: '', component: BranchListComponent, data: {title: 'Search'}}, 
    { path: 'register', component: BranchViewComponent, data: {title: 'Register New Branch'}}, 
    { path: ':id', component: BranchViewComponent, data: {title: 'Detail'}}, 
    { path: ':branchId/salespersons', component: SalespersonListComponent, data: {title: 'Salesperson'}}, 
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BranchRoutingModule { }
