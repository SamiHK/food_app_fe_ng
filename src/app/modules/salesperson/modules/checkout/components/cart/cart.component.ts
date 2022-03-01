import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Cart } from 'src/app/models/cart';
import { MenuItem } from 'src/app/models/menu';
import { addItemToCartAction, changeDeliveryAction, reduceItemFromCartAction, removeItemFromCartAction } from 'src/app/ngrx/cart/actions';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  cart = new Cart();

  constructor(private cartStore: Store<{ 'cart': Cart }>) { }

  ngOnInit(): void {
    this.cartStore.select('cart').forEach(c => this.cart = c);
  }


  removeItemFromCart(i: MenuItem) {
    if (i && i.id) {
      this.cartStore.dispatch(removeItemFromCartAction({ id: i.id }))
    }
  }

  reduceItemInCart(i: MenuItem) {
    if (i && i.id) {
      this.cartStore.dispatch(reduceItemFromCartAction({ id: i.id }))
    }
  }

  addItemToCart(i: MenuItem) {
    if (i) {
      this.cartStore.dispatch(addItemToCartAction(i))
    }
  }

  changeDelivery() {
    this.cartStore.dispatch(changeDeliveryAction())
  }

}
