import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WebLayoutComponent } from 'src/app/containers/web-layout/web-layout.component';
import { CheckoutComponent } from './components/checkout/checkout.component';

const routes: Routes = [
  // { path: '', redirectTo: 'menu' },
  {
    path: '', component: WebLayoutComponent, children: [
      // { path: '', redirectTo: 'menu' },
      { path: 'deals', loadChildren: () => import('./modules/deals/deals.module').then(m => m.DealsModule) },
      { path: 'promos', loadChildren: () => import('./modules/promos/promos.module').then(m => m.PromosModule) },
      { path: 'cart', loadChildren: () => import('./modules/cart/cart.module').then(m => m.CartModule) },
      { path: 'menu', loadChildren: () => import('./modules/menu/menu.module').then(m => m.MenuModule) },
    ]
  },
  { path: 'checkout', component: CheckoutComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }
