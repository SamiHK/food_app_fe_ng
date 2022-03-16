import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Cart } from 'src/app/models/cart';
import { MenuItem } from 'src/app/models/menu';
import { addItemToCartAction, changeDeliveryAction, reduceItemFromCartAction, removeItemFromCartAction } from 'src/app/ngrx/cart/actions';
import { AppSettingService } from 'src/app/services/app-setting.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  cart = new Cart();
  gst?: number;
  deliveryCharges?: number
  total: number = 0
  constructor(private cartStore: Store<{ 'cart': Cart }>,
    private appSetting: AppSettingService) { }
  ngOnInit(): void {
    this.gst = this.appSetting.getGST();
    this.deliveryCharges = this.appSetting.getDeliveryCharges()
    this.cartStore.select('cart').forEach(c => {
      this.cart = c;
      if (this.cart) {
        if (this.cart.subTotal) {
          this.total = this.cart.subTotal;
          if (this.gst) {
            this.total += (this.total * (this.gst / 100))
          }
          if(this.deliveryCharges){
            this.total += this.deliveryCharges;
          }
        }
      }
    });
  }


}
