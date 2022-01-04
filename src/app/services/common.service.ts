import { Injectable } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { Observable, of, throwError } from 'rxjs';
import { HttpErrorModalComponent } from '../views/http-error-modal/http-error-modal.component';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private modalService: BsModalService) { }

  private THROW_ERRORS = ["ER_DUP_ENTRY", "INVALID_CREDIENTIIALS", "USER_NOT_FOUND"]

  catchError = (err: any, caught: Observable<any>) => {
    // console.log(err)
    if (err && err.error && err.error.code
      && this.THROW_ERRORS.includes(err.error.code)) {
        return throwError(() => err.error);
    } else {
      console.log(err)
      this.modalService.show(HttpErrorModalComponent, {
        animated: true,
        backdrop: true,
        class: 'modal-dialog-centered',
        initialState: {
          er: err
        }
      })
      return of();
    }
  }
}
