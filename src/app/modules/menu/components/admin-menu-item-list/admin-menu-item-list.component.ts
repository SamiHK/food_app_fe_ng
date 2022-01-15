import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Menu } from 'src/app/models/menu';
import { AdminMenuService } from 'src/app/services/admin-menu.service';

@Component({
  selector: 'app-admin-menu-item-list',
  templateUrl: './admin-menu-item-list.component.html',
  styleUrls: ['./admin-menu-item-list.component.scss']
})
export class AdminMenuItemListComponent implements OnInit {

  menu: Menu | null = null;
  constructor(private route: ActivatedRoute, private amService: AdminMenuService) { }

  ngOnInit(): void {
    this.route.params.forEach(params => {
      if(params['id']){
        this.loadMenu(params['id'])
      }
    })
  }

  isLoading = false;
  async loadMenu(id: number){
    this.isLoading = true;
    // console.log(id);
    await this.amService.get(id).forEach(v => this.menu = v)
    this.isLoading = false;
  }

}
