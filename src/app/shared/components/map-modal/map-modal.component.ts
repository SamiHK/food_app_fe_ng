import { AfterViewInit, Component, OnInit } from '@angular/core';
import { MapGeocoder, MapGeocoderResponse, } from '@angular/google-maps';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { TypeaheadMatch } from 'ngx-bootstrap/typeahead';
import { map, Observable, Observer, of, switchMap } from 'rxjs';
import { City, Country, Address, State } from 'src/app/models/address';
import { AddressService } from '../../services/address.service';
import { GoogleMapService } from '../../services/google-map.service';

@Component({
  selector: 'app-map-modal',
  templateUrl: './map-modal.component.html',
  styleUrls: ['./map-modal.component.scss']
})
export class MapModalComponent implements OnInit {

  addressLine1?: string

  country?: Country;
  countryList?: Country[]

  state?: State
  stateList?: State[]

  city?: City
  cityList?: City[]

  formattedAddress = ''
  public address?: Address = {
    formattedAddress: '',
    latLng: { lat: 0, lng: 0 }
  };

  constructor(public bsModalRef: BsModalRef<MapModalComponent>,
    private googleMapService: GoogleMapService,
    private geoCoder: MapGeocoder,
    private addressService: AddressService) { }

  apiLoaded = false;
  search: string | null = null;
  results$?: Observable<google.maps.GeocoderResult[]>;
  // country: string | null = null;
  // countriesResults$?: Observable<google.maps.GeocoderResult[]>;
  // state: string | null = null;
  // statesResults$?: Observable<google.maps.GeocoderResult[]>;

  async ngOnInit() {

    this.addressLine1 = this.address?.addressLine1
    this.loadCountries();

    this.results$ = new Observable((observer: Observer<string | null>) => {
      observer.next(this.search)
    }).pipe(
      switchMap((v: string | null) => {
        if (v) {
          return this.geoCoder.geocode({
            address: v,
          }).pipe(
            map((v: MapGeocoderResponse) => {
              // console.log(v.results)
              return v.results;
            })
          )
        }
        return of([])
      })
    )

    await this.googleMapService.load()
      .forEach((v) => {
        this.apiLoaded = v;
      })
      .catch(e => {
        this.apiLoaded = e;
      });

    if (this.address && this.address.latLng) {
      // this.search = this.geoLocation.address;
      if (this.address.formattedAddress) this.formattedAddress = this.address.formattedAddress
      this.updateMap(this.address.latLng);
      // this.updateAddress(this.geoLocation.latLng)
    } else {
      navigator.geolocation.getCurrentPosition(e => {
        if (e && e.coords) {
          let latLng = { lat: e.coords.latitude, lng: e.coords.longitude };
          this.updateMap(latLng);
          this.updateAddress(latLng)
          // this.ge
        }
      });
    }
  }

  countryListLoading = false;
  async loadCountries() {
    this.countryListLoading = true;
    await this.addressService.countries().forEach(c => this.countryList = c);
    if(this.address && this.address.countryName && this.countryList && this.countryList.length > 0 && !this.country){
      this.country = this.countryList.find(c => c.name == this.address?.countryName)
      if(this.country && this.country.shortName)
        this.loadStates(this.country?.shortName)
    }
    this.countryListLoading = false;
  }

  onSelectCountry(event: any) {
    // console.log(this.country)
    if (event && this.country && this.country.shortName) {
      this.geoCoder.geocode({
        componentRestrictions: {
          country: this.country.name
        }
      }).subscribe(v => {
        if (v && v.results && v.results.length > 0) {
          this.updateMap(v.results[0].geometry.location.toJSON())
        }
      })
      this.loadStates(this.country?.shortName)
    }
  }

  onSelectState(event: any) {
    if (event && this.country && this.country.name && this.state && this.state.id) {
      this.geoCoder.geocode({
        componentRestrictions: {
          administrativeArea: `${this.state.name}, ${this.country.name}`
        }
      }).subscribe(v => {
        if (v && v.results && v.results.length > 0) {
          this.updateMap(v.results[0].geometry.location.toJSON())
        }
      })
      this.loadCities(this.state?.id)
    }
  }

  onSelectCity(event: any) {
    if (event && this.country && this.country.name && this.state && this.state.name && this.city && this.city.name) {
      this.geoCoder.geocode({
        componentRestrictions: {
          administrativeArea: `${this.state.name}, ${this.country.name}`,
          locality: this.city.name
        }
      }).subscribe(v => {
        if (v && v.results && v.results.length > 0) {
          this.updateMap(v.results[0].geometry.location.toJSON())
        }
      })
    }
  }

  stateListLoading = false;
  async loadStates(countryShortName: string) {
    this.stateListLoading = true;
    await this.addressService.states(countryShortName).forEach(c => this.stateList = c);
    this.stateListLoading = false;
    if(this.address && this.address.stateName && this.stateList && this.stateList.length > 0 && !this.state){
      this.state = this.stateList.find(c => c.name == this.address?.stateName)
      if(this.state && this.state.id)
        this.loadCities(this.state.id)
    }
  }

  cityListLoading = false;
  async loadCities(stateId: number, q?: string) {
    this.cityListLoading = true;
    await this.addressService.cities(stateId, q).forEach(c => this.cityList = c);
    this.cityListLoading = false;
    if(this.address && this.address.cityName && this.cityList && this.cityList.length > 0 && !this.city){
      this.city = this.cityList.find(c => c.name == this.address?.cityName)
    }
    
  }

  marker?: {
    position?: google.maps.LatLngLiteral,
    options: google.maps.MapOptions
  };
  mapCenter?: any;
  onSelectGeocodeAddress(v?: TypeaheadMatch) {
    // console.log(v);
    if (v) {
      // console.log(v.item)
      let latLng = (v.item.geometry.location as google.maps.LatLng).toJSON()
      this.updateMap(latLng)
      this.updateGeoLocation(v.item)
      // console.log(this.getCity(v.item))
      // console.log(this.getState(v.item))
      // console.log(this.getCountry(v.item))
    }
  }

  // onSelectCountry(v?: TypeaheadMatch) {
  //   // console.log(v);
  //   if (v) {
  //     // console.log(v.item)
  //     let latLng = (v.item.geometry.location as google.maps.LatLng).toJSON()
  //     this.updateMap(latLng)
  //     this.updateGeoLocation(v.item)
  //     // console.log(this.getCity(v.item))
  //     // console.log(this.getState(v.item))
  //     // console.log(this.getCountry(v.item))
  //   }
  // }

  // onSelectState(v?: TypeaheadMatch) {
  //   if (v) {
  //     let latLng = (v.item.geometry.location as google.maps.LatLng).toJSON()
  //     this.updateMap(latLng)
  //     this.updateGeoLocation(v.item)
  //   }
  // }

  updateMap(latLng?: { lat: number, lng: number }) {
    this.mapCenter = latLng
    this.marker = {
      position: latLng,
      options: {}
    }
  }



  updateAddress(latLng?: { lat: number, lng: number }) {
    if (latLng) {
      this.geoCoder.geocode({
        location: latLng
      }).forEach(v => {
        // console.log(v);
        if (v.results) {
          this.updateGeoLocation(v.results[0])
        }
      })
    }
  }


  mapClick(event: google.maps.MapMouseEvent) {
    // console.log(event.latLng);   
    // this.mapCenter = event.latLng
    this.marker = {
      position: event.latLng?.toJSON(),
      options: {}
    };
    this.updateAddress(event.latLng?.toJSON())
  }

  getAreaBlock(v: google.maps.GeocoderResult): google.maps.GeocoderAddressComponent | undefined {
    // console.log(v)
    return v.address_components.find(v => {
      return v.types.includes("sublocality_level_2")
    })
  }

  getArea(v: google.maps.GeocoderResult): google.maps.GeocoderAddressComponent | undefined {
    // console.log(v)
    return v.address_components.find(v => {
      return v.types.includes("sublocality_level_1")
    })
  }

  getCity(v: google.maps.GeocoderResult): google.maps.GeocoderAddressComponent | undefined {
    // console.log(v)
    let city = v.address_components.find(v => {
      return v.types.includes("locality")
    })
    if (!city) {
      city = v.address_components.find(v => {
        return v.types.includes("administrative_area_level_3")
      })
    }

    return city
  }

  getState(v: google.maps.GeocoderResult): google.maps.GeocoderAddressComponent | undefined {
    // console.log(v)
    return v.address_components.find(v => {
      return v.types.includes('administrative_area_level_1')
    })
  }

  getCountry(v: google.maps.GeocoderResult): google.maps.GeocoderAddressComponent | undefined {
    // console.log(v)
    return v.address_components.find(v => {
      return v.types.includes('country')
    })
  }

  updateGeoLocation(l: google.maps.GeocoderResult) {
    // console.log(this.search);
    // console.log(l.formatted_address);
    console.log(l)
    let areablock = this.getAreaBlock(l);
    // console.log(areablock);
    // let area = this.getArea(l);
    // console.log(area);
    let country = this.getCountry(l);
    // console.log(country)
    // if (country && country.long_name && this.countryList) {
    //   let selectCountry = this.countryList?.find(f => f.name == country?.long_name)
    //   if (selectCountry) {
    //     console.log(selectCountry)
    //     this.country = selectCountry
    //     this.onSelectCountry(this.country)
    //   }
    // }
    
    let state = this.getState(l);
    // console.log(state);
    // if (state && state.long_name && this.stateList) {
    //   let selectstate = this.stateList?.find(f => f.name == state?.long_name)
    //   if (selectstate) {
    //     console.log(selectstate)
    //     this.state = selectstate
    //     this.onSelectState(this.state)
    //   }
    // }

    let city = this.getCity(l);
    // if (city && city.long_name && this.cityList) {
    //   let selectcity = this.cityList?.find(f => f.name == city?.long_name)
    //   if (selectcity) {
    //     console.log(selectcity)
    //     this.city = selectcity
    //   }
    // }
    // console.log(city);

    this.address = {
      formattedAddress: l.address_components
        .filter(ac => !ac.types.includes("plus_code"))
        .map(ac => ac.long_name)
        .join(", "),
      latLng: l.geometry.location.toJSON(),
    }

    this.addressLine1 = l.address_components
      .filter(ac => !(ac.types.includes("plus_code")
        || ac.types.includes("postal_code")
        || ac.types.includes("locality")
        || ac.types.includes("administrative_area_level_3")
        || ac.types.includes("administrative_area_level_2")
        || ac.types.includes("administrative_area_level_1")
        || ac.types.includes("country"))
      )
      .map(ac => ac.long_name)
      .join(", ")
    console.log(this.addressLine1)

    // if (this.location && areablock) {
    //   this.location.areaBlock = areablock?.long_name
    // }

    // if (this.location && area) {
    //   this.location.areaName = area?.long_name
    //   this.location.areaShortName = area?.short_name
    // }

    if (this.address && city) {
      this.address.cityName = city?.long_name
    }

    if (this.address && state) {
      this.address.stateName = state?.long_name
    }

    if (this.address && country) {
      this.address.countryName = country?.long_name,
        this.address.countryShortName = country?.short_name
    }
  }
  
  isSave = false;
  cancel() {
    this.isSave = false
    this.bsModalRef.hide()
  }
  save() {
    this.isSave = true;
    if(this.address)
      this.address.addressLine1 = this.addressLine1
    this.bsModalRef.hide()
  }

}
