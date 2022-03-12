import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Branch } from 'src/app/models/branch';
import { Menu } from 'src/app/models/menu';
import { MenuService } from '../../../customer/modules/menu/services/menu.service';

@Component({
  selector: 'app-menu-list',
  templateUrl: './menu-list.component.html',
  styleUrls: ['./menu-list.component.scss']
})
export class MenuListComponent implements OnInit {

  constructor(private mService: MenuService, private branchStore: Store<{ 'branch': Branch }>) { }

  ngOnInit() {
    this.loadMenus();
    this.branchStore.select('branch').forEach(b => this.loadMenus(b))
  }

  isLoading = false;
  menus: Menu[] = [];
  async loadMenus(branch?: Branch) {
    this.isLoading = true;
    let params = {};
    if (branch && branch.id) {
      params = { branchId: branch.id };
    }
    await this.mService.getMenus(params).forEach(v => this.menus = v)
    this.isLoading = false;
  }

}
