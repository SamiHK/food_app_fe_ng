import { Component, OnDestroy, OnInit } from '@angular/core';
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
export class MenuListComponent implements OnInit, OnDestroy {

  menus: Menu[] = [];
  selectedMenu?: Menu | null = null;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private amService: MenuService,
    private afService: AdminFileService) {
    
  }

  ngOnInit(): void {
    this.loadMenu()
  }

  ngOnDestroy(): void {

  }

  isLoading = false;
  async loadMenu(params?: {
    page?: number, size?: number, search?: string
  }) {
    this.isLoading = true;
    await this.amService.menus(params).forEach(v => this.menus = v)
    this.isLoading = false;
  }

  async onChangeAvailability(event: any){
    if(event.id){
      let menu = this.menus.find(m => m.id == event.id);
      if(menu){
        menu.updatingAvailability = true;
        menu.isAvailable = event.status;
        await this.amService.menuAvailability(menu).forEach(v => console.log(v));
        menu.updatingAvailability = false;
      }
    }
  }

}
