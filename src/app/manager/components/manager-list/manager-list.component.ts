import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Manager } from '../../../models/manager';
import { Page } from '../../../models/page';
import { AuthService } from '../../../shared/services/auth.service';
import { ManagerService } from '../../services/manager.service';

@Component({
  selector: 'app-manager-list',
  templateUrl: './manager-list.component.html',
  styleUrls: ['./manager-list.component.scss']
})
export class ManagerListComponent implements OnInit {
  isCollapsed = false;

  page = new Page<Manager>();
  listLoading = false;
  filterForm = new FormGroup({
    'search': new FormControl(null, [Validators.required])
  });

  constructor(private managerService: ManagerService) { }

  async ngOnInit() {
    await this.loadPage();
  }

  async filter(){
    if(this.filterForm.valid)
      this.loadPage(this.filterForm.value)
    else 
      this.loadPage()
  }
  
  async loadPage(params?){
    this.listLoading = true;
    this.page = await this.managerService.filter(params).toPromise();
    this.listLoading = false;
  }
  
  async pageChanged($event) {
    console.log($event);
    let params = {
      number: $event.page
    }
    if(this.filterForm.valid){
      Object.assign(params, this.filterForm.value);
    }
    await this.loadPage(params);
  }

}
