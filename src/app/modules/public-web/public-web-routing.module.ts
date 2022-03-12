import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuItemsComponent } from './components/menu-items/menu-items.component';
import { MenuListComponent } from './components/menu-list/menu-list.component';

const routes: Routes = [
  {
    path: 'menu', component: MenuListComponent, children: [
    ]
  },
  { path: 'menu/:id', component: MenuItemsComponent, },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicWebRoutingModule { }
