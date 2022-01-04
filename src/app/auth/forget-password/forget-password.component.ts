import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Alert } from 'src/app/models/alert';
import { AlertService } from 'src/app/shared/services/alert.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent implements OnInit {

  form = new FormGroup({
    'username': new FormControl(null, [Validators.required]),
  })

  constructor(private authService: AuthService,
  private alertService: AlertService) { }

  ngOnInit(): void {
  }

  isLoading = false;
  alert = new Alert();

  async onSubmit  (){
    if(this.form.valid){
      this.alertService.hideAlert(this.alert);
      this.isLoading = true;
      this.authService.forgetPassword(this.form.value)
        .forEach(v => {
          console.log(v)
          if(v && v.error){
            if(v.error.code == "EMAIL_NOT_REGISTERED"){
              this.form.controls['username'].setErrors({
                else: 'Invalid email or email is not registered'
              })
            } else {
              this.alertService.showAlert(this.alert, v.error.code, v.error.message);
            }
          } else {  
            this.alertService.showAlert(this.alert, 'SENT', `Reset password link sent to your registered email. check your inbox or spam folder` , 'success');
          }
        })
        .catch(e => {
          // console.log(e);
        })
        .finally(() => this.isLoading = false);
    }
  }

}
