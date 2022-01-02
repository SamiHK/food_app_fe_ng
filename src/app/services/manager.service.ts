import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Manager } from '../models/manager';
import { Page } from '../models/page';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root'
})
export class ManagerService {

  private BASE_URL = `${environment.BASE_URL}/manager`;

  constructor(private http: HttpClient, private commonService: CommonService) {}

  filter(params?: any) {
    return this.http.get<Page<Manager>>(`${this.BASE_URL}`, {
      params: params
    })
    .pipe(
      catchError(this.commonService.catchError)
    );
  }
}
