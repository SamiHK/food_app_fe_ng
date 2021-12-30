import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
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

  isEditBranch = false;
  branchForm = new FormGroup({
    'name': new FormControl(),
    'code': new FormControl()
  })
  editBranch(){
    this.isEditBranch = true;
    if(this.branch){
      this.branchForm.controls.name.setValue(this.branch.name);
      this.branchForm.controls.code.setValue(this.branch.code);
    }
  }

  cancelEditBranch(){
    this.isEditBranch = false;
    this.branchForm.reset();
  }

  savingBranch = false;
  async saveBranch(){
    this.savingBranch = true;
    let _branch = this.branchForm.value;
    _branch.id = this.branch.id;
    await this.branchService.save(_branch).toPromise()
    .then(r => {
      Object.assign(this.branch, r);
      this.isEditBranch = false;
    })
    .catch(e => {
      if(e && e.code == 'ER_DUP_ENTRY'){
        this.branchForm.controls.code.setErrors({
          custom: 'this code is already assigned to another branch. Try another one'
        })
      }
    })
    .finally(() =>{
      this.savingBranch = false;
    });

  }
  


  isLoadingManager = false; 
  async loadManager(){
    this.isLoadingManager = true; 
    this.managersPage = await this.managerService.available().toPromise();
    this.isLoadingManager = false; 
  }
  
  selectedManagerId = null;
  isEditManager = false;
  editManager(){
    this.isEditManager = !this.isEditManager;
    if(!this.managersPage || !this.managersPage.items || !this.managersPage.items.length){
      this.loadManager();
    }
  }
  
  cancelEditManager(){
    this.isEditManager = !this.isEditManager;
    this.selectedManagerId = null;
  }
  
  savinghManager = false;
  async saveBranchManager(){
    if(this.selectedManagerId){
      this.savinghManager = true;
      this.branch = await this.branchService.saveManager(this.branch.id, this.selectedManagerId).toPromise();
      this.savinghManager = false;
      this.loadManager();
    }
    this.selectedManagerId = null;
    this.isEditManager = !this.isEditManager;
  }

}
