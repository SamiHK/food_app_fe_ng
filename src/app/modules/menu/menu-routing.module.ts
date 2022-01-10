import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminMenuListComponent } from './components/admin-menu-list/admin-menu-list.component';
import { AdminMenuViewComponent } from './components/admin-menu-view/admin-menu-view.component';
import { AdminMenuComponent } from './components/admin-menu/admin-menu.component';

const routes: Routes = [
  {
    path: 'admin', component: AdminMenuComponent, data: { title: 'Menu' }, children: [
      { path: '', component: AdminMenuListComponent, data: { title: 'Explore' }, },
      { path: 'register', component: AdminMenuViewComponent, data: { title: 'Register' }, },
      { path: ':id', component: AdminMenuViewComponent, data: { title: 'View' }, }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MenuRoutingModule { }
