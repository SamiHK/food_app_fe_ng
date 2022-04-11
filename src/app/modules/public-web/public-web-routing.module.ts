import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DealsComponent } from '../customer/modules/deals/components/deals/deals.component';
import { MenuItemsComponent } from './components/menu-items/menu-items.component';
import { MenuListComponent } from './components/menu-list/menu-list.component';
import { PromosComponent } from './components/promos/promos.component';

const routes: Routes = [
  { path: 'menu', component: MenuListComponent },
  { path: 'menu/:id', component: MenuItemsComponent, },
  { path: 'deals', component: DealsComponent },
  { path: 'promos', component: PromosComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicWebRoutingModule { }
