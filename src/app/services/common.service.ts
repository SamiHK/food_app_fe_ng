import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { BsModalService } from 'ngx-bootstrap/modal';
import { Observable, of, throwError } from 'rxjs';
import { AuthUser } from '../models/auth-user';
import { logoutAction } from '../ngrx/auth/actions';
import { AuthErrorModalComponent } from '../shared/components/auth-error-modal/auth-error-modal.component';
import { HttpErrorModalComponent } from '../views/http-error-modal/http-error-modal.component';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private modalService: BsModalService,
    private router: Router,
    private store: Store<{'auth': AuthUser}>) { }

  private THROW_ERRORS = ["ER_DUP_ENTRY", "INVALID_CREDIENTIIALS", "USER_NOT_FOUND"]
  private AUTH_CODE = [400, 401]

  catchError = (err: any, caught: Observable<any>) => {
    // console.log(err)
    if (err && err.error && err.error.code
      && this.THROW_ERRORS.includes(err.error.code)) {
        return throwError(() => err.error);
    } else if(this.AUTH_CODE.includes(err.status)){
      this.modalService.show(AuthErrorModalComponent, {
        animated: true,
        backdrop: true,
        ignoreBackdropClick: true,
        class: 'modal-dialog-centered'
      }).onHide?.subscribe(e => {
        this.store.dispatch(logoutAction());
        this.router.navigate(['login'])
      })
      return of();
    }  else {
      console.log(err)
      this.modalService.show(HttpErrorModalComponent, {
        animated: true,
        backdrop: true,
        ignoreBackdropClick: true,
        class: 'modal-dialog-centered',
        initialState: {
          er: err
        }
      })
      return of();
    }
  }
}
