import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs';
import { Customer } from 'src/app/models/customer';
import { CommonService } from 'src/app/services/common.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private BASE_URL = `${environment.API_BASE_URL}/salesperson/customer`;

  constructor(private http: HttpClient, private commonService: CommonService) {}

  search(q: string) {
    return this.http.get<Customer[]>(`${this.BASE_URL}/search`, {
      params: {
        q: q
      }
    })
    .pipe(
      catchError(this.commonService.catchError)
    );
  }

  register(c: Customer) {
    return this.http.post<Customer>(`${this.BASE_URL}`, c)
    .pipe(
      catchError(this.commonService.catchError)
    );
  }
}
