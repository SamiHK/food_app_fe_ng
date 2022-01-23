import { Component, OnInit } from '@angular/core';
import { Menu } from 'src/app/models/menu';
import { MenuService } from '../services/menu.service';

@Component({
  selector: 'app-menu-list',
  templateUrl: './menu-list.component.html',
  styleUrls: ['./menu-list.component.scss']
})
export class MenuListComponent implements OnInit {

  constructor(private mService: MenuService) { }

  async ngOnInit() {
    await this.loadMenus()
  }

  isLoading = false;
  menus: Menu[] = [];
  async loadMenus(){
    this.isLoading = true;
    await this.mService.getMenus().forEach(v => this.menus = v)
    this.isLoading = false;
  }

}
