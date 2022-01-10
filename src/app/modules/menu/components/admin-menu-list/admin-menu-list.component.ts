import { Component, OnInit } from '@angular/core';
import { INavData } from '@coreui/angular';

@Component({
  selector: 'app-admin-menu-list',
  templateUrl: './admin-menu-list.component.html',
  styleUrls: ['./admin-menu-list.component.scss']
})
export class AdminMenuListComponent implements OnInit {

  public navItems: INavData[] = [
    {
      name: 'Starter',
      url: '/starter'
    }
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
