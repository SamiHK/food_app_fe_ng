import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs';
import { Menu, MenuItem, MenuItemUnit } from 'src/app/models/menu';
import { CommonService } from 'src/app/services/common.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  private BASE_URL = `${environment.API_BASE_URL}/admin/menu`;

  constructor(private http: HttpClient, private commonService: CommonService) {}

  getMenus(params?:any) {
    return this.http.get<Menu[]>(`${this.BASE_URL}`, {
      params: params
    })
    .pipe(
      catchError(this.commonService.catchError)
    );
  }

  createMenu(body: Menu) {
    return this.http.post<Menu>(`${this.BASE_URL}`, body)
    .pipe(
      catchError(this.commonService.catchError)
    );
  }

  updateMenu(body: Menu, id: number) {
    return this.http.post<Menu>(`${this.BASE_URL}/${id}`, body)
    .pipe(
      catchError(this.commonService.catchError)
    );
  }

  updateMenuSorting(body: {
    id: number | null, sortOrder: number
  }[]) {
    return this.http.post<Menu[]>(`${this.BASE_URL}/sorting`, body)
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

  getMenuItem(menuItemId: number) {
    return this.http.get<MenuItem>(`${this.BASE_URL}/item/${menuItemId}`)
    .pipe(
      catchError(this.commonService.catchError)
    );
  }

  updateMenuItem(menuItemId: number, body: MenuItem) {
    return this.http.post<MenuItem>(`${this.BASE_URL}/item/${menuItemId}`, body)
    .pipe(
      catchError(this.commonService.catchError)
    );
  }

  updateMenuItemsSorting(body: any) {
    return this.http.post<MenuItem>(`${this.BASE_URL}/item/sorting`, body)
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

  createMenuItem(menuId: number, body: MenuItem) {
    return this.http.post<MenuItem>(`${this.BASE_URL}/${menuId}/item`, body)
    .pipe(
      catchError(this.commonService.catchError)
    );
  }

  changeMenuIsActive(menuId: number, body: { isActive : boolean}) {
    return this.http.post(`${this.BASE_URL}/${menuId}/isActive`, body)
    .pipe(
      catchError(this.commonService.catchError)
    );
  }

}
