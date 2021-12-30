import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { AuthUser } from '../../models/auth-user';
import { ErrorResponse } from '../../models/error-response';
import { ModalService } from '../../shared/services/modal.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private BASE_URL = `${environment.API_HOST}/auth`

  constructor(private httpClient: HttpClient, private modalService: ModalService) {}

  login(cred) {
    return this.httpClient.post<any>(`${this.BASE_URL}/login`, cred)
    .pipe(catchError(this.modalService.showErrorModal));
  }

  forgotPassword(email) {
    return this.httpClient.post(`${this.BASE_URL}/forget/password`, {email: email})
    .pipe(catchError(this.modalService.showErrorModal));
  }

  resetPassword(token, body) {
    return this.httpClient.post(`${this.BASE_URL}/reset/password/${token}`, body)
    .pipe(catchError(this.modalService.showErrorModal));
  }

}
