import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManagerComponent } from './components/manager/manager.component';

const routes: Routes = [
  {
    path: 'menu', loadChildren: () => import('./modules/menu/menu.module').then(m => m.MenuModule)
  },
  {
    path: 'salesperson', loadChildren: () => import('./modules/salesperson/salesperson.module').then(m => m.SalespersonModule)
  },
  {
    path: '', component: ManagerComponent,
    children: []
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManagerRoutingModule { }
