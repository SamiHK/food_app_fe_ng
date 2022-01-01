import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Branch } from 'src/app/models/branch';
import { Page } from 'src/app/models/page';
import { AdminBranchService } from 'src/app/shared/services/admin-branch.service';

@Component({
  selector: 'app-branch-list',
  templateUrl: './branch-list.component.html',
  styleUrls: ['./branch-list.component.scss']
})
export class BranchListComponent implements OnInit {

  page = new Page<Branch>();

  form = new FormGroup({
    'search': new FormControl(null, Validators.required)
  })

  constructor(private abService: AdminBranchService) { }

  ngOnInit(): void {
    this.loadBranches();
  }

  isLoading = false;
  async loadBranches(params?:any){
    this.isLoading = true;
    await this.abService.filter(params)
      .forEach(v => this.page = v)
      .finally(() => this.isLoading = false);
  }

  filter(){
    if(this.form.valid){
      this.loadBranches(this.form.value);
    } else {
      this.loadBranches();
    }
  }

  onPageChange(page: any){
    // console.log(page);
    if(this.form.valid){
      Object.assign(page, this.form.value)
      this.loadBranches(page);
    } else {
      this.loadBranches({number: page.page})
    }
  }

}
