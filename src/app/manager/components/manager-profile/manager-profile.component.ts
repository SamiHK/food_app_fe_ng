import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BranchService } from '../../../branch/services/branch.service';
import { Branch } from '../../../models/branch';
import { Manager } from '../../../models/manager';
import { Page } from '../../../models/page';
import { ManagerService } from '../../services/manager.service';

@Component({
  selector: 'app-manager-profile',
  templateUrl: './manager-profile.component.html',
  styleUrls: ['./manager-profile.component.scss']
})
export class ManagerProfileComponent implements OnInit {

  manager: Manager;
  isLoading = false;
  isLoadingBranch = false;
  isEditBranch = false;
  branchPage = new Page<Branch>();

  constructor(private route: ActivatedRoute, private managerService: ManagerService,
    private branchService: BranchService) {
    let id = route.snapshot.params.id;
    if(id){
      this.manager = new Manager();
      this.manager.id = id;
    }
  }

  async ngOnInit() {
    if(this.manager.id){
      this.isLoading = true;
      this.manager = await this.managerService.get(this.manager.id).toPromise();
      this.isLoading = false;
    }
  }

  selectedBranchId = null;
  savingBranchManager = false;
  async editBranch(){
    this.isEditBranch = !this.isEditBranch;
    if(!this.branchPage || !this.branchPage.items.length){
      this.isLoadingBranch = true;
      this.branchPage = await this.branchService.available().toPromise();
      this.isLoadingBranch = false;
    }
  }
  
  cancleEditBranch(){
    this.isEditBranch = !this.isEditBranch;
    this.selectedBranchId = null;
  }
  
  async saveBranchManager(){
    this.savingBranchManager = true;
    await this.branchService.saveManager(this.selectedBranchId, this.manager.id).toPromise();
    this.manager = await this.managerService.get(this.manager.id).toPromise();
    this.branchPage = await this.branchService.available().toPromise();
    this.savingBranchManager = false;
    this.isEditBranch = !this.isEditBranch;
    this.selectedBranchId = null;
  }

  editEmail = false;
  savingEmail = false;
  async updateEmail(){
    this.savingEmail = true;
    await this.managerService.updateEmail(this.manager.id, {email: this.manager.email}).toPromise();
    this.savingEmail = false;
    this.editEmail = false;
  }

}
