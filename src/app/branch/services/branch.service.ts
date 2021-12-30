import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { Branch } from '../../models/branch';
import { Manager } from '../../models/manager';
import { Page } from '../../models/page';
import { ModalService } from '../../shared/services/modal.service';

@Injectable({
  providedIn: 'root'
})
export class BranchService {

  private BASE_URL = `${environment.API_HOST}/admin/branch`

  constructor(private httpClient: HttpClient, private modalService: ModalService) {}

  filter(params?) {
    return this.httpClient.get<Page<Branch>>(`${this.BASE_URL}`, {
      params: params
    }).pipe(catchError(this.modalService.showErrorModal));
  }

  available(params?) {
    return this.httpClient.get<Page<Branch>>(`${this.BASE_URL}/available`, {
      params: params
    }).pipe(catchError(this.modalService.showErrorModal));
  }
 
  save(branch) {
    return this.httpClient
    .post<Page<Branch>>(`${this.BASE_URL}`, branch)
    .pipe(catchError(this.modalService.showErrorModal));
  }

  get(id) {
    return this.httpClient
    .get<Branch>(`${this.BASE_URL}/${id}`)
    .pipe(catchError(this.modalService.showErrorModal));
  }

  saveManager(id, managerId) {
    return this.httpClient
    .post<Branch>(`${this.BASE_URL}/${id}/manager`, {
      managerId: managerId
    })
    .pipe(catchError(this.modalService.showErrorModal));
  }
}
