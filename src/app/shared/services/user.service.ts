import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { ModalService } from '../../shared/services/modal.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private BASE_URL = `${environment.API_HOST}/user`

  constructor(private httpClient: HttpClient, private modalService: ModalService) {}

  updateEmail(id, body) {
    return this.httpClient.post(`${this.BASE_URL}/${id}/email`, body)
    .pipe(catchError(this.modalService.showErrorModal));
  }

  verifyEmail(token) {
    return this.httpClient.get(`${this.BASE_URL}/email/${token}`)
    .pipe(catchError(this.modalService.showErrorModal));
  }

}
