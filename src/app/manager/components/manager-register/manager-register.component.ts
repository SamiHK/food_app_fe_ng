import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TabsetComponent } from 'ngx-bootstrap/tabs';
import { Manager } from '../../../models/manager';
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

  constructor(private managerService: ManagerService, private router: Router) { }
  
  ngOnInit(): void {}

  form_1 = new FormGroup({
    'username': new FormControl(null, [Validators.required])
  })
  isForm1Saving = false;
  
  form_2 = new FormGroup({
    'email': new FormControl(null, [Validators.required, Validators.email])
  })
  isForm2Saving = false;
  
  form_3 = new FormGroup({
    'password': new FormControl(null, [Validators.required]),
    'confirmPassword': new FormControl(null, [Validators.required])
  })
  isForm3Saving = false;
  
  
  async onSumbitForm1(){
    this.alerts = [];
    if(this.form_1.valid){
      this.isForm1Saving = true;
      let response = await this.managerService.register(this.form_1.value).toPromise();
      console.log(response);
      if(response.id){
        this.manager = response;
        this.formTabs.tabs[0].disabled = true;
        this.formTabs.tabs[1].disabled = false;
        this.formTabs.tabs[1].active = true;
        this.formTabs.tabs[2].disabled = false;
      }
      this.isForm1Saving = false;
    }
  } 
  
  async onSumbitForm2(){
    this.alerts = [];
    if(this.form_2.valid){
      this.isForm2Saving = true;
      await this.managerService.updateEmail(this.manager.id, this.form_2.value).toPromise();
      this.manager = await this.managerService.get(this.manager.id).toPromise();
      this.isForm2Saving = false;
    }
    // this.formTabs.tabs[1].disabled = false;
    this.formTabs.tabs[2].active = true
  }
  
  skipForm2(){
    this.formTabs.tabs[2].active = true
  }
  
  async onSumbitForm3(){
    this.alerts = [];
    if(this.form_3.valid){
      this.isForm3Saving = true;
      await this.managerService.updatePassword(this.manager.id, this.form_3.value).toPromise();
      this.router.navigate(['managers', this.manager.id]);
      this.isForm3Saving = false;
    }
  }
  
}
