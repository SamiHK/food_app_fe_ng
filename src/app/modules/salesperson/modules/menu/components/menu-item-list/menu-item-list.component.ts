import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Menu, MenuItem } from 'src/app/models/menu';
import { MenuService } from '../../services/menu.service';

@Component({
  selector: 'app-menu-item-list',
  templateUrl: './menu-item-list.component.html',
  styleUrls: ['./menu-item-list.component.scss']
})
export class MenuItemListComponent implements OnInit {

  menuItems: MenuItem[] | null = null;
  selectedMenu?: Menu;
  constructor(private route: ActivatedRoute,
    private amService: MenuService) {
  }

  async ngOnInit() {
    this.route.params.forEach(params => {
      if (params['id']) {
        // this.sbjs.unsubscribe();
        this.loadMenuItems(params['id'])
      }
    })
  }


  isLoadingMenuItems = false;
  async loadMenuItems(id: number) {
    // this.selectMenu(id)
    this.isLoadingMenuItems = true;
    // console.log(id);
    await this.amService.menuItems(id).forEach(v => this.menuItems = v)
    this.isLoadingMenuItems = false;
  }

}