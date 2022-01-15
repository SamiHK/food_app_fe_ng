import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Menu } from '../models/menu';
import { Page } from '../models/page';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root'
})
export class AdminMenuService {

  private BASE_URL = `${environment.BASE_URL}/admin/menu`;

  constructor(private http: HttpClient, private commonService: CommonService) {}

  filter(params?:any) {
    return this.http.get<Menu[]>(`${this.BASE_URL}`, {
      params: params
    })
    .pipe(
      catchError(this.commonService.catchError)
    );
  }

  create(body: Menu) {
    return this.http.post<Menu>(`${this.BASE_URL}`, body)
    .pipe(
      catchError(this.commonService.catchError)
    );
  }

  update(body: Menu, id: number) {
    return this.http.post<Menu>(`${this.BASE_URL}/${id}`, body)
    .pipe(
      catchError(this.commonService.catchError)
    );
  }

  get(id: number) {
    return this.http.get<Menu>(`${this.BASE_URL}/${id}`)
    .pipe(
      catchError(this.commonService.catchError)
    );
  }

}
