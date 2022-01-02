import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthUser } from '../models/auth-user';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root'
})
export class BranchService {

  private BASE_URL = `${environment.BASE_URL}/branch`;

  constructor(private http: HttpClient, private commonService: CommonService) {}

}
