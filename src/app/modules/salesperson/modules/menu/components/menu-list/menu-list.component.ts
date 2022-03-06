import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Menu } from 'src/app/models/menu';
import { MenuService } from '../../services/menu.service';

@Component({
  selector: 'app-menu-list',
  templateUrl: './menu-list.component.html',
  styleUrls: ['./menu-list.component.scss']
})
export class MenuListComponent implements OnInit {

  menus: Menu[] = [];
  selectedMenu?: Menu | null = null;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private amService: MenuService) {
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

}