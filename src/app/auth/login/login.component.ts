import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Alert } from 'src/app/models/alert';
import { AuthUser } from 'src/app/models/auth-user';
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

  constructor(private authService: AuthService, private store: Store<{ 'auth': AuthUser }>,
    private alertService: AlertService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
  }

  isLoading = false;
  alert = new Alert();

  async onSubmit() {
    if (this.form.valid) {
      this.alertService.hideAlert(this.alert);
      this.isLoading = true;
      this.authService.login(this.form.value)
        .forEach(v => {
          // console.log(v)
          if (v) {
            this.alertService.showAlert(this.alert, 'LOGGED IN', `Welcome back ${v.fullName}`, 'success');
            this.store.dispatch(loginAction(v));
            let redirectUrl = this.route.snapshot.queryParams['redirectUrl'];
            if (redirectUrl){
              this.router.navigateByUrl(redirectUrl);
            } else {
              this.router.navigate(['/'])
            }
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
