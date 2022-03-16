import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Address, City, Country, State } from 'src/app/models/address';
import { Branch } from 'src/app/models/branch';
import { Cart } from 'src/app/models/cart';
import { Order, OrderStatus } from 'src/app/models/order';
import { changeDeliveryAddressAction, emptyCartAction } from 'src/app/ngrx/cart/actions';
import { UserService } from 'src/app/services/user.service';
import { AddressService } from 'src/app/shared/services/address.service';
import { AppSettingService } from 'src/app/services/app-setting.service';
import { OrderService } from '../../../../services/order.service';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss']
})
export class AddressComponent implements OnInit {

  constructor(
    private addressService: AddressService,
    private userService: UserService,
    private orderService: OrderService,
    private settingService: AppSettingService,
    private router: Router,
    private branchStore: Store<{ 'branch': Branch }>,
    private cartStore: Store<{ 'cart': Cart }>) { }

  branch?: Branch
  cart?: Cart
  addresses?: Address[]
  selectedAddress?: Address
  addressLine1?: string
  selectedCountry?: Country
  countries?: Country[]
  selectedState?: State
  states?: State[]
  selectedCity?: City
  cities?: City[]

  ngOnInit(): void {
    this.loadAddresses()
    this.loadCountries()
    this.cartStore.select('cart').subscribe(c => {
      this.cart = c;
    })
    this.branchStore.select('branch').subscribe(b => {
      // console.log('branch')
      // console.log(b)
      this.branch = b
      if (this.branch && this.branch.countryId) {
        this.selectedCountry = this.countries?.find(f => f.id == this.branch?.countryId)
        if (this.selectedCountry && this.selectedCountry.shortName) {
          this.loadStates(this.selectedCountry?.shortName)
        }
      }
      // if(this.)
    })
  }

  loadAddresses() {
    this.userService.getAddress().subscribe(r => {
      this.addresses = r;
      if (this.addresses) {
        if (this.cart && this.cart.address) {
          this.selectedAddress = this.addresses?.find(a => a.id == this.cart?.address?.id)
        } else {
          this.selectedAddress = this.addresses[0]
        }
      }
    })
  }

  countryListLoading = false;
  async loadCountries() {
    this.countryListLoading = true;
    await this.addressService.countries().forEach(c => this.countries = c);
    this.countryListLoading = false;
    if (this.branch && this.branch.address && this.branch.address.country && this.branch.address.country.shortName) {
      if (this.countries) {
        this.selectedCountry = this.countries.find(f => f.shortName == this.branch?.address?.country?.shortName);
        if (this.selectedCountry && this.selectedCountry.shortName)
          this.loadStates(this.selectedCountry.shortName)
      }
    }
  }

  onSelectCountry(event: any) {
    if (event && this.selectedCountry && this.selectedCountry.shortName) {
      this.loadStates(this.selectedCountry.shortName)
    }
  }

  onSelectState(event: any) {
    if (event && this.selectedState && this.selectedState.id) {
      this.loadCities(this.selectedState?.id)
    }
  }

  onSelectCity(event: any) {

  }

  stateListLoading = false;
  async loadStates(countryShortName: string) {
    this.stateListLoading = true;
    await this.addressService.states(countryShortName).forEach(c => this.states = c);
    this.stateListLoading = false;
    if (this.branch && this.branch.address && this.branch.address.state && this.branch.address.state.id) {
      this.selectedState = this.states?.find(f => f.id == this.branch?.address?.state?.id);
      if (this.selectedState && this.selectedState.id)
        this.loadCities(this.selectedState.id)
    }
  }

  cityListLoading = false;
  async loadCities(stateId: number, q?: string) {
    this.cityListLoading = true;
    await this.addressService.cities(stateId, q).forEach(c => this.cities = c);
    this.cityListLoading = false;
    if (this.branch && this.branch.address && this.branch.address.city && this.branch.address.city.id) {
      this.selectedCity = this.cities?.find(f => f.id == this.branch?.address?.city?.id);
    }
  }


  ngOnDestroy(): void {

  }

  async save() {
    if (this.selectedCity && this.selectedCity.id) {
      await this.userService.saveAddress({
        addressLine1: this.addressLine1,
        cityId: this.selectedCity.id,
        cityName: this.selectedCity.name,
        stateName: this.selectedState?.name,
        countryName: this.selectedCountry?.name,
        latLng: undefined
      }).subscribe(r => {
        this.addresses = r;
        this.addressLine1 = undefined;
        if (this.addresses) {
          if (!this.selectedAddress) {
            this.selectedAddress = this.addresses[0]
          } else {
            this.selectedAddress = this.addresses?.find(a => a.id == this.selectedAddress?.id)
          }
        }
      })
    }
  }


  createOrder() {
    if (this.cart && this.selectedAddress) {
      let order: Order = { ...this.cart, subTotal: this.cart.subTotal, address: this.selectedAddress }
      // console.log(this.cart)
      // console.log(order)
      order.status = OrderStatus.PENDING
      order.gst = this.settingService.getGST()
      order.deliveryCharges = this.settingService.getDeliveryCharges()

      if(order.total){
        if(order.subTotal && order.gst)
          order.total += (order.subTotal * (order.gst / 100))
        if(order.subTotal && order.deliveryCharges)
          order.total += order.deliveryCharges;
      }

      this.orderService.create(order)
        .forEach(r => {
          this.cartStore.dispatch(emptyCartAction())
          // console.log(r)
          this.router.navigate(['/customer', 'orders', 'detail', r.id])
        }).catch(e => {
          if (this.selectedAddress)
            this.cartStore.dispatch(changeDeliveryAddressAction(this.selectedAddress))
        })
    } else {

    }

  }

}
