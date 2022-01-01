import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Alert } from 'src/app/models/alert';
import { Branch } from 'src/app/models/branch';
import { Manager } from 'src/app/models/manager';
import { Page } from 'src/app/models/page';
import { CommonService } from 'src/app/services/common.service';
import { AdminBranchService } from 'src/app/shared/services/admin-branch.service';
import { AdminManagerService } from 'src/app/shared/services/admin-manager.service';

@Component({
  selector: 'app-branch-view',
  templateUrl: './branch-view.component.html',
  styleUrls: ['./branch-view.component.scss']
})
export class BranchViewComponent implements OnInit {

  branch: Branch = new Branch();

  constructor(private route: ActivatedRoute, private router: Router,
    private amService: AdminManagerService,
    private abService: AdminBranchService,
    private commonService: CommonService) {
    let id = this.route.snapshot.params['id'];
    if (id) {
      this.branch.id = id;
    }
  }

  isLoading = false;
  async ngOnInit() {
    if (this.branch.id) {
      this.isLoading = true;
      await this.abService.get(this.branch.id)
        .forEach(v => this.branch = v)
        .finally(() => this.isLoading = false)
    }
  }

  isEditManager = false;
  selectedManagerId = null;
  managerPage = new Page<Manager>();  
  managerLoading = false;
  loadManager(){
    this.managerLoading = true;
    this.amService.available().forEach(v => this.managerPage = v)
    .finally(() => this.managerLoading = false);
  }
  editManager() {
    if(this.managerPage && this.managerPage.items.length == 0){
      this.loadManager();
    }
    this.isEditManager = true;
  }
  cancelEditManager() {
    this.isEditManager = false;
    this.selectedManagerId = null;
  }
  savingManager = false;
  alert = new Alert()
  async saveBranch() {
    if (this.selectedManagerId && this.branch.id) {
      this.savingManager = true;
      await this.abService.updateManager(this.branch.id, {
        managerId: this.selectedManagerId
      }).forEach(v => {
        console.log(v)
        Object.assign(this.branch, v);
        this.isEditManager = false;
        this.loadManager();
        // this.commonService.showSuccessAlert(this.alert, "Branch Updated")
      })
        .catch(e => console.log(e))
        .finally(() => {
          this.selectedManagerId = null;
          this.savingManager = false;
        })
    }
  }


}
