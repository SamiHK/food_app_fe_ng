import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs';
import { MenuItemUnit } from 'src/app/models/menu';
import { CommonService } from 'src/app/services/common.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MenuItemUnitService {

  private BASE_URL = `${environment.BASE_URL}/admin/menuItemUnit`;

  constructor(private http: HttpClient, private commonService: CommonService) {}

  getMenuItemsUnit() {
    return this.http.get<MenuItemUnit[]>(`${this.BASE_URL}`)
    .pipe(
      catchError(this.commonService.catchError)
    );
  }

  saveMenuItemsUnit(unit: MenuItemUnit) {
    return this.http.post<MenuItemUnit>(`${this.BASE_URL}`, unit)
    .pipe(
      catchError(this.commonService.catchError)
    );
  }

  deleteMenuItemsUnit(id: number) {
    return this.http.delete(`${this.BASE_URL}/${id}`)
    .pipe(
      catchError(this.commonService.catchError)
    );
  }

}
