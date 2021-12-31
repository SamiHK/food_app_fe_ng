import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TabsetComponent } from 'ngx-bootstrap/tabs';
import { Manager } from '../../../models/manager';
import { AuthService } from '../../../shared/services/auth.service';
import { UserService } from '../../../shared/services/user.service';
import { ManagerService } from '../../services/manager.service';

@Component({
  selector: 'app-manager-register',
  templateUrl: './manager-register.component.html',
  styleUrls: ['./manager-register.component.scss']
})
export class ManagerRegisterComponent implements OnInit {
  
  @ViewChild('formTabs', {static: false} ) formTabs?: TabsetComponent;
  
  manager: Manager;
  alerts = [];

  constructor(private managerService: ManagerService, 
    private userService: UserService,
    private authService: AuthService,
    private router: Router) { }
  
  ngOnInit(): void {}

  form_1 = new FormGroup({
    'username': new FormControl(null, [Validators.required])
  })
  isForm1Saving = false;
  
  form_2 = new FormGroup({
    'password': new FormControl(null, [Validators.required]),
    'confirmPassword': new FormControl(null, [Validators.required])
  })
  isForm2Saving = false;
  
  
  async onSumbitForm1(){
    this.alerts = [];
    if(this.form_1.valid){
      this.isForm1Saving = true;
      this.managerService.register(this.form_1.value).toPromise()
      .then(response => {        
        if(response.id){
          this.manager = response;
          this.formTabs.tabs[0].disabled = true;
          this.formTabs.tabs[1].disabled = false;
          this.formTabs.tabs[1].active = true;
        }
      })
      .catch(e => {
        // console.log(e);
        if(e.code == 'ER_DUP_ENTRY'){
          this.alerts.push({
            type: 'danger',
            title: 'Username not available',
            message: `${this.form_1.controls.username.value} is not available.`
          })
        }
      })
      .finally(() => {
        this.isForm1Saving = false;
      });
      // console.log(response);
    }
  } 
    
  skipForm2(){
    this.router.navigate(['managers', this.manager.id]);
  }
  
  async onSumbitForm2(){
    this.alerts = [];
    if(this.form_2.valid){
      this.isForm2Saving = true;
      await this.authService.updatePassword(this.manager.id, this.form_2.value).toPromise()
      .then(response => {
        // console.log(response);
        this.router.navigate(['managers', this.manager.id]);
      })
      .catch(e => console.log(e))
      .finally(() => 
        this.isForm2Saving = false
      );
    }
  }
  
}
