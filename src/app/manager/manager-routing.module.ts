import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManagerListComponent } from './components/manager-list/manager-list.component';
import { ManagerProfileComponent } from './components/manager-profile/manager-profile.component';
import { ManagerRegisterComponent } from './components/manager-register/manager-register.component';

const routes: Routes = [
  {
    path: '',
    data: { title: 'Manager'}, 
    children: [
      { path: '', component: ManagerListComponent, data: {title: 'Search'} },
      { path: 'register', component: ManagerRegisterComponent, data: {title: 'Register'} },
      { path: ':id', component: ManagerProfileComponent, data: {title: 'Profile'} },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManagerRoutingModule { }
