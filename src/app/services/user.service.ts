import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Address } from '../models/address';
import { AuthUser } from '../models/auth-user';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private BASE_URL = `${environment.API_BASE_URL}/user`;

  constructor(private http: HttpClient, private commonService: CommonService) {}

  updateEmail(id: string, body: {email: string}) {
    return this.http.post<AuthUser>(`${this.BASE_URL}/${id}/email`, body)
    .pipe(
      catchError(this.commonService.catchError)
    );
  }

  getAddress() {
    return this.http.get<Address[]>(`${this.BASE_URL}/addresses`)
      .pipe(
        catchError(this.commonService.catchError))
  }

  saveAddress(address: Address) {
    return this.http.post<Address>(`${this.BASE_URL}/addresses`, address)
      .pipe(
        catchError(this.commonService.catchError))
  }


  
}
