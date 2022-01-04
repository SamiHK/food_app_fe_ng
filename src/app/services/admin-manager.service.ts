import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthUser } from '../models/auth-user';
import { Manager } from '../models/manager';
import { Page } from '../models/page';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root'
})
export class AdminManagerService {

  private BASE_URL = `${environment.BASE_URL}/admin/manager`;

  constructor(private http: HttpClient, private commonService: CommonService) {}

  get(id: string) {
    return this.http.get<Manager>(`${this.BASE_URL}/${id}`)
    .pipe(
      catchError(this.commonService.catchError)
    );
  }

  available(params?: any) {
    return this.http.get<Page<Manager>>(`${this.BASE_URL}/available`, {
      params: params
    })
    .pipe(
      catchError(this.commonService.catchError)
    );
  }

  filter(params?: any) {
    return this.http.get<Page<Manager>>(`${this.BASE_URL}`, {
      params: params
    })
    .pipe(
      catchError(this.commonService.catchError)
    );
  }

  register(body: AuthUser) {
    return this.http.post<Manager>(`${this.BASE_URL}`, body)
    .pipe(
      catchError(this.commonService.catchError)    );
  }
}
