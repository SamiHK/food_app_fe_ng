import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Alert } from 'src/app/models/alert';
import { checkPassword } from 'src/app/shared/form-input-validatorsFn';
import { AlertService } from 'src/app/shared/services/alert.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  form = new FormGroup({
    'email': new FormControl(null, [Validators.required, Validators.email]),
    'password': new FormControl(null, [Validators.required, Validators.minLength(6), Validators.maxLength(12)]),
    'confirmPassword': new FormControl(null),
  },)

  constructor(private authService: AuthService,
  private alertService: AlertService) {
    this.form.addValidators(checkPassword)
  }

  ngOnInit(): void {
  }

  isLoading = false;
  alert = new Alert();

  async onSubmit  (){
    if(this.form.valid){
      this.alertService.hideAlert(this.alert);
      this.isLoading = true;
      this.authService.register(this.form.value)
        .forEach(v => {
          console.log(v)
          if(v && v.error){
            this.alertService.showAlert(this.alert, v.error.name, v.error.message);
          } else if(v) {  
            this.alertService.showAlert(this.alert, 'LOGGED IN', `Welcome back ${v.fullName}` , 'success');
            // this.store.dispatch(loginAction(v));
          }
        })
        .catch(e => {
          console.log(e);
        })
        .finally(() => this.isLoading = false);
    }
  }

}
