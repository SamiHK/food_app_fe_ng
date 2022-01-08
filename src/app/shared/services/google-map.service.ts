import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, of } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GoogleMapService {

  constructor(private http: HttpClient) {}

  load(){
    return this.http.jsonp<boolean>(`https://maps.googleapis.com/maps/api/js?key=${environment.GOOGLE_MAP_API_KEY}`, 'callback')
        .pipe(
          map(() => true),
          catchError((e, c) => {
            console.log(e);
            return of(false);
          }),
        );
  }
}
