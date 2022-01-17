import { Injectable } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { Location } from 'src/app/models/loaction';
import { MapModalComponent } from '../components/map-modal/map-modal.component';

@Injectable({
  providedIn: 'root'
})
export class CommonModalService {

  constructor(private modalService: BsModalService) { }


  showMapModal<MapModalComponent>(location?: Location){
    return this.modalService.show(MapModalComponent, {
      backdrop: true,
      animated: true,
      ignoreBackdropClick: true,
      class: 'modal-lg modal-dialog-centered',
      initialState: {
        location: location
      }
    })
  }
}
