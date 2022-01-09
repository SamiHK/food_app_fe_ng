import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Page } from 'src/app/models/page';
import { SalesPerson } from 'src/app/models/sales-person';
import { AdminManagerService } from 'src/app/services/admin-manager.service';
import { ManagerSalespersonService } from 'src/app/services/manager-salesperson.service';

@Component({
  selector: 'app-salesperson-list',
  templateUrl: './salesperson-list.component.html',
  styleUrls: ['./salesperson-list.component.scss']
})
export class SalespersonListComponent implements OnInit {

  page = new Page<SalesPerson>();

  form = new FormGroup({
    'search': new FormControl(null, Validators.required)
  })

  constructor(private mspService: ManagerSalespersonService) { }

  ngOnInit(): void {
    this.loadManagers();
  }

  isLoading = false;
  async loadManagers(params?:any){
    this.isLoading = true;
    await this.mspService.filter(params)
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
