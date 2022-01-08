import { AfterViewInit, Component, OnInit } from '@angular/core';
import { MapGeocoder, MapGeocoderResponse, } from '@angular/google-maps';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { TypeaheadMatch } from 'ngx-bootstrap/typeahead';
import { map, Observable, Observer, of, switchMap } from 'rxjs';
import { Location } from 'src/app/models/loaction';
import { GoogleMapService } from '../../services/google-map.service';

@Component({
  selector: 'app-map-modal',
  templateUrl: './map-modal.component.html',
  styleUrls: ['./map-modal.component.scss']
})
export class MapModalComponent implements OnInit {

  formattedAddress = ''
  public location?: Location  = {
    formattedAddress: '',
    latLng: {lat: 0, lng: 0}
  };

  constructor(public bsModalRef: BsModalRef<MapModalComponent>,
    private googleMapService: GoogleMapService,
    private geoCoder: MapGeocoder) { }

  apiLoaded = false;
  // search: string | null = null;
  // results$?: Observable<google.maps.GeocoderResult[]>;

  async ngOnInit() {
    // this.results$ = new Observable((observer: Observer<string | null>) => {
    //   observer.next(this.search)
    // }).pipe(
    //   switchMap((v: string | null) => {
    //     if (v) {
    //       return this.geoCoder.geocode({
    //         address: v,

    //       }).pipe(
    //         map((v: MapGeocoderResponse) => {
    //           // console.log(v.results)
    //           return v.results;
    //         })
    //       )
    //     }
    //     return of([])
    //   })
    // )



    await this.googleMapService.load()
      .forEach((v) => {
        this.apiLoaded = v;
      })
      .catch(e => {
        this.apiLoaded = e;
      });

    if (this.location && this.location.latLng) {
      // this.search = this.geoLocation.address;
      if(this.location.formattedAddress) this.formattedAddress = this.location.formattedAddress
      this.updateMap(this.location.latLng);
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

  marker?: {
    position?: google.maps.LatLngLiteral,
    options: google.maps.MapOptions
  };
  mapCenter?: any;
  // onSelectGeocodeAddress(v?: TypeaheadMatch) {
  //   // console.log(v);
  //   if (v) {
  //     // console.log(v.item)
  //     let latLng = (v.item.geometry.location as google.maps.LatLng).toJSON()
  //     this.updateMap(latLng.lat, latLng.lng)
  //     this.updateLocation(v.item)
  //     // console.log(this.getCity(v.item))
  //     // console.log(this.getState(v.item))
  //     // console.log(this.getCountry(v.item))
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

  getCity(v: google.maps.GeocoderResult): google.maps.GeocoderAddressComponent | undefined {
    console.log(v)
    return v.address_components.find(v => {
      return v.types.includes("locality")
    })
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
    let city = this.getCity(l);
    // console.log(city);
    let state = this.getState(l);
    // console.log(state);
    let country = this.getCountry(l);
    // console.log(country)
    this.location = {
      formattedAddress: l.address_components
        .filter(ac => !ac.types.includes("plus_code"))
        .map(ac => ac.long_name)
        .join(", "),
      latLng: l.geometry.location.toJSON(),
    }
    
    if(this.location && city) {
      this.location.cityName = city?.long_name
    }
    
    if(this.location && state) {
      this.location.stateName = state?.long_name
    }

    if (this.location && country) {
      this.location.countryName = country?.long_name,
      this.location.countryShortName = country?.short_name
    }
  }

  save() {
    // this.modal.onHide?.emit(this.geoLocation)
    // this.bsModalRef.onHidden?.emit('saved')
    this.bsModalRef.hide()
  }

}
