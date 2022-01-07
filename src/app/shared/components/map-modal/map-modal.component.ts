import { AfterViewInit, Component, OnInit } from '@angular/core';
import { MapGeocoder, MapGeocoderResponse, } from '@angular/google-maps';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { TypeaheadMatch } from 'ngx-bootstrap/typeahead';
import { map, Observable, Observer, of, switchMap } from 'rxjs';
import { GeoLocation } from 'src/app/models/location';
import { GoogleMapService } from '../../services/google-map.service';

@Component({
  selector: 'app-map-modal',
  templateUrl: './map-modal.component.html',
  styleUrls: ['./map-modal.component.scss']
})
export class MapModalComponent implements OnInit {

  public geoLocation: GeoLocation = {
    address: null,
    city: {
      state: {
        country: null
      }
    }
  };

  constructor(public modal: BsModalRef<MapModalComponent>,
    private googleMapService: GoogleMapService,
    private geoCoder: MapGeocoder) { }

  apiLoaded = false;
  search?: string;
  results$?: Observable<google.maps.GeocoderResult[]>;

  ngOnInit() {
    this.results$ = new Observable((observer: Observer<string | undefined>) => {
      observer.next(this.search)
    }).pipe(
      switchMap((v: string | undefined) => {
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



    this.googleMapService.load()
      .forEach((v) => {
        this.apiLoaded = v
        navigator.geolocation.getCurrentPosition(e => {
          if (e && e.coords) {
            this.updateMap(e.coords.latitude, e.coords.longitude);
            // this.ge
          }
        });
      })
      .catch(e => {
        this.apiLoaded = e;
      });
  }

  marker?: {
    position?: google.maps.LatLngLiteral,
    options: google.maps.MapOptions
  };
  mapCenter?: any;
  onSelectGeocodeAddress(v?: TypeaheadMatch) {
    // console.log(v);
    if (v) {
      console.log(v.item)
      let latLng = (v.item.geometry.location as google.maps.LatLng).toJSON()
      this.updateMap(latLng.lat, latLng.lng)
      this.updateLocation(v.item)
      // console.log(this.getCity(v.item))
      // console.log(this.getState(v.item))
      // console.log(this.getCountry(v.item))
    }
  }

  updateMap(lat: number, lng: number) {
    this.mapCenter = {
      lat: lat,
      lng: lng
    }
    this.marker = {
      position: {
        lat: lat,
        lng: lng
      },
      options: {}
    }
  }


  mapClick(event: google.maps.MapMouseEvent) {
    // console.log(event.latLng);   
    // this.mapCenter = event.latLng
    this.marker = {
      position: event.latLng?.toJSON(),
      options: {}
    };
    this.geoCoder.geocode({
      location: event.latLng
    }).forEach(v => {
      console.log(v);
      if (v.results) {
        this.search = v.results[0].formatted_address
        // console.log(v.results[0].address_components[0].long_name) 
        this.updateLocation(v.results[0])
      }
    })
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

  updateLocation(l: google.maps.GeocoderResult){
    console.log(this.search);
    console.log(l.formatted_address);
    console.log(this.getCity(l))
    console.log(this.getState(l))
    console.log(this.getCountry(l))
    // this.geoLocation = {
    //   address: l.address_components.
    // }
  }

  save(){
    this.modal.onHide?.emit(this.search)
    // this.modal.hide()
  }

}
