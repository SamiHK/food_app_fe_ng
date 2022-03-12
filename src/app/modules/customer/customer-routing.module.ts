import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DefaultLayoutComponent } from 'src/app/containers';
import { WebLayoutComponent } from 'src/app/containers/web-layout/web-layout.component';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { AddressComponent } from './modules/checkout/components/address/address.component';
import { OrderDoneComponent } from './components/order-done/order-done.component';

const routes: Routes = [
  // { path: '', redirectTo: 'menu' },
  // {
  //   path: '', component: WebLayoutComponent, children: [
  //     // { path: '', redirectTo: 'menu' },
  //     { path: 'deals', loadChildren: () => import('./modules/deals/deals.module').then(m => m.DealsModule) },
  //     { path: 'promos', loadChildren: () => import('./modules/promos/promos.module').then(m => m.PromosModule) },
  //     { path: 'cart', loadChildren: () => import('./modules/cart/cart.module').then(m => m.CartModule) },
  //     { path: 'menu', loadChildren: () => import('./modules/menu/menu.module').then(m => m.MenuModule) },
  //   ]
  // },
  { path: 'orders', loadChildren: () => import('./modules/order/order.module').then(m => m.OrderModule) },
  { path: 'checkout', loadChildren: () => import('./modules/checkout/checkout.module').then(m => m.CheckoutModule) },
  // {
  //   path: '', component: DefaultLayoutComponent, children: [
  //     {
  //       path: 'checkout', component: CheckoutComponent, canActivate: [AuthGuard], children: [
  //         { path: '', redirectTo: 'cart' },
  //         { path: 'cart', component: CartComponent },
  //         { path: 'address', component: AddressComponent },
  //         { path: 'order/:id', component: OrderDoneComponent }
  //       ]
  //     },
  //   ]
  // },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }
