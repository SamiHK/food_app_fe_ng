import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Alert } from 'src/app/models/alert';
import { SalesPerson } from 'src/app/models/sales-person';
import { ManagerSalespersonService } from 'src/app/services/manager-salesperson.service';

@Component({
  selector: 'app-salesperson-view',
  templateUrl: './salesperson-view.component.html',
  styleUrls: ['./salesperson-view.component.scss']
})
export class SalespersonViewComponent implements OnInit {

  salesperson: SalesPerson = new SalesPerson();

  constructor(private route: ActivatedRoute, private router: Router,
    private amService: ManagerSalespersonService) {
    let id = this.route.snapshot.params['id'];
    if (id) {
      this.salesperson.id = id;
    }
  }

  isLoading = false;
  async ngOnInit() {
    if (this.salesperson.id) {
      this.isLoading = true;
      await this.amService.get(this.salesperson.id)
        .forEach(v => this.salesperson = v)
        .finally(() => this.isLoading = false)
    }
  }

  isEditBranch = false;
  selectedBranchId = null;
  // branchPage = new Page<Branch>();  
  branchLoading = false;
  // loadBranch(){
  //   this.branchLoading = true;
  //   this.abService.available().forEach(v => this.branchPage = v)
  //   .finally(() => this.branchLoading = false);
  // }
  // editBranch() {
  //   if(this.branchPage && this.branchPage.items.length == 0){
  //     this.loadBranch();
  //   }
  //   this.isEditBranch = true;
  // }
  // cancelEditBranch() {
  //   this.isEditBranch = false;
  //   this.selectedBranchId = null;
  // }
  // savingBranch = false;
  alert = new Alert()
  // async saveBranch() {
  //   if (this.selectedBranchId && this.salesperson.id) {
  //     this.savingBranch = true;
  //     await this.abService.updateManager(this.selectedBranchId, {
  //       managerId: this.salesperson.id
  //     }).forEach(v => {
  //       // console.log(v)
  //       this.salesperson.branchId = v.id;
  //       this.salesperson.branch = new Branch()
  //       Object.assign(this.salesperson.branch, v);
  //       this.isEditBranch = false;
  //       this.loadBranch();
  //     })
  //       .catch(e => console.log(e))
  //       .finally(() => {
  //         this.selectedBranchId = null;
  //         this.savingBranch = false;
  //       })
  //   }
  // }

}
