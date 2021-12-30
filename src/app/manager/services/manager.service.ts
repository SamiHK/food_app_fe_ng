import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Manager } from '../../models/manager';
import { Page } from '../../models/page';
import { catchError } from 'rxjs/operators'
import { of } from 'rxjs';
import { ModalService } from '../../shared/services/modal.service';

@Injectable({
  providedIn: 'root'
})
export class ManagerService {

  private BASE_URL = `${environment.API_HOST}/admin/manager`

  constructor(private httpClient: HttpClient, private modalService: ModalService) {}

  get(id) {
    return this.httpClient.get<Manager>(`${this.BASE_URL}/${id}`).pipe(catchError(this.modalService.showErrorModal));
  }

  register(body) {
    return this.httpClient.post<Manager>(`${this.BASE_URL}`, body).pipe(catchError(this.modalService.showErrorModal));
  }

  updateEmail(id, body) {
    return this.httpClient.post<Manager>(`${this.BASE_URL}/${id}/email`, body).pipe(catchError(this.modalService.showErrorModal));
  }

  updatePassword(id, body) {
    return this.httpClient.post<Manager>(`${this.BASE_URL}/${id}/password`, body).pipe(catchError(this.modalService.showErrorModal));
  }

  filter(params?) {
    return this.httpClient.get<Page<Manager>>(`${this.BASE_URL}`, {
      params: params
    }).pipe(catchError(this.modalService.showErrorModal));
  }

  available(params?) {
    return this.httpClient.get<Page<Manager>>(`${this.BASE_URL}/available`, {
      params: params
    }).pipe(catchError(this.modalService.showErrorModal));
  }

}
