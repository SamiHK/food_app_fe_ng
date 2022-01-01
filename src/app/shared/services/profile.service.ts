import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs';
import { AuthUser } from 'src/app/models/auth-user';
import { CommonService } from 'src/app/services/common.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private BASE_URL = `${environment.BASE_URL}/profile`;

  constructor(private http: HttpClient, private commonService: CommonService) {}

  update(id: string, body: AuthUser) {
    return this.http.post<AuthUser>(`${this.BASE_URL}/${id}`, body)
    .pipe(
      catchError(this.commonService.catchError)
    );
  }
}
