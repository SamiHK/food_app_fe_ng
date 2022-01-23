import { Component, OnInit } from '@angular/core';
import { Menu } from 'src/app/models/menu';
import { MenuService } from '../services/menu.service';

@Component({
  selector: 'app-menu-item-list',
  templateUrl: './menu-item-list.component.html',
  styleUrls: ['./menu-item-list.component.scss']
})
export class MenuItemListComponent implements OnInit {


  menus : Menu[] = []

  public perfectScrollbarConfig = {
    suppressScrollX: true,
  };

  constructor(private mService: MenuService) { }

  async ngOnInit() {
    await this.loadMenuItems()
  }

  isLoading = false;
  loadMenuItems(){
    this.isLoading = true;
    this.mService.getMenusAndItems().forEach(v => this.menus = v);
    this.isLoading = false;
  }

}
