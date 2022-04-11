import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthUser } from '../models/auth-user';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private BASE_URL = `${environment.API_BASE_URL}/profile`;

  constructor(private http: HttpClient, private commonService: CommonService) {}

  update(id: string, body: AuthUser) {
    return this.http.post<AuthUser>(`${this.BASE_URL}/${id}`, body)
    .pipe(
      catchError(this.commonService.catchError)
    );
  }
}
