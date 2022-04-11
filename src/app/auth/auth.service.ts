import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthUser } from '../models/auth-user';
import { User } from '../models/user';
import { CommonService } from '../services/common.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private BASE_URL = `${environment.API_BASE_URL}/auth`;

  constructor(private http: HttpClient, private commonService: CommonService) {}

  login(body: {username: string, password: string}) {
    return this.http.post<AuthUser>(`${this.BASE_URL}/login`, body)
    .pipe(
      catchError(this.commonService.catchError)

    );
  }
  
   register(body: {username: string, password: string, confirmPassword: string}) {
    return this.http.post<AuthUser>(`${this.BASE_URL}/register`, body)
    .pipe(
      catchError(this.commonService.catchError)
    );
  }
  
  forgetPassword(body: {username: string}) {
    return this.http.post<any>(`${this.BASE_URL}/forget/password`, body)
    .pipe(
      catchError(this.commonService.catchError)
    );
  }
  
  resetPassword(token: string, body: {password: string, confirmPassword: string}) {
    return this.http.post<any>(`${this.BASE_URL}/reset/password/${token}`, body)
    .pipe(
      catchError(this.commonService.catchError)
    );
  }

  updatePassword(id: string, body: {password: string, confirmPassword: string}) {
    return this.http.post(`${this.BASE_URL}/${id}/password`, body)
    .pipe(
      catchError(this.commonService.catchError)
    )
  }

  enabled(id: string, params: { enabled: boolean }) {
    return this.http.get<User>(`${this.BASE_URL}/${id}/enabled/`, {
      params: params
    })
    .pipe(
      catchError(this.commonService.catchError)
    );
  }
}
