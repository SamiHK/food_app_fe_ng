import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { of } from 'rxjs';
import { ErrorModalComponent } from '../components/error-modal/error-modal.component';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor(private modalService: BsModalService) { }


  showErrorModal = (err: HttpErrorResponse, observer) => {
    console.log(err);
    this.modalService.show(ErrorModalComponent, {
      initialState: {
        err: err
      }
    })
    return of(observer);
  }
}
