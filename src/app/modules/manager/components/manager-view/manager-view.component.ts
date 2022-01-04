import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Alert } from 'src/app/models/alert';
import { Branch } from 'src/app/models/branch';
import { Manager } from 'src/app/models/manager';
import { Page } from 'src/app/models/page';
import { AdminBranchService } from 'src/app/services/admin-branch.service';
import { AdminManagerService } from 'src/app/services/admin-manager.service';

@Component({
  selector: 'app-manager-view',
  templateUrl: './manager-view.component.html',
  styleUrls: ['./manager-view.component.scss']
})
export class ManagerViewComponent implements OnInit {

  manager: Manager = new Manager();

  constructor(private route: ActivatedRoute, private router: Router,
    private amService: AdminManagerService,
    private abService: AdminBranchService) {
    let id = this.route.snapshot.params['id'];
    if (id) {
      this.manager.id = id;
    }
  }

  isLoading = false;
  async ngOnInit() {
    if (this.manager.id) {
      this.isLoading = true;
      await this.amService.get(this.manager.id)
        .forEach(v => this.manager = v)
        .finally(() => this.isLoading = false)
    }
  }

  isEditBranch = false;
  selectedBranchId = null;
  branchPage = new Page<Branch>();  
  branchLoading = false;
  loadBranch(){
    this.branchLoading = true;
    this.abService.available().forEach(v => this.branchPage = v)
    .finally(() => this.branchLoading = false);
  }
  editBranch() {
    if(this.branchPage && this.branchPage.items.length == 0){
      this.loadBranch();
    }
    this.isEditBranch = true;
  }
  cancelEditBranch() {
    this.isEditBranch = false;
    this.selectedBranchId = null;
  }
  savingBranch = false;
  alert = new Alert()
  async saveBranch() {
    if (this.selectedBranchId && this.manager.id) {
      this.savingBranch = true;
      await this.abService.updateManager(this.selectedBranchId, {
        managerId: this.manager.id
      }).forEach(v => {
        // console.log(v)
        this.manager.branchId = v.id;
        this.manager.branch = new Branch()
        Object.assign(this.manager.branch, v);
        this.isEditBranch = false;
        this.loadBranch();
      })
        .catch(e => console.log(e))
        .finally(() => {
          this.selectedBranchId = null;
          this.savingBranch = false;
        })
    }
  }

}
