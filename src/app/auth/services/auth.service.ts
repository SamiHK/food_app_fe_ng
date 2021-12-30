import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AuthUser } from '../../models/auth-user';
import { ErrorResponse } from '../../models/error-response';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private BASE_URL = `${environment.API_HOST}/auth`

  constructor(private httpClient: HttpClient) {}

  login(cred) {
    return this.httpClient.post<any>(`${this.BASE_URL}/login`, cred);
  }

  forgotPassword(email) {
    return this.httpClient.post(`${this.BASE_URL}/forgotPassword`, {email: email});
  }
}
