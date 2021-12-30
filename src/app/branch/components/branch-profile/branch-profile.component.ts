import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';
import { isConstructorDeclaration } from 'typescript';
import { ManagerService } from '../../../manager/services/manager.service';
import { Branch } from '../../../models/branch';
import { Manager } from '../../../models/manager';
import { Page } from '../../../models/page';
import { BranchService } from '../../services/branch.service';

@Component({
  selector: 'app-branch-profile',
  templateUrl: './branch-profile.component.html',
  styleUrls: ['./branch-profile.component.scss']
})
export class BranchProfileComponent implements OnInit {

  isLoading = false;
  isEditManager = false;
  branch: Branch
  managersPage = new Page<Manager>();

  constructor(private route: ActivatedRoute, private branchService: BranchService,
    private managerService: ManagerService) {
    let id = route.snapshot.params.id;
    if(id){
      this.branch = new Branch();
      this.branch.id = id;
    }
  }

  async ngOnInit() {
    this.isLoading = true;
    this.branch = await this.branchService.get(this.branch.id).toPromise();
    this.isLoading = false;
  }
  
  isLoadingManager = false; 
  async loadManager(){
    this.isLoadingManager = true; 
    this.managersPage = await this.managerService.available().toPromise();
    this.isLoadingManager = false; 
  }

  selectedManagerId = null;
  editBranchManager(){
    this.isEditManager = !this.isEditManager;
    if(!this.managersPage || !this.managersPage.items || !this.managersPage.items.length){
      this.loadManager();
    }
  }
  
  cancelEditBranchManager(){
    this.isEditManager = !this.isEditManager;
    this.selectedManagerId = null;
  }
  
  savingBranchManager = false;
  async saveBranchManager(){
    this.savingBranchManager = true;
    this.branch = await this.branchService.saveManager(this.branch.id, this.selectedManagerId).toPromise();
    this.selectedManagerId = null;
    this.savingBranchManager = false;
    this.isEditManager = !this.isEditManager;
    this.loadManager();
  }

}
