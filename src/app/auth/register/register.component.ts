import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Alert } from 'src/app/models/alert';
import { AuthUser } from 'src/app/models/auth-user';
import { loginAction } from 'src/app/ngrx/auth/actions';
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
  })

  constructor(private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    private store: Store<{ 'auth': AuthUser }>,
    private alertService: AlertService) {
    this.form.addValidators(checkPassword)
  }

  ngOnInit(): void {
  }

  isLoading = false;
  alert = new Alert();

  async onSubmit() {
    if (this.form.valid) {
      this.alertService.hideAlert(this.alert);
      this.isLoading = true;
      this.authService.register(this.form.value)
        .forEach(v => {
          console.log(v)
          if (v && v.code) {
            this.alertService.showAlert(this.alert, v.code, v.message);
          } else if (v) {
            this.alertService.showAlert(this.alert, 'LOGGED IN', `Welcome back ${v.fullName}`, 'success');
            this.store.dispatch(loginAction(v));
            let redirectUrl = this.route.snapshot.queryParams['redirectUrl'];
            if (redirectUrl) {
              this.router.navigateByUrl(redirectUrl);
            } else {
              this.router.navigate(['/'])
            }
          }
        })
        .catch(e => {
          console.log(e);
          this.alertService.showAlert(this.alert, e.code, e.message);
        })
        .finally(() => this.isLoading = false);
    }
  }

}
