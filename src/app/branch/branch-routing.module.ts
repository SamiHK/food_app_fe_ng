import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BranchListComponent } from './components/branch-list/branch-list.component';
import { BranchProfileComponent } from './components/branch-profile/branch-profile.component';
import { BranchSaveComponent } from './components/branch-save/branch-save.component';

const routes: Routes = [
  { path: '', data : { title: 'Branch' } , children: [
    // { path: '', redirectTo: 'list' },
    { path: '', component: BranchListComponent, data : { title: 'Filter' } },
    { path: 'create', component: BranchSaveComponent, data : { title: 'Create' } },
    { path: 'update/:id', component: BranchSaveComponent, data : { title: 'Update' } },
    { path: ':id', component: BranchProfileComponent, data : { title: 'Profile' } },
  ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BranchRoutingModule { }
