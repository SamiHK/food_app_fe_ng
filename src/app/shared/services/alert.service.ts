import { Injectable } from '@angular/core';
import { Alert } from 'src/app/models/alert';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor() { }

  hideAlert(a: Alert) {
    a.title = ''
    a.message = ''
    a.type = ''
    a.visible = false
  }

  showAlert(a: Alert, title: string, message: string, type = 'danger') {
    a.title = title
    a.message = message
    a.type = type
    a.visible = true
  }

  showErrorAlert(a: Alert, err: {code: string, name: string, message: string}) {
    this.showAlert(a, err.name, err.message)
  }

  showSuccessAlert(a: Alert, message: string) {
    this.showAlert(a, 'SUCCESS', message, 'success');
  }

}
