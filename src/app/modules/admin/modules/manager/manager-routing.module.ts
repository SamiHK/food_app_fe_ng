import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SalespersonListComponent } from 'src/app/shared/components/salesperson-list/salesperson-list.component';
import { ManagerListComponent } from './components/manager-list/manager-list.component';
import { ManagerRegisterFormComponent } from './components/manager-register-form/manager-register-form.component';
import { ManagerViewComponent } from './components/manager-view/manager-view.component';
import { ManagerComponent } from './components/manager/manager.component';

const routes: Routes = [
  {
    path: '', component: ManagerComponent, data: { title: 'Manager' }, children: [
      { path: '', component: ManagerListComponent, data: { title: 'List' } },
      { path: 'register', component: ManagerRegisterFormComponent, data: { title: 'Register' } },
      { path: ':id', component: ManagerViewComponent, data: { title: 'View' } },
      { path: ':id/:branchId/salespersons', component: SalespersonListComponent, data: { title: 'Salespersons' } },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManagerRoutingModule { }
