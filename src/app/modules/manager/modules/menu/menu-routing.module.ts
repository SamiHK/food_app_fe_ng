import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuBoardComponent } from './components/menu-board/menu-board.component';
import { MenuItemListComponent } from './components/menu-item-list/menu-item-list.component';
import { MenuListComponent } from './components/menu-list/menu-list.component';
import { MenuComponent } from './components/menu/menu.component';

const routes: Routes = [
  {
    path: '', component: MenuComponent, data: { title: 'Menu' }, children: [
      {
        path: '', component: MenuListComponent, data: { title: 'List' }
      },
      {
        path: ':id', component: MenuBoardComponent, data: { title: 'Items' }, children: [
          { path: '', component: MenuItemListComponent }
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
