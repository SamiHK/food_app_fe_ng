import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Manager } from 'src/app/models/manager';
import { Page } from 'src/app/models/page';
import { ManagerService } from 'src/app/modules/admin/services/manager.service';

@Component({
  selector: 'app-manager-list',
  templateUrl: './manager-list.component.html',
  styleUrls: ['./manager-list.component.scss']
})
export class ManagerListComponent implements OnInit {

  page = new Page<Manager>();

  form = new FormGroup({
    'search': new FormControl(null, Validators.required)
  })

  constructor(private amService: ManagerService) { }

  ngOnInit(): void {
    this.loadManagers();
  }

  isLoading = false;
  async loadManagers(params?:any){
    this.isLoading = true;
    await this.amService.filter(params)
      .forEach(v => this.page = v)
      .finally(() => this.isLoading = false);
  }

  filter(){
    if(this.form.valid){
      this.loadManagers(this.form.value);
    } else {
      this.loadManagers();
    }
  }

  onPageChange(page: any){
    // console.log(page);
    if(this.form.valid){
      Object.assign(page, this.form.value)
      this.loadManagers(page);
    } else {
      this.loadManagers({number: page.page})
    }
  }
}