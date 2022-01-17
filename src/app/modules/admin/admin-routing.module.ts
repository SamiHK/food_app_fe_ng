import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'manager', loadChildren: () => import('./modules/manager/manager.module').then(m => m.ManagerModule)},
  { path: 'branch', loadChildren: () => import('./modules/branch/branch.module').then(m => m.BranchModule)},
  { path: 'menu', loadChildren: () => import('./modules/menu/menu.module').then(m => m.MenuModule)},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
