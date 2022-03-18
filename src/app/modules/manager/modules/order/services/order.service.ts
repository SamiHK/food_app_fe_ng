import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs';
import { CommonService } from 'src/app/services/common.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private BASE_URL = `${environment.BASE_URL}/manager/order`;

  constructor(private http: HttpClient, private commonService: CommonService) {}

  search(param: any) {
    return this.http.get(`${this.BASE_URL}/search`, {
      params: param
    })
    .pipe(
      catchError(this.commonService.catchError)
    );
  }
}
