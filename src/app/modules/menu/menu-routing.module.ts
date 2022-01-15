import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminMenuFormComponent } from './components/admin-menu-form/admin-menu-form.component';
import { AdminMenuItemListComponent } from './components/admin-menu-item-list/admin-menu-item-list.component';
import { AdminMenuListComponent } from './components/admin-menu-list/admin-menu-list.component';
import { AdminMenuComponent } from './components/admin-menu/admin-menu.component';

const routes: Routes = [
  {
    path: 'admin', component: AdminMenuComponent, data: { title: 'Menu' }, children: [
      {path: '', redirectTo: 'list'},
      { path: 'create', component: AdminMenuFormComponent, data: { title: 'Create' }, },
      { path: ':id/edit', component: AdminMenuFormComponent, data: { title: 'Edit' }, },
      { path: ':id', component: AdminMenuListComponent, data: { title: 'List' }, children: [
        { path: '', component: AdminMenuItemListComponent,  data: { title: 'List' }},
        // { path: ':id/add', component: AdminMenuViewComponent, data: { title: 'View' }, },
      ]},
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MenuRoutingModule { }
