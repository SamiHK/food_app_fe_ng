import { Component, Input, OnInit } from '@angular/core';
import { Menu } from 'src/app/models/menu';

@Component({
  selector: 'app-menu-card',
  templateUrl: './menu-card.component.html',
  styleUrls: ['./menu-card.component.scss']
})
export class MenuCardComponent implements OnInit {

  @Input('menu') menu?: Menu;
  @Input('isLoading') isLoading = false;

  constructor() { }

  ngOnInit(): void {
  }

}
