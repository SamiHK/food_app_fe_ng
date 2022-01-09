import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BranchListComponent } from './components/branch-list/branch-list.component';
import { BranchSalespersonListComponent } from './components/branch-salesperson-list/branch-salesperson-list.component';
import { BranchViewComponent } from './components/branch-view/branch-view.component';
import { BranchComponent } from './components/branch/branch.component';

const routes: Routes = [
  { path: '', component: BranchComponent, children: [
    { path: '', component: BranchListComponent, data: {title: 'Search'}}, 
    { path: 'register', component: BranchViewComponent, data: {title: 'Register New Branch'}}, 
    { path: ':id', component: BranchViewComponent, data: {title: 'Detail'}}, 
    { path: ':id/salespersons', component: BranchSalespersonListComponent, data: {title: 'Salesperson'}}, 
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BranchRoutingModule { }
