import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuBoardComponent } from './components/menu-board/menu-board.component';
import { MenuItemListComponent } from './components/menu-item-list/menu-item-list.component';
import { MenuListComponent } from './components/menu-list/menu-list.component';

const routes: Routes = [
  { path: '', data: { title: 'Menu' }, component: MenuListComponent },
  {
    path: ':id', component: MenuBoardComponent, children: [
      { path: '', component: MenuItemListComponent }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MenuRoutingModule { }
