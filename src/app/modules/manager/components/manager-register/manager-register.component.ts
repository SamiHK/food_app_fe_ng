import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Alert } from 'src/app/models/alert';
import { AdminManagerService } from 'src/app/services/admin-manager.service';
import { checkPassword } from 'src/app/shared/form-input-validatorsFn';
import { AlertService } from 'src/app/shared/services/alert.service';

@Component({
  selector: 'app-manager-register',
  templateUrl: './manager-register.component.html',
  styleUrls: ['./manager-register.component.scss']
})
export class ManagerRegisterComponent implements OnInit {

  form = new FormGroup({
    'username': new FormControl(null, [Validators.required]),
    'password': new FormControl(null),
    'confirmPassword': new FormControl(null),
  })

  constructor(private amService: AdminManagerService,
    private router: Router,
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
      this.amService.register(this.form.value)
        .forEach(v => {
          console.log(v)
          if(v) {  
            this.alertService.showAlert(this.alert, 'Manager Registered', `New Manager has been registered` , 'success');
            this.router.navigate(['manager', v.id])
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
