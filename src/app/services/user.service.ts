import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthUser } from '../models/auth-user';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private BASE_URL = `${environment.BASE_URL}/user`;

  constructor(private http: HttpClient, private commonService: CommonService) {}

  updateEmail(id: string, body: {email: string}) {
    return this.http.post<AuthUser>(`${this.BASE_URL}/${id}/email`, body)
    .pipe(
      catchError(this.commonService.catchError)
    );
  }
  
}
