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

  private BASE_URL = `${environment.BASE_URL}/menu`;

  constructor(private http: HttpClient, private commonService: CommonService) { }

  getMenus(params?: any) {
    return this.http.get<Menu[]>(`${this.BASE_URL}`, {
      params: params
    })
      .pipe(
        catchError(this.commonService.catchError)
      );
  }

  getMenusAndItems() {
    return this.http.get<Menu[]>(`${this.BASE_URL}/all`)
      .pipe(
        catchError(this.commonService.catchError)
      );
  }

  getMenu(id: number) {
    return this.http.get<Menu>(`${this.BASE_URL}/${id}`)
      .pipe(
        catchError(this.commonService.catchError)
      );
  }

  getMenuItems(menuId: number) {
    return this.http.get<MenuItem[]>(`${this.BASE_URL}/${menuId}/item`)
      .pipe(
        catchError(this.commonService.catchError)
      );
  }

  getMenuItem(menuItemId: number) {
    return this.http.get<MenuItem>(`${this.BASE_URL}/item/${menuItemId}`)
      .pipe(
        catchError(this.commonService.catchError)
      );
  }
}
