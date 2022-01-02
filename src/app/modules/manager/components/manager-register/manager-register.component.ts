import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Alert } from 'src/app/models/alert';
import { CommonService } from 'src/app/services/common.service';
import { AdminManagerService } from 'src/app/shared/services/admin-manager.service';

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
      this.amService.register(this.form.value)
        .forEach(v => {
          console.log(v)
          if(v && v.error){
            this.commonService.showAlert(this.alert, v.error, v.message);
          } else if(v) {  
            this.commonService.showAlert(this.alert, 'Manager Registered', `New Manager has been registered` , 'success');
            this.router.navigate(['manager', v.id])
          }
        })
        .catch(e => {
          console.log(e);
          this.commonService.showAlert(this.alert, e.code, e.message);
        })
        .finally(() => this.isLoading = false);
    }
  }

}
