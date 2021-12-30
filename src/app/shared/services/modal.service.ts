import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { Observable, of, throwError } from 'rxjs';
import { AlertModalComponent } from '../components/alert-modal/alert-modal.component';
import { ErrorModalComponent } from '../components/error-modal/error-modal.component';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor(private modalService: BsModalService) { }


  showAlertModal = (alert: {
    type: string,
    title: string,
    subtitle?: string,
    message: string
  }) => {
    return this.modalService.show(AlertModalComponent, {
      initialState: {
        alert: alert
      }
    })
  }

  showErrorModal = (err: HttpErrorResponse, observer) => {
    // console.error(err);
    if(err 
      && err.error 
      && err.error.error  
      && err.error.error.code 
      && ['ER_DUP_ENTRY', 'ACC_DEACTIVATED'].includes(err.error.error.code) ){
        return throwError(err.error.error);
      // return of([err.error.error]);
      // throw err;
    } else {
      this.modalService.show(ErrorModalComponent, {
        initialState: {
          err: err
        }
      })
      return of(observer);
    }
  }
}
