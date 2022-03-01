import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddressComponent } from './components/address/address.component';
import { CartComponent } from './components/cart/cart.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { CustomerComponent } from './components/customer/customer.component';
import { PaymentComponent } from './components/payment/payment.component';

const routes: Routes = [
  { path: '', redirectTo: 'cart' },
  {
    path: '', component: CheckoutComponent, children: [
      { path: 'cart', component: CartComponent, },
      { path: 'customer', component: CustomerComponent, },
      { path: 'address', component: AddressComponent, },
      { path: 'payment', component: PaymentComponent, },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CheckoutRoutingModule { }
