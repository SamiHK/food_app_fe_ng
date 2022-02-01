import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { SalespersonComponent } from './components/salesperson/salesperson.component';

const routes: Routes = [{
  path: '', component: SalespersonComponent, children: [
    { path: 'dashboard', data: { title: 'Dashboard'},  loadChildren: () => import('./modules/dashboard/dashboard.module').then(m => m.DashboardModule)},
    { path: 'menu', loadChildren: () => import('./modules/menu/menu.module').then(m => m.MenuModule) },
    { path: 'order', loadChildren: () => import('./modules/order/order.module').then(m => m.OrderModule) },
    { path: 'checkout', component: CheckoutComponent },
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SalespersonRoutingModule { }
