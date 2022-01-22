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

  constructor(private route: ActivatedRoute,
    private amService: MenuService) { }

  async ngOnInit() {
    await this.loadMenu();
    this.route.params.forEach(params => {
      if(params['id'] && this.menus){
        this.selectedMenu = this.menus.find(m => m.id == params['id']);
      }
    })
  }

  isLoadingMenu = false;
  async loadMenu(){
    this.isLoadingMenu = true;
    await this.amService.getMenus().forEach(v => this.menus = v);
    this.isLoadingMenu = false;
  }

  selectedMenu?: Menu;
  selectMenu(m: Menu){
    this.selectedMenu = m;
  }

}
