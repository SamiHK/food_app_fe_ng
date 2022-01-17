import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DragulaService } from 'ng2-dragula';
import { Subscription } from 'rxjs';
import { Menu, MenuItem } from 'src/app/models/menu';
import { AdminFileService } from 'src/app/services/admin-file.service';
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
    private dragulaService: DragulaService,
    private afService: AdminFileService) {
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
    await this.amService.items(id).forEach(v => this.menuItems = v)
    if (this.menuItems) {
      this.sbjs.add(
        this.dragulaService.dragend('menuItems').subscribe(v => {
          this.menuItems?.forEach((v, i) => {
            v.sortOrder = i + 1
          });
          let sortMap = this.menuItems?.map(m => {
            return {
              id: m.id,
              sortOrder: m.sortOrder
            }
          })
          this.amService.updateItemSorting(sortMap).subscribe(v => v)
        })
      )
    }
    this.isLoadingMenuItems = false;
  }


  // updatingImage = false;
  async updateMenuItemImage(data: {
    id: any, files: FileList
  }) {
    // console.log(data);
    if (data.id && data.files) {
      this.afService.menuItem(data.id, data.files[0]).subscribe(v => {
        // console.log(v);
        let menuItem = this.menuItems?.find(v => v.id == data.id);
        if (menuItem) {
          menuItem.primaryImg = v.path
        }
      })
    }
  }

}
