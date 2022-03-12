import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Branch } from 'src/app/models/branch';
import { Cart } from 'src/app/models/cart';
import { Menu, MenuItem } from 'src/app/models/menu';
import { MenuService } from 'src/app/modules/customer/modules/menu/services/menu.service';
import { addItemToCartAction } from 'src/app/ngrx/cart/actions';

@Component({
  selector: 'app-menu-items',
  templateUrl: './menu-items.component.html',
  styleUrls: ['./menu-items.component.scss']
})
export class MenuItemsComponent implements OnInit {

  menus: Menu[] = []
  cart: Cart = new Cart();

  // @ViewChildren('menu') cards?: QueryList<CardComponent>;

  public perfectScrollbarConfig = {
    suppressScrollX: true,
  };

  constructor(private mService: MenuService,
    private route: ActivatedRoute,
    private router: Router,
    private cartStore: Store<{ 'cart': Cart }>,
    private branchStore: Store<{ 'branch': Branch }>) {
  }

  selectedMenu = false;
  ngOnInit() {
    this.branchStore.select('branch').forEach(b => this.loadMenuItems(b));
    this.cartStore.select('cart').forEach(n => {
      this.cart = n
      // console.log(this.cart)
      this.updateMenuByCart()
    })
  }

  updateMenuByCart() {
    this.menus.forEach(m => {
      m.items.forEach(i => {
        let ci = this.cart.items.find(ci => ci.id == i.id);
        if (ci) {
          i.quantity = ci.quantity;
        } else {
          i.quantity = 0;
        }
      })
    })
  }
  
  addToCart(m: MenuItem) {
    this.cartStore.dispatch(addItemToCartAction(m))
  }
  
  ngAfterViewChecked(): void {
    // console.log(this.cards)
    if (!this.selectedMenu) {
      let menuId = this.route.snapshot.params['id'];
      if (menuId) {
        let element = document.querySelector(`#menu-${menuId}`);
        if (element) {
          element.scrollIntoView({
            behavior: 'smooth', block: 'center'
          })
          this.selectedMenu = true;
        }
        // console.log(menuId);
      }
    }
  }
  
  isLoading = false;
  async loadMenuItems(b?: Branch) {
    this.isLoading = true;
    let params = {};
    if (b && b.id) {
      params = {
        branchId: b.id
      }
    }
    await this.mService.getMenusAndItems(params).forEach(v => this.menus = v);
    this.isLoading = false;
    this.updateMenuByCart()
  }

}
