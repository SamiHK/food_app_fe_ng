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
  selectedMenu?: Menu | null = null;
  selectedMenuImages: File[] = [];

  constructor(private route: ActivatedRoute,
    private router: Router,
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
      this.amService.updateSorting(sortMap).subscribe(v => v)
    })
  }

  ngOnInit(): void {
    this.loadMenu()
    this.route.params.forEach(params => {
      this.selectMenu(params['id'])
    })
  }

  selectMenu(id: number | null) {
    // console.log(`selectMenu: ${id}`);
    if (this.menus && id && id > 0) {
      this.selectedMenu = this.menus.find(v => v.id == id);
    }
  }

  isLoading = false;
  async loadMenu(params?: {
    page?: number, size?: number, search?: string
  }) {
    this.isLoading = true;
    await this.amService.filter(params).forEach(v => this.menus = v)
    if (this.menus && this.menus.length > 0) {
      let id = this.route.snapshot.params['id'];
      let m = this.menus.find(v => v.id == id);
      // console.log('loadMenu', m)
      if (m) {
        id = m.id;
        this.selectedMenu = m;
      }
      // else {
      //   id = this.menus[0].id
      // }
      // this.router.navigate(['admin', 'menu', id])
      this.selectMenu(id);
    }
    this.isLoading = false;
  }

  updateImages(data: {
    files: FileList
  }) {
    console.log(data)
    if (this.selectedMenu && this.selectedMenu.id && data && data.files) {
      // console.log(event.target.files);
      this.afService.menu(this.selectedMenu.id, data.files[0]).forEach(v => {
        // console.log(v);
        if (this.selectedMenu) {
          this.selectedMenu.primaryImg = v.path;
        }
      })
    }
    // console.log(this.selectedMenuImages);
  }

}