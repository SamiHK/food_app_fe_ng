import { Component, OnInit } from '@angular/core';
import { Manager } from '../../../models/manager';
import { Page } from '../../../models/page';
import { ManagerService } from '../../services/manager.service';

@Component({
  selector: 'app-manager-list',
  templateUrl: './manager-list.component.html',
  styleUrls: ['./manager-list.component.scss']
})
export class ManagerListComponent implements OnInit {
  isCollapsed = false;

  page = new Page<Manager>();
  listLoading = false;

  constructor(private managerService: ManagerService) { }

  async ngOnInit() {
    await this.loadPage();
  }
  
  async loadPage(params?){
    this.listLoading = true;
    this.page = await this.managerService.filter(params).toPromise();
    this.listLoading = false;
  }
  
  async pageChanged($event) {
    console.log($event);
    await this.loadPage({
      number: $event.page
    });
  }

}
