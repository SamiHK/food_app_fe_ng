import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Alert } from 'src/app/models/alert';
import { Branch } from 'src/app/models/branch';
import { Manager } from 'src/app/models/manager';
import { Page } from 'src/app/models/page';
import { AdminBranchService } from 'src/app/services/admin-branch.service';
import { AdminManagerService } from 'src/app/services/admin-manager.service';
import { CommonModalService } from 'src/app/shared/services/common-modal.service';

@Component({
  selector: 'app-branch-view',
  templateUrl: './branch-view.component.html',
  styleUrls: ['./branch-view.component.scss']
})
export class BranchViewComponent implements OnInit {

  branch: Branch = new Branch();

  constructor(private route: ActivatedRoute,
    private amService: AdminManagerService,
    private abService: AdminBranchService,
    private location: Location,
    private router: Router,
    private cModalService: CommonModalService) {
    let id = this.route.snapshot.params['id'];
    if (id) {
      this.branch.id = id;
    }
  }

  isLoading = false;
  async ngOnInit() {
    if (this.branch.id != '') {
      this.isLoading = true;
      await this.abService.get(this.branch.id)
        .forEach(v => this.branch = v)
        .finally(() => this.isLoading = false)
    } else {
      this.editBranch()
    }
  }

  branchForm = new FormGroup({
    'code': new FormControl(null, [Validators.required, Validators.minLength(2), Validators.maxLength(16)], ),
    'name': new FormControl(null, [Validators.required], )
  })


  editLocation(){
    let modalRef = this.cModalService.showMapModal(this.branch.location);
    modalRef.onHide?.subscribe(
      async (e) => {
        // console.log(e);
        if(e){
          // console.log(e)
          // console.log(modalRef.content?.location)
          if(modalRef && modalRef.content && modalRef.content.location && modalRef.content.location.formattedAddress){
            await this.abService.updateLocation(this.branch.id, modalRef.content.location)
            .forEach(v => this.branch.location = v)
            // this.branch.location = modalRef.content?.location
          }
        }
      }
    )
  }

  isEditBranch = false;
  editBranch(){
    if(this.branch && this.branch.id){
      this.branchForm.controls['code'].setValue(this.branch.code);
      this.branchForm.controls['name'].setValue(this.branch.name);
    }
    this.isEditBranch = true;
  }
  cancelEditBranch(){
    this.branchForm.reset();
    if(this.branch && this.branch.id){
      this.isEditBranch = false;
    } else {
      this.location.back()
    }
  }
  savingBranch = false;
  saveBranch(){
    if(this.branchForm.valid){
      this.savingBranch = true;

      let b = this.branchForm.value;
      if(this.branch && this.branch.id){
        b.id = this.branch.id
      } 

      this.abService.save(b).forEach(v => {
        if(v){
          if(!this.branch.id){
            this.router.navigate(['branch', v.id])
          } else {
            Object.assign(this.branch, v);
            this.isEditBranch = false;
          }
        }
      })
      .catch(e => {
        if(e && e.code == "ER_DUP_ENTRY"){
          this.branchForm.controls['code'].setErrors({else: 'this code is already registered, try another one'})
        }
      })
      .finally(() => {
        this.savingBranch = false;
      })
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
  async saveBranchManager() {
    if (this.selectedManagerId && this.branch.id) {
      this.savingManager = true;
      await this.abService.updateManager(this.branch.id, {
        managerId: this.selectedManagerId
      }).forEach(v => {
        console.log(v)
        Object.assign(this.branch, v);
        this.isEditManager = false;
        this.loadManager();
      })
        .catch(e => console.log(e))
        .finally(() => {
          this.selectedManagerId = null;
          this.savingManager = false;
        })
    }
  }


}
