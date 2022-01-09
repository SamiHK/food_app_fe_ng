import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthUser } from '../models/auth-user';
import { Page } from '../models/page';
import { SalesPerson } from '../models/sales-person';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root'
})
export class ManagerSalespersonService {

  private BASE_URL = `${environment.BASE_URL}/manager/salesperson`;

  constructor(private http: HttpClient, private commonService: CommonService) {}

  get(id: string) {
    return this.http.get<SalesPerson>(`${this.BASE_URL}/${id}`)
    .pipe(
      catchError(this.commonService.catchError)
    );
  }

  available(params?: any) {
    return this.http.get<Page<SalesPerson>>(`${this.BASE_URL}/available`, {
      params: params
    })
    .pipe(
      catchError(this.commonService.catchError)
    );
  }

  filter(params?: any) {
    return this.http.get<Page<SalesPerson>>(`${this.BASE_URL}`, {
      params: params
    })
    .pipe(
      catchError(this.commonService.catchError)
    );
  }

  register(body: AuthUser) {
    return this.http.post<SalesPerson>(`${this.BASE_URL}`, body)
    .pipe(
      catchError(this.commonService.catchError)    );
  }
}
