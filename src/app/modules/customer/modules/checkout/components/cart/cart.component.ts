import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Cart } from 'src/app/models/cart';
import { MenuItem } from 'src/app/models/menu';
import { addItemToCartAction, changeDeliveryAction, reduceItemFromCartAction, removeItemFromCartAction } from 'src/app/ngrx/cart/actions';
import { AppSettingService } from 'src/app/services/app-setting.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  cart = new Cart();
  deliveryCharges?: number
  gst?: number
  _total: number = 0
  get total(){
    this._total = 0
    if(this.cart){
      this._total += this.cart.total
    }
    if(this.gst){
      this._total += this.cart.total * (this.gst/100)
    }
    if(this.deliveryCharges){
      this._total += this.deliveryCharges
    }
    return this._total
  }

  constructor(private cartStore: Store<{ 'cart': Cart }>, private appSettingService: AppSettingService) { }

  ngOnInit(): void {
    this.cartStore.select('cart').forEach(c => this.cart = c);
    this.deliveryCharges = this.appSettingService.getDeliveryCharges()
    this.gst = this.appSettingService.getGST()
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
