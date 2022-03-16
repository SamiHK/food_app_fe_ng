import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddressComponent } from './components/address/address.component';
import { CartComponent } from './components/cart/cart.component';
import { CheckoutComponent } from './components/checkout/checkout.component';

const routes: Routes = [
  {
    path: '', component: CheckoutComponent, data: { title: 'Checkout' }, children: [
      { path: '', redirectTo: 'cart' },
      { path: 'cart', component: CartComponent },
      { path: 'address', component: AddressComponent },
    ]
  },
  // { path: 'address', component: CartComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CheckoutRoutingModule { }
