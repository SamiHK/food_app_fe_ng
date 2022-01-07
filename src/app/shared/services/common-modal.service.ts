import { Injectable } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { GeoLocation } from 'src/app/models/location';
import { MapModalComponent } from '../components/map-modal/map-modal.component';

@Injectable({
  providedIn: 'root'
})
export class CommonModalService {

  constructor(private modalService: BsModalService) { }


  showMapModal(location?: GeoLocation){
    return this.modalService.show(MapModalComponent, {
      backdrop: true,
      animated: true,
      ignoreBackdropClick: true,
      class: 'modal-lg modal-dialog-centered',
      initialState: {
        geoLocation: location
      }
    })
  }
}
