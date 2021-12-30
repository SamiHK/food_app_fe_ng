import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { ModalService } from './modal.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private BASE_URL = `${environment.API_HOST}/auth`

  constructor(private httpClient: HttpClient, private modalService: ModalService) {}

  updatePassword(id, body) {
    return this.httpClient.post(`${this.BASE_URL}/${id}/password`, body).pipe(catchError(this.modalService.showErrorModal));
  }

  enabled(id, enabled) {
    return this.httpClient.get(`${this.BASE_URL}/${id}/enabled`, {
      params: {
        enabled: enabled
      }
    }).pipe(catchError(this.modalService.showErrorModal));
  }

}
