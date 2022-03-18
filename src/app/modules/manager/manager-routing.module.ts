import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManagerComponent } from './components/manager/manager.component';

const routes: Routes = [
  { path: 'dashboard', data: { title: 'Dashboard'},  loadChildren: () => import('./modules/dashboard/dashboard.module').then(m => m.DashboardModule)},
  {
    path: 'menu', data: { title: 'Menu'},  loadChildren: () => import('./modules/menu/menu.module').then(m => m.MenuModule)
  },
  {
    path: 'salesperson', data: { title: 'Salesperson'},  loadChildren: () => import('./modules/salesperson/salesperson.module').then(m => m.SalespersonModule)
  },
  {
    path: 'order', data: { title: 'Order'},  loadChildren: () => import('./modules/order/order.module').then(m => m.OrderModule)
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
