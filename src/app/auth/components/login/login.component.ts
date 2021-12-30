import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AuthUser } from '../../../models/auth-user';
import { ErrorResponse } from '../../../models/error-response';
import { adminNavItems, managerNavItems, salespersonNavItems } from '../../../_nav';
import { loginAction } from '../../ngrx/actions';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {


  alerts: {
    type: string,
    title: string,
    message: string
  }[] = [];
  submitting = false;

  form = new FormGroup({
    'username': new FormControl(null, [Validators.required]),
    'password': new FormControl(null, [Validators.required]),
  });

  authUser: Observable<{username: string}>;

  constructor(private activatedRoute: ActivatedRoute, 
    private router: Router,
    private authService: AuthService,
    private store: Store<{auth: {username: string}}>) {
      this.authUser = store.select('auth');
  }
  
  ngOnInit(): void {
    // console.log(this.activatedRoute.snapshot.data);
  }

  async onSubmit(){
    if(this.form.valid){
      this.alerts = [];
      this.submitting = true;
      let response = await this.authService.login(this.form.value).toPromise();
      if(response.error){
        // this.errorResponse = response;
        this.alerts.push({
          type: 'danger',
          title: response.error,
          message: response.message
        });
      } else {
        let authUser : AuthUser = response;
        this.store.dispatch(loginAction(authUser));
        this.router.navigate(['dashboard']);  
        // if(authUser && authUser.role){
        //   switch(authUser.role){
        //     case 'ADMIN':
        //       this.router.navigateByUrl(adminNavItems[0].url as string);  
        //       break;
        //     case 'MANAGER':
        //       this.router.navigateByUrl(managerNavItems[0].url as string);  
        //       break;
        //     case 'SALESPERSON':
        //       this.router.navigateByUrl(salespersonNavItems[0].url as string);  
        //       break;
        //   }
        // }
      }
      this.submitting = false;
    }
  }

  closeAlert(alert){
    this.alerts.filter(a => a != alert);  
  }

}
