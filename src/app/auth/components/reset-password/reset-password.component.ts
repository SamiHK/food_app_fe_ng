import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  checkPassword(group: FormGroup) {
    return group.get('password').value == group.get('confirmPassword').value ? null : {
      passwordNotMatch: true
    };
  }

  form = new FormGroup({
    'password': new FormControl(null, [Validators.required, Validators.minLength(6), 
      Validators.maxLength(12)]),
    'confirmPassword': new FormControl(null, [Validators.required]),
  }, this.checkPassword);


  constructor(private router: Router, private route: ActivatedRoute, 
    private authService: AuthService) { }

  private token: string;

  ngOnInit(): void {
    this.token = this.route.snapshot.params.token;
  }

  alerts = [];
  isSubmitting = false;
  async onSubmit() {
    // console.log(this.form)
    if(this.form.valid){
      this.alerts = [];
      this.isSubmitting = true;
      let response = await this.authService.resetPassword(this.token, this.form.value).toPromise();
      if(response && response.error){
        this.alerts.push({
          type: 'danger',
          title: response.error.code,
          message: response.error.message,
        });
      } else {
        this.alerts.push({
          type: 'success',
          title: 'SUCCESS',
          message: 'Password has been reset, Now login with your new password',
        });
      }
      // console.log(response);
      this.isSubmitting = false;
    }
  }

}
