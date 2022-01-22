import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuBoardComponent } from './components/menu-board/menu-board.component';
import { MenuFormComponent } from './components/menu-form/menu-form.component';
import { MenuItemFormComponent } from './components/menu-item-form/menu-item-form.component';
import { MenuItemListComponent } from './components/menu-item-list/menu-item-list.component';
import { MenuItemUnitListComponent } from './components/menu-item-unit-list/menu-item-unit-list.component';
import { MenuListComponent } from './components/menu-list/menu-list.component';
import { MenuComponent } from './components/menu/menu.component';

const routes: Routes = [
  {
    path: '', component: MenuComponent, data: { title: 'Menu' }, children: [
      { path: '', component: MenuListComponent, data: { title: 'List' } },
      { path: 'menuItemUnits/:id', component: MenuItemUnitListComponent, data: { title: 'Menu Item Units' } },
      { path: 'create', component: MenuFormComponent, data: { title: 'Create' } },
      { path: ':id/edit', component: MenuFormComponent, data: { title: 'Edit' } },
      { path: ':id', component: MenuBoardComponent, data: { title: 'Item List' }, children: [
        { path: '', component: MenuItemListComponent, },
        { path: 'item/create', component: MenuItemFormComponent, data: { title: 'Item Create' } },
        { path: 'item/:menuItemId/edit', component: MenuItemFormComponent, data: { title: 'Item Edit' } },
      ] },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MenuRoutingModule { }
