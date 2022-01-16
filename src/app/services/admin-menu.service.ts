import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Menu, MenuItem } from '../models/menu';
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

  updateSorting(body: {
    id: number | null, sortOrder: number
  }[]) {
    return this.http.post<Menu[]>(`${this.BASE_URL}/sorting`, body)
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

  item(menuItemId: number) {
    return this.http.get<MenuItem>(`${this.BASE_URL}/item/${menuItemId}`)
    .pipe(
      catchError(this.commonService.catchError)
    );
  }

  updateItem(menuItemId: number, body: MenuItem) {
    return this.http.post<MenuItem>(`${this.BASE_URL}/item/${menuItemId}`, body)
    .pipe(
      catchError(this.commonService.catchError)
    );
  }

  updateItemSorting(body: any) {
    return this.http.post<MenuItem>(`${this.BASE_URL}/item/sorting`, body)
    .pipe(
      catchError(this.commonService.catchError)
    );
  }


  items(menuId: number) {
    return this.http.get<MenuItem[]>(`${this.BASE_URL}/${menuId}/item`)
    .pipe(
      catchError(this.commonService.catchError)
    );
  }

  createItem(menuId: number, body: MenuItem) {
    return this.http.post<MenuItem>(`${this.BASE_URL}/${menuId}/item`, body)
    .pipe(
      catchError(this.commonService.catchError)
    );
  }


}
