import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Branch } from 'src/app/models/branch';
import { BranchService } from 'src/app/modules/customer/services/branch.service';
import { AppSettingService } from 'src/app/services/app-setting.service';

@Component({
  selector: 'app-branch-modal',
  templateUrl: './branch-modal.component.html',
  styleUrls: ['./branch-modal.component.scss']
})
export class BranchModalComponent implements OnInit {

  darkLogo?: string
  selectedBranch?: Branch;
  branches: Branch[] = [];

  constructor(
    private branchService: BranchService,
    private appSettingService: AppSettingService,
    public bsModalRef: BsModalRef) { }

  ngOnInit(): void {
    this.darkLogo = this.appSettingService.getDarkLogo();
    this.loadBranches()
  }

  loadingBranches = false;
  loadBranches() {
    this.loadingBranches = true;
    this.branchService.getBranches()
      .forEach(v => this.branches = v)
      .finally(() => {
        this.loadingBranches = false;
      })
  }

  compareBranch(b1: Branch, b2: Branch): boolean {
    return b1 && b2 ? b1.id === b2.id : b1 === b2;
  }

  select(){
    if(this.selectedBranch){
      this.bsModalRef.hide();
    }
  }

}
