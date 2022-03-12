import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddressComponent } from './components/address/address.component';
import { CartComponent } from './components/cart/cart.component';

const routes: Routes = [
  { path: '', component: CartComponent },
  { path: 'address', component: AddressComponent },
  // { path: 'address', component: CartComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CheckoutRoutingModule { }
