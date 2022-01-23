import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs';
import { Menu, MenuItem } from 'src/app/models/menu';
import { CommonService } from 'src/app/services/common.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  private BASE_URL = `${environment.BASE_URL}/manager/menu`;

  constructor(private http: HttpClient, private commonService: CommonService) {}

  menus(params?: any) {
    return this.http.get<Menu[]>(`${this.BASE_URL}`, {
      params: params
    })
    .pipe(
      catchError(this.commonService.catchError)
    );
  }

  menuItems(menuId: number) {
    return this.http.get<MenuItem[]>(`${this.BASE_URL}/${menuId}/item`)
    .pipe(
      catchError(this.commonService.catchError)
    );
  }

  menuAvailability(body: Menu) {
    return this.http.post(`${this.BASE_URL}/availability`, body)
    .pipe(
      catchError(this.commonService.catchError)
    );
  }

  menuSorting(body: {id: number | null, sortOrder: number}[]) {
    return this.http.post(`${this.BASE_URL}/sorting`, body)
    .pipe(
      catchError(this.commonService.catchError)
    );
  }

  menuItemsSorting(body: {id: number | null, sortOrder: number}[]) {
    return this.http.post(`${this.BASE_URL}/item/sorting`, body)
    .pipe(
      catchError(this.commonService.catchError)
    );
  }

  menuItemAvailability(body: MenuItem) {
    return this.http.post(`${this.BASE_URL}/item/availability`, body)
    .pipe(
      catchError(this.commonService.catchError)
    );
  }

}
