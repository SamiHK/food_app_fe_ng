import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminMenuFormComponent } from './components/admin-menu-form/admin-menu-form.component';
import { AdminMenuItemFormComponent } from './components/admin-menu-item-form/admin-menu-item-form.component';
import { AdminMenuItemListComponent } from './components/admin-menu-item-list/admin-menu-item-list.component';
import { AdminMenuListComponent } from './components/admin-menu-list/admin-menu-list.component';
import { AdminMenuComponent } from './components/admin-menu/admin-menu.component';

const routes: Routes = [
  {
    path: 'menu', component: AdminMenuComponent, children: [
      {path: '', redirectTo: 'list'},
      { path: 'create', component: AdminMenuFormComponent, data: { title: 'Create New Menu' }, },
      { path: ':id/edit', component: AdminMenuFormComponent, },
      { path: ':id', component: AdminMenuListComponent, children: [
        { path: '', component: AdminMenuItemListComponent },
        { path: 'item/create', component: AdminMenuItemFormComponent},
        { path: 'item/:itemId/edit', component: AdminMenuItemFormComponent},
      ]},
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MenuRoutingModule { }
