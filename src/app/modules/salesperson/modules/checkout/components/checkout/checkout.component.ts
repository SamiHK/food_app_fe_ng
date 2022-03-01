import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Cart } from 'src/app/models/cart';
import { MenuItem } from 'src/app/models/menu';
import { addItemToCartAction, changeDeliveryAction, reduceItemFromCartAction, removeItemFromCartAction } from 'src/app/ngrx/cart/actions';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  cart = new Cart();

  constructor(private cartStore: Store<{ 'cart': Cart }>) { }

  ngOnInit(): void {
    this.cartStore.select('cart').forEach(c => this.cart = c);
  }

}
