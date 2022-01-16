import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root'
})
export class AdminFileService {

  private BASE_URL = `${environment.BASE_URL}/admin/file`;

  constructor(private http: HttpClient, private commonService: CommonService) {}

  upload(body: FileList) {
    return this.http.post(`${this.BASE_URL}`, body)
    .pipe(
      catchError(this.commonService.catchError)
    );
  }

  menu(menuId: number, body: File) {
    const formData = new FormData();
    formData.append('menu', body);
    return this.http.post(`${this.BASE_URL}/menu/${menuId}`, formData)
    .pipe(
      catchError(this.commonService.catchError)
    );
  }

  menuItem(menuItemId: number | string, body: File) {
    const formData = new FormData();
    formData.append('menuItem', body);
    return this.http.post(`${this.BASE_URL}/menu/item/${menuItemId}`, formData)
    .pipe(
      catchError(this.commonService.catchError)
    );
  }
}
