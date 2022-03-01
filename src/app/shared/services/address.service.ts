import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs';
import { City, Country, State } from 'src/app/models/address';
import { CommonService } from 'src/app/services/common.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  private BASE_URL = `${environment.BASE_URL}/address`;

  constructor(private http: HttpClient, private commonService: CommonService) { }

  countries() {
    return this.http.get<Country[]>(`${this.BASE_URL}/countries`)
      .pipe(
        catchError(this.commonService.catchError)
      );
  }

  states(countryShortName: string) {
    return this.http.get<State[]>(`${this.BASE_URL}/states`, {
      params: {
        countryShortName: countryShortName
      }
    })
      .pipe(
        catchError(this.commonService.catchError)
      );
  }

  cities(stateId: number, q?: string) {
    let params: {
      stateId: number
      q?: string
    } = {
      stateId: stateId,
    }

    if(q){
      params.q = q
    }

    return this.http.get<City[]>(`${this.BASE_URL}/cities`, {
      params: params
    })
      .pipe(
        catchError(this.commonService.catchError)
      );
  }

}
