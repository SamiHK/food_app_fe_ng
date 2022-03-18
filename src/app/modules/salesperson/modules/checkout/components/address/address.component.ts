import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscriber } from 'rxjs';
import { Address, City, Country, State } from 'src/app/models/address';
import { Branch } from 'src/app/models/branch';
import { Cart } from 'src/app/models/cart';
import { Order, OrderStatus } from 'src/app/models/order';
import { OrderService } from 'src/app/modules/salesperson/services/order.service';
import { changeDeliveryAction, changeDeliveryAddressAction, emptyCartAction } from 'src/app/ngrx/cart/actions';
import { AppSettingService } from 'src/app/services/app-setting.service';
import { AddressService } from 'src/app/shared/services/address.service';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss']
})
export class AddressComponent implements OnInit, OnDestroy {

  constructor(
    private addressService: AddressService,
    private orderService: OrderService,
    private settingService: AppSettingService,
    private branchStore: Store<{ 'branch': Branch }>,
    private cartStore: Store<{ 'cart': Cart }>) { }

  branch?: Branch
  cart?: Cart
  isDelivery?: boolean
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
    this.loadCountries()
    this.cartStore.select('cart').subscribe(c => {
      this.cart = c;
      this.isDelivery = this.cart.isDelivery
      this.loadCustomerAddresses()
    })
    this.branchStore.select('branch').subscribe(b => {
      // console.log('branch')
      // console.log(b)
      this.branch = b
      // if(this.)
    })
  }

  loadCustomerAddresses() {
    if (this.cart && this.cart.customer)
      this.addressService.getCustomerAddress(this.cart.customer.id).subscribe(r => {
        this.addresses = r;
        if (this.cart && this.cart.address) {
          this.selectedAddress = this.addresses?.find(a => a.id == this.cart?.address?.id)
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
    // console.log(this.country)
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
    if (this.cart && this.cart.customer && this.cart.customer.id
      && this.selectedCity && this.selectedCity.id) {
      await this.addressService.saveCustomerAddress(this.cart?.customer?.id, {
        addressLine1: this.addressLine1,
        cityId: this.selectedCity.id,
        cityName: this.selectedCity.name,
        stateName: this.selectedState?.name,
        countryName: this.selectedCountry?.name,
        latLng: undefined
      }).subscribe(r => this.addresses = r)

    }
  }

  updateCardDelivery() {
    this.cartStore.dispatch(changeDeliveryAction())
  }

  createOrder() {
    if (this.cart) {
      let order: Order = { ...this.cart, subTotal: this.cart.subTotal, address: this.selectedAddress }
      
      if(order.isDelivery)
        order.status = OrderStatus.ACCEPTED
      else
        order.status = OrderStatus.COMPLETED

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
        }).catch(e => {
          if (this.selectedAddress)
            this.cartStore.dispatch(changeDeliveryAddressAction(this.selectedAddress))
        })
    }

  }
}
