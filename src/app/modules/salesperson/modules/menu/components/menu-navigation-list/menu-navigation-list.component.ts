import { Component, Input, OnInit } from '@angular/core';
import { Menu } from 'src/app/models/menu';

@Component({
  selector: 'app-menu-navigation-list',
  templateUrl: './menu-navigation-list.component.html',
  styleUrls: ['./menu-navigation-list.component.scss']
})
export class MenuNavigationListComponent implements OnInit {

  @Input('menus') menus: Menu[] = []
  @Input('isLoading') isLoading = false;

  constructor() { }

  ngOnInit(): void {
  }

}
