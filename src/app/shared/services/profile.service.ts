import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { ModalService } from './modal.service';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private BASE_URL = `${environment.API_HOST}/profile`

  constructor(private httpClient: HttpClient, private modalService: ModalService) {}

  updateProfile(id, body) {
    return this.httpClient.post(`${this.BASE_URL}/${id}`, body)
    .pipe(catchError(this.modalService.showErrorModal));
  }

}
