import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Menu } from 'src/app/models/menu';
import { MenuService } from '../../services/menu.service';

@Component({
  selector: 'app-menu-board',
  templateUrl: './menu-board.component.html',
  styleUrls: ['./menu-board.component.scss']
})
export class MenuBoardComponent implements OnInit {

  menus: Menu[] = [];
  selectedMenu?: Menu;
  constructor(private route: ActivatedRoute, private mService: MenuService) { }

  async ngOnInit() {
    await this.loadMenu();
    this.route.params.forEach(params => {
      if (params['id']) {
        let menuId: number = params['id'];
        this.selectMenu(this.menus.find(m => m.id == menuId));
      }
    })
  }

  selectMenu(m?: Menu) {
    this.selectedMenu = m;
  }

  isLoadingMenu = false;
  async loadMenu() {
    this.isLoadingMenu = true;
    await this.mService.menus().forEach(v => this.menus = v);
    this.isLoadingMenu = false;
  }

}
