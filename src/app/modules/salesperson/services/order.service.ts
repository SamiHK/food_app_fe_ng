import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs';
import { Order } from 'src/app/models/order';
import { CommonService } from 'src/app/services/common.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private BASE_URL = `${environment.BASE_URL}/salesperson/order`;

  constructor(private http: HttpClient, private commonService: CommonService) {}

  create(order: Order) {
    return this.http.post<Order>(`${this.BASE_URL}`, order)
    .pipe(
      catchError(this.commonService.catchError)
    );
  }

  get(status?: string, page: number = 1) {
    return this.http.get<Order[]>(`${this.BASE_URL}/${status}`, {
      params: {
        page: page
      }
    })
    .pipe(
      catchError(this.commonService.catchError)
    );
  }
  
  changeStatus(orderId: number, status: String){
    return this.http.put<any>(`${this.BASE_URL}/status`, {
      orderId: orderId,
      status: status
    })
    .pipe(
      catchError(this.commonService.catchError)
    );

  }

  getById(id: number) {
    return this.http.get<Order>(`${this.BASE_URL}/detail/${id}`)
      .pipe(
        catchError(this.commonService.catchError)
      );
  }

}
