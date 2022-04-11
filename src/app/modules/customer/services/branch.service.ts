import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs';
import { Branch } from 'src/app/models/branch';
import { CommonService } from 'src/app/services/common.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BranchService {

  private BASE_URL = `${environment.API_BASE_URL}/branch`;

  constructor(private http: HttpClient, private commonService: CommonService) { }

  getBranches(params?: any) {
    return this.http.get<Branch[]>(`${this.BASE_URL}`, {
      params: params
    })
      .pipe(
        catchError(this.commonService.catchError)
      );
  }
}
