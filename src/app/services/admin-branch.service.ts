import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Branch } from '../models/branch';
import { Location } from '../models/loaction';
import { Page } from '../models/page';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root'
})
export class AdminBranchService {

  private BASE_URL = `${environment.BASE_URL}/admin/branch`;

  constructor(private http: HttpClient, private commonService: CommonService) {}

  filter(params?:any) {
    return this.http.get<Page<Branch>>(`${this.BASE_URL}`, {
      params: params
    })
    .pipe(
      catchError(this.commonService.catchError)
    );
  }

  available(params?:any) {
    return this.http.get<Page<Branch>>(`${this.BASE_URL}/available`, {
      params: params
    })
    .pipe(
      catchError(this.commonService.catchError)
    );
  }

  save(body: Branch) {
    return this.http.post<Branch>(`${this.BASE_URL}`, body)
    .pipe(
      catchError(this.commonService.catchError)
    );
  }

  updateLocation(branchId: string, body: Location) {
    return this.http.post<Branch>(`${this.BASE_URL}/${branchId}/location`, body)
    .pipe(
      catchError(this.commonService.catchError)
    );
  }

  updateManager(branchId: string, body: {managerId: string}) {
    return this.http.post<Branch>(`${this.BASE_URL}/${branchId}/manager`, body)
    .pipe(
      catchError(this.commonService.catchError)
    );
  }

  get(id: string) {
    return this.http.get<Branch>(`${this.BASE_URL}/${id}`)
    .pipe(
      catchError(this.commonService.catchError)
    );
  }
}
