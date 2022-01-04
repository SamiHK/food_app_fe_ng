import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { map, Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // console.log(request.api)
    return next.handle(request.clone({
      setHeaders: {
        authorization: this.getToken()
      }
    }));
  }

  private getToken() : string {
    let user = localStorage.getItem('auth');
    if(user){
      return `Bearer ${JSON.parse(user).token}`
    }
    return ''
  }
}

