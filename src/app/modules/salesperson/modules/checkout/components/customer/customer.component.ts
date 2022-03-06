import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Cart } from 'src/app/models/cart';
import { Customer } from 'src/app/models/customer';
import { CustomerService } from 'src/app/modules/salesperson/services/customer.service';
import { changeCustomerAction, removeCustomerAction } from 'src/app/ngrx/cart/actions';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit {

  isRegisterNewCustomer = false;
  searchQuery: string | null = null;
  registerNewCustomerCellNumber?: string | null;
  selectedCustomer?: Customer;
  selectedCustomerId?: string;
  searchResult?: Customer[];

  registerCustomerForm = new FormGroup({
    'cellNumber': new FormControl(null, Validators.required),
    'firstName': new FormControl(null),
    'lastName': new FormControl(null),
  })

  constructor(private customerService: CustomerService,
    private cartStore: Store<{ 'cart': Cart }>) {
    this.cartStore.select('cart').subscribe(c => {
      if (c && c.customer) {
        this.selectedCustomer = c.customer
      } else {
        this.selectedCustomer = undefined
      }
    })
  }

  ngOnInit(): void { }

  search() {
    if (this.searchQuery) {
      this.isRegisterNewCustomer = false;
      this.customerService.search(this.searchQuery).subscribe(r => {
        this.searchResult = r
        if (!this.searchResult || !this.searchResult.length) {
          this.registerNewCustomerCellNumber = this.searchQuery;
        } else {
          this.registerNewCustomerCellNumber = null;
        }
      })
    } else {
      this.searchResult = undefined
    }
  }

  openCustomerRegisterForm() {
    this.registerCustomerForm.reset()
    this.isRegisterNewCustomer = true;
  }

  closeCustomerRegisterForm() {
    this.isRegisterNewCustomer = false;
    this.registerCustomerForm.reset()
  }

  registerCustomer() {
    if (this.registerCustomerForm.valid) {
      this.isRegisterNewCustomer = false;
      this.customerService.register(this.registerCustomerForm.value).subscribe(r => {
        this.searchResult = []
        this.searchResult?.push(r)
        this.registerCustomerForm.reset()
      })
    } else {

    }
  }

  updateCartCustomer() {
    if (this.selectedCustomerId && this.searchResult && this.searchResult.length) {
      let c = this.searchResult?.find(f => f.id == this.selectedCustomerId);
      if (c)
        this.cartStore.dispatch(changeCustomerAction(c))
    }
  }

  removeCustomer() {
    this.cartStore.dispatch(removeCustomerAction())
  }

}
