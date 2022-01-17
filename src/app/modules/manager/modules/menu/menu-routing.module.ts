import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuItemListComponent } from './components/menu-item-list/menu-item-list.component';
import { MenuListComponent } from './components/menu-list/menu-list.component';
import { MenuComponent } from './components/menu/menu.component';

const routes: Routes = [
  {
    path: '', component: MenuComponent, children: [
      {
        path: '', component: MenuListComponent, data: { title: 'List' }, children: [
          { path: ':id', component: MenuItemListComponent }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MenuRoutingModule { }
