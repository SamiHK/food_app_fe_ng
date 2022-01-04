import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { Alert } from 'src/app/models/alert';
import { loginAction } from 'src/app/ngrx/auth/actions';
import { AlertService } from 'src/app/shared/services/alert.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form = new FormGroup({
    'username': new FormControl(null, [Validators.required]),
    'password': new FormControl(null, Validators.required),
  })

  constructor(private authService: AuthService, private store: Store<{'auth': AuthGuard}>,
  private alertService: AlertService) { }

  ngOnInit(): void {
  }

  isLoading = false;
  alert = new Alert();

  async onSubmit  (){
    if(this.form.valid){
      this.alertService.hideAlert(this.alert);
      this.isLoading = true;
      this.authService.login(this.form.value)
        .forEach(v => {
          // console.log(v)
          if(v) {  
            this.alertService.showAlert(this.alert, 'LOGGED IN', `Welcome back ${v.fullName}` , 'success');
            this.store.dispatch(loginAction(v));
          }
        })
        .catch(e => {
          console.log(e);
          this.alertService.showErrorAlert(this.alert, e)
        })
        .finally(() => this.isLoading = false);
    }
  }

}
