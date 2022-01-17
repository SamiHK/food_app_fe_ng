import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuFormComponent } from './components/menu-form/menu-form.component';
import { MenuItemFormComponent } from './components/menu-item-form/menu-item-form.component';
import { MenuItemListComponent } from './components/menu-item-list/menu-item-list.component';
import { MenuListComponent } from './components/menu-list/menu-list.component';
import { MenuComponent } from './components/menu/menu.component';

const routes: Routes = [
  {
    path: '', component: MenuComponent, data: { title: 'Menu' }, children: [
      { path: 'create', component: MenuFormComponent , data: { title: 'Create' }},
      { path: ':id/edit', component: MenuFormComponent , data: { title: 'Edit' }},
      {
        path: '', component: MenuListComponent, data: { title: 'List' }, children: [
          { path: ':id', component: MenuItemListComponent , data: { title: 'Item List' }},
          { path: ':id/create', component: MenuItemFormComponent , data: { title: 'Item Create' }},
          { path: ':id/:menuItemId/edit', component: MenuItemFormComponent , data: { title: 'Item Edit' }},
        ]
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MenuRoutingModule { }
