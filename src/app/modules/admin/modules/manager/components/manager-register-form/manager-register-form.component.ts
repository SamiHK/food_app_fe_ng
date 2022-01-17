import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Alert } from 'src/app/models/alert';
import { ManagerService } from 'src/app/modules/admin/services/manager.service';
import { checkPassword } from 'src/app/shared/form-input-validatorsFn';
import { AlertService } from 'src/app/shared/services/alert.service';

@Component({
  selector: 'app-manager-register-form',
  templateUrl: './manager-register-form.component.html',
  styleUrls: ['./manager-register-form.component.scss']
})
export class ManagerRegisterFormComponent implements OnInit {

  form = new FormGroup({
    'username': new FormControl(null, [Validators.required]),
    'password': new FormControl(null),
    'confirmPassword': new FormControl(null),
  })

  constructor(private amService: ManagerService,
    private router: Router,
    private alertService: AlertService,
    public location: Location) {
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
            this.router.navigate(['admin', 'manager', v.id])
          }
        })
        .catch(e => {
          // console.log(e);
          if(e.code == 'ER_DUP_ENTRY'){
            this.form.controls['username'].setErrors({
              else: 'Username not available'
            })
          } else {
            this.alertService.showAlert(this.alert, e.code, e.message);
          }
        })
        .finally(() => this.isLoading = false);
    }
  }

}
