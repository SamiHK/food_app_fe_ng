import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DragulaService } from 'ng2-dragula';
import { Subscription } from 'rxjs';
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
  sbjs = new Subscription();
  constructor(private route: ActivatedRoute,
    private amService: MenuService,
    private dragulaService: DragulaService) {
  }

  async ngOnInit() {
    this.route.params.forEach(params => {
      if (params['id']) {
        // this.sbjs.unsubscribe();
        this.loadMenuItems(params['id'])
      }
    });

    this.dragulaService.drop('menuItems').subscribe(v => {
      // console.log(v);
      if(this.menuItems){
        this.menuItems.forEach((m, i) => m.sortOrder = (i + 1))
        let sortMap = this.menuItems.map((m, i) => {
          return {
            id: m.id,
            sortOrder: m.sortOrder
          }
        });
        this.amService.menuItemsSorting(sortMap).subscribe(v => v)
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

  async onChangeMenuItemAvailability(event: any){
    console.log(event)
    if(event){
      let menuItem = this.menuItems?.find(m => m.id == event.id);
      if(menuItem){
        menuItem.updatingAvailability = true;
        menuItem.isAvailable = event.status;
        this.amService.menuItemAvailability(menuItem).forEach(v => console.log(v));
        menuItem.updatingAvailability = false;
      }
    }
  }
}
