import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DragulaService } from 'ng2-dragula';
import { Menu } from 'src/app/models/menu';
import { AdminFileService } from 'src/app/services/admin-file.service';
import { MenuService } from '../../services/menu.service';

@Component({
  selector: 'app-menu-list',
  templateUrl: './menu-list.component.html',
  styleUrls: ['./menu-list.component.scss']
})
export class MenuListComponent implements OnInit {

  menus: Menu[] = [];

  constructor(private route: ActivatedRoute,
    private amService: MenuService,
    private dragulaService: DragulaService,
    private afService: AdminFileService) {
    this.dragulaService.drop('menus').subscribe(v => {
      // console.log(v);
      this.menus.forEach((m, i) => m.sortOrder = (i + 1))
      let sortMap = this.menus.map((m, i) => {
        return {
          id: m.id,
          sortOrder: m.sortOrder
        }
      });
      this.amService.updateMenuSorting(sortMap).subscribe(v => v)
    })
  }

  ngOnInit(): void {
    this.loadMenu()
  }


  isLoading = false;
  async loadMenu(params?: {
    page?: number, size?: number, search?: string
  }) {
    this.isLoading = true;
    await this.amService.getMenus(params).forEach(v => this.menus = v)
    this.isLoading = false;
  }

  isUpdatingImage = false;
  async updateImage(data: {
    id: any,
    files: FileList
  }) {
    // console.log(data)
    if (data && data.id && data.files && data.files.length > 0) {
      // console.log(event.target.files);
      this.isUpdatingImage = true;
      await this.afService.menu(data.id, data.files[0]).forEach(v => {
        // console.log(v);
        if (data.id) {
          let menu = this.menus.find(m => m.id == data.id);
          if(menu){
            menu.primaryImg = v.primaryImg;
          }
        }
      });
      this.isUpdatingImage = false;
    }
    // console.log(this.selectedMenuImages);
  }

  updateIsActive(d: {id: any, status: boolean}){
    // console.log(d);
    if(d && d.id && d.status != undefined){
      this.amService.changeMenuIsActive(d.id, {isActive: d.status}).subscribe(v => v)
    }
  }

}
