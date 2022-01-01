import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { Alert } from 'src/app/models/alert';
import { CommonService } from 'src/app/services/common.service';
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
  private commonService: CommonService) {
    this.form.addValidators(this.commonService.checkPassword)
  }

  ngOnInit(): void {
  }

  isLoading = false;
  alert = new Alert();

  async onSubmit  (){
    if(this.form.valid){
      this.commonService.hideAlert(this.alert);
      this.isLoading = true;
      this.authService.register(this.form.value)
        .forEach(v => {
          console.log(v)
          if(v && v.error){
            this.commonService.showAlert(this.alert, v.error, v.message);
          } else if(v) {  
            this.commonService.showAlert(this.alert, 'LOGGED IN', `Welcome back ${v.fullName}` , 'success');
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
