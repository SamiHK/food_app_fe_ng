import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalService } from '../../../shared/services/modal.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  isSubmitting = false;
  form = new FormGroup({
    'email': new FormControl(null, [Validators.required, Validators.email])
  })

  constructor(private authService: AuthService, 
    private modalService: ModalService,
    private router: Router) { }

  ngOnInit(): void {
  }

  async onSumbit(){
    if(this.form.valid){
      this.isSubmitting = true;
      let response = await this.authService.forgotPassword(this.form.controls.email.value).toPromise();
      if(response && response.error){
        this.form.controls.email.setErrors({
          duplicate: true
        });
      } else {
        this.modalService.showAlertModal({
          type: 'success',
          title: 'Success',
          message: 'Password reset link sent to your email. Check your inbox, and span folder too'
        }).onHide.subscribe(() => {
          this.router.navigate(['/']);
        })
      }
      this.isSubmitting = false;
    }
  }

}
