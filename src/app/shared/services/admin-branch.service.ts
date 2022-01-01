import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs';
import { Branch } from 'src/app/models/branch';
import { Page } from 'src/app/models/page';
import { CommonService } from 'src/app/services/common.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminBranchService {

  private BASE_URL = `${environment.BASE_URL}/admin/branch`;

  constructor(private http: HttpClient, private commonService: CommonService) {}

  available(params?:any) {
    return this.http.get<Page<Branch>>(`${this.BASE_URL}/available`, {
      params: params
    })
    .pipe(
      catchError(this.commonService.catchError)
    );
  }

  updateManager(branchId: string, body: {managerId: string}) {
    return this.http.post<Page<Branch>>(`${this.BASE_URL}/${branchId}/manager`, body)
    .pipe(
      catchError(this.commonService.catchError)
    );
  }
}