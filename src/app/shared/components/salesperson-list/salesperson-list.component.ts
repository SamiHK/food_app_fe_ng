import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Page } from 'src/app/models/page';
import { SalesPerson } from 'src/app/models/sales-person';
import { BranchService } from 'src/app/modules/admin/services/branch.service';

@Component({
  selector: 'app-salesperson-list',
  templateUrl: './salesperson-list.component.html',
  styleUrls: ['./salesperson-list.component.scss']
})
export class SalespersonListComponent implements OnInit {


  form = new FormGroup({
    'search': new FormControl(null, Validators.required)
  })

  page = new Page<SalesPerson>();
  branchId: string | null = null

  constructor(private route: ActivatedRoute, private abService: BranchService) { }

  ngOnInit(): void {
    this.branchId = this.route.snapshot.params['branchId']
    this.loadManagers()
  }

  isLoading = false;
  async loadManagers(params?:any){
    this.isLoading = true;
    if(this.branchId){
      await this.abService.salesperson(this.branchId, params)
        .forEach(v => this.page = v)
        .finally(() => this.isLoading = false);
    }
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
