import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Branch } from '../../../models/branch';
import { Page } from '../../../models/page';
import { BranchService } from '../../services/branch.service';

@Component({
  selector: 'app-branch-list',
  templateUrl: './branch-list.component.html',
  styleUrls: ['./branch-list.component.scss']
})
export class BranchListComponent implements OnInit {

  isCollapsed = false;

  page = new Page<Branch>();
  pageLoading = false;
  filterForm = new FormGroup({
    'search': new FormControl(null, Validators.required)
  })

  constructor(private branchService: BranchService) { }

  async ngOnInit() {
    this.loadPage();
  }

  filter(){
    if(this.filterForm.valid)
      this.loadPage(this.filterForm.value);
    else
      this.loadPage();
  }
  
  async loadPage(params?){
    this.pageLoading = true;
    this.page = await this.branchService.filter(params).toPromise();
    this.pageLoading = false;
  }

  async pageChanged($event) {
    // console.log($event);
    let params = {
      number: $event.page
    };
    if(this.filterForm.valid){
      Object.assign(params, this.filterForm.value);
    }
    await this.loadPage(params);
  }

}
