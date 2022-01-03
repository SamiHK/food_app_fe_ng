import { Injectable, ViewChild } from '@angular/core';
import { AbstractControl, ValidatorFn } from '@angular/forms';
import { ModalComponent, ModalService } from '@coreui/angular';
import { Observable, of, throwError } from 'rxjs';
import { Alert } from '../models/alert';
import { AlertModalComponent } from '../shared/components/alert-modal/alert-modal.component';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private modalService: ModalService) { }

  // hideAlert(a: Alert) {
  //   a.title = ''
  //   a.message = ''
  //   a.type = ''
  //   a.visible = false
  // }

  // showAlert(a: Alert, title: string, message: string, type = 'danger') {
  //   a.title = title
  //   a.message = message
  //   a.type = type
  //   a.visible = true
  // }

  // showErrorAlert(a: Alert, err: {code: string, message: string}) {
  //   this.showAlert(a, err.code, err.message)
  // }

  // showSuccessAlert(a: Alert, message: string) {
  //   this.showAlert(a, 'SUCCESS', message, 'success');
  // }

  private EXEMPTED_ERRORS = ["ER_DUP_ENTRY"]

  catchError = (err: any, obs: Observable<any>) => {
    // console.log(err);
    // this.modalService.modalState$.forEach(v => {
    //   // console.log(v);
    // })
    if (err && err.error
      && err.error.error
      && !this.EXEMPTED_ERRORS.includes(err.error.error.code)) {
      this.modalService.toggle({
        id: 'commonAlertModal',
        show: true
      })
    }
    return throwError(() => err.error.error);
  }

  // checkPassword: ValidatorFn = (control: AbstractControl) => {
  //   let error = control.value['password'] !== control.value['confirmPassword'] ?
  //     {
  //       else: 'Password not match'
  //     } : null;

  //   // (control.parent?.controls?['confirmPassword'] as FormControl).setErrors(error); 
  //   return error;
  // }
}
