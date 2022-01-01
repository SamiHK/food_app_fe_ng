import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Alert } from 'src/app/models/alert';
import { CommonService } from 'src/app/services/common.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  checkPassword: ValidatorFn = (control: AbstractControl) => {
    let error = control.value['password'] !== control.value['confirmPassword'] ?
    {
      else: 'Password not match'
    } : null;
    
    // (control.parent?.controls?['confirmPassword'] as FormControl).setErrors(error); 
    return error;
  }

  form = new FormGroup({
    'password': new FormControl(null, [Validators.required, Validators.minLength(6), Validators.maxLength(12)]),
    'confirmPassword': new FormControl(null),
  }, this.checkPassword)

  constructor(private authService: AuthService, 
    private commonService: CommonService,
    private route: ActivatedRoute) { }

  token?: string
  ngOnInit(): void {
    this.token = this.route.snapshot.params['token']
  }

  isLoading = false;
  alert = new Alert();

  async onSubmit  (){
    if(this.form.valid){
      this.commonService.hideAlert(this.alert);
      if(this.token != undefined){
        this.isLoading = true;
        this.authService.resetPassword(this.token, this.form.value)
          .forEach(v => {
            console.log(v)
            if(v && v.error){
              if(v.error.code == 'INVALID_OR_EXPIRED'){
                this.commonService.showAlert(this.alert, "FAILED", "Invalid   or expired token");
              } else {
                this.commonService.showAlert(this.alert, v.error.code, v.error.message);
              }
            } else {
              this.commonService.showAlert(this.alert, 'DONE', `Password has been reset. Login with your new password` , 'success');
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

}
