import { Component, OnInit, ViewChild } from '@angular/core';
import { SidebarComponent } from '@coreui/angular';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthUser } from 'src/app/models/auth-user';
import { logoutAction } from 'src/app/ngrx/auth/actions';
import { Cart } from 'src/app/models/cart';
import { addItemToCartAction, emptyCartAction, reduceItemFromCartAction, removeItemFromCartAction } from 'src/app/ngrx/cart/actions';
import { MenuItem } from 'src/app/models/menu';
import { USER_ROLE } from 'src/app/models/user';
import { Branch } from 'src/app/models/branch';

@Component({
  selector: 'app-web-layout',
  templateUrl: './web-layout.component.html',
  styleUrls: ['./web-layout.component.scss']
})
export class WebLayoutComponent implements OnInit {

  public perfectScrollbarConfig = {
    suppressScrollX: true,
  };

  slides = [
    { title: '', src : 'assets/img/2.jpg' },
    { title: '', src : 'assets/img/3.jpg' },
    { title: '', src : 'assets/img/4.jpg' }
  ]
  user?: AuthUser;
  cart?: Cart;
  totalItemsInCart = 0;
  branch?: Branch;

  @ViewChild('sidebar') sidebar?: SidebarComponent

  constructor(private router: Router,
    private store: Store<{ 'auth': AuthUser }>,
    private cartStore: Store<{ 'cart': Cart }>) {


  }

  ngOnInit(): void {
    this.store.select('auth').forEach(v => {
      // console.log(v);
      if (v == null) {
        this.user = undefined;
        // this.router.navigate(['login']);
      } else {
        this.user = v;
      }
    });
    this.cartStore.select('cart').forEach(c => {
      this.cart = c;
      this.totalItemsInCart = this.cart.items.length;
    })
  }


  addItemToCart(m: MenuItem) {
    if (m && m.id) {
      this.cartStore.dispatch(addItemToCartAction(m));
    }
  }

  removeItemFromCart(m: MenuItem) {
    if (m && m.id) {
      this.cartStore.dispatch(removeItemFromCartAction({ id: m.id }));
    }
  }

  reduceItemInCart(m: MenuItem) {
    if (m && m.id) {
      this.cartStore.dispatch(reduceItemFromCartAction({ id: m.id }));
    }
  }

  emptyCart() {
    this.cartStore.dispatch(emptyCartAction());
  }


  public logout() {
    this.store.dispatch(logoutAction());
    this.router.navigate([''])
  }

  checkout() {
    if (this.user && this.user.role && this.user.role == USER_ROLE.SALES_PERSON) {
      this.router.navigate(['salesperson', 'checkout']);
    } else {
      this.router.navigate(['customer', 'checkout']);
    }
  }

}
