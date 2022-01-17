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
    this.route.params.forEach(params => {
      this.selectMenu(params['id'])
    })
  }

  ngOnDestroy(): void {

  }

  selectMenu(id: number) {
    // console.log(`selectMenu: ${id}`);
    if (this.menus && id > 0) {
      this.selectedMenu = this.menus.find(v => v.id == id);
    }
  }

  isLoading = false;
  async loadMenu(params?: {
    page?: number, size?: number, search?: string
  }) {
    this.isLoading = true;
    await this.amService.menus(params).forEach(v => this.menus = v)
    if (this.menus && this.menus.length > 0) {
      let id = this.route.snapshot.params['id'];
      let m = this.menus.find(v => v.id == id);
      // console.log('loadMenu', m)
      if (m) {
        id = m.id;
        this.selectedMenu = m;
      }
      else {
        id = this.menus[0].id
      }
      this.router.navigate(['manager', 'menu', id])
    }
    this.isLoading = false;
  }

}
