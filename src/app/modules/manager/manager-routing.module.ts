import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManagerListComponent } from './components/manager-list/manager-list.component';
import { ManagerRegisterComponent } from './components/manager-register/manager-register.component';
import { ManagerViewComponent } from './components/manager-view/manager-view.component';
import { ManagerComponent } from './components/manager/manager.component';

const routes: Routes = [
  {
    path: '', component: ManagerComponent, data: { title: 'Manager' },
    children: [
      { path: '', component: ManagerListComponent, data: { title: 'Search' },},
      { path: 'register', component: ManagerRegisterComponent, data: { title: 'Register New Manager' } },
      { path: ':id', component: ManagerViewComponent, data: { title: 'Profile' } },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManagerRoutingModule { }