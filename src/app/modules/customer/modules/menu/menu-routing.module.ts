import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuItemListComponent } from './menu-item-list/menu-item-list.component';
import { MenuListComponent } from './menu-list/menu-list.component';
import { MenuComponent } from './menu/menu.component';

const routes: Routes = [
  {
    path: '', component: MenuComponent, children: [
      { path: '', component: MenuListComponent  }
    ]
  },
  { path: ':id', component: MenuItemListComponent  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MenuRoutingModule { }
