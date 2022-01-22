import { Injectable } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { Location } from 'src/app/models/loaction';
import { AlertModalComponent } from '../components/alert-modal/alert-modal.component';
import { ConfirmDeleteModalComponent } from '../components/confirm-delete-modal/confirm-delete-modal.component';
import { MapModalComponent } from '../components/map-modal/map-modal.component';

@Injectable({
  providedIn: 'root'
})
export class CommonModalService {

  constructor(private modalService: BsModalService) { }

  showAlertModal<AlertModalComponent>() {
    return this.modalService.show(AlertModalComponent, {
      backdrop: true,
      animated: true,
      ignoreBackdropClick: true,
      class: 'modal-dialog-centered'
    })
  }

  showWConfirmDeleteModalComponent<AlertModalComponent>(is?: {
    title?: string,
    message?: string
  }) {
    let modal =this.modalService.show(ConfirmDeleteModalComponent, {
      backdrop: true,
      animated: true,
      ignoreBackdropClick: true,
      class: 'modal-dialog-centered'
    })

    if(is && modal.content){
      if(is.title) modal.content.title = is.title;
      if(is.message) modal.content.message = is.message;
    }
    return modal;
  }


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
