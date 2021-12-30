import { Component, OnInit } from '@angular/core';
import { Branch } from '../../../models/branch';
import { Page } from '../../../models/page';
import { BranchService } from '../../services/branch.service';

@Component({
  selector: 'app-branch-list',
  templateUrl: './branch-list.component.html',
  styleUrls: ['./branch-list.component.scss']
})
export class BranchListComponent implements OnInit {

  isCollapsed = false;

  page = new Page<Branch>();
  pageLoading = false;

  constructor(private branchService: BranchService) { }

  async ngOnInit() {
    this.loadPage();
  }
  
  async loadPage(params?){
    this.pageLoading = true;
    this.page = await this.branchService.filter(params).toPromise();
    this.pageLoading = false;
  }

  pageChanged($event) {
    console.log($event);
    this.loadPage({
      number: $event.page
    })
  }

}
