import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'dashboard', data: { title: 'Dashboard'},  loadChildren: () => import('./modules/dashboard/dashboard.module').then(m => m.DashboardModule)},
  { path: 'manager', data: { title: 'Manager'},  loadChildren: () => import('./modules/manager/manager.module').then(m => m.ManagerModule)},
  { path: 'branch', data: { title: 'Branch'}, loadChildren: () => import('./modules/branch/branch.module').then(m => m.BranchModule)},
  { path: 'menu', data: { title: 'Menu'}, loadChildren: () => import('./modules/menu/menu.module').then(m => m.MenuModule)},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
