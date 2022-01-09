import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Alert } from 'src/app/models/alert';
import { ManagerSalespersonService } from 'src/app/services/manager-salesperson.service';
import { checkPassword } from 'src/app/shared/form-input-validatorsFn';
import { AlertService } from 'src/app/shared/services/alert.service';

@Component({
  selector: 'app-salesperson-register',
  templateUrl: './salesperson-register.component.html',
  styleUrls: ['./salesperson-register.component.scss']
})
export class SalespersonRegisterComponent implements OnInit {

  form = new FormGroup({
    'username': new FormControl(null, [Validators.required]),
    'password': new FormControl(null),
    'confirmPassword': new FormControl(null),
  })

  constructor(private mspService: ManagerSalespersonService,
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
      this.mspService.register(this.form.value)
        .forEach(v => {
          console.log(v)
          if(v) {  
            this.alertService.showAlert(this.alert, 'Salesperson Registered', `New Salesperson has been registered` , 'success');
            this.router.navigate(['salesperson', v.id])
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
