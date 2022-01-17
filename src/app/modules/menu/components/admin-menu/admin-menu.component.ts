import { Component, OnInit } from '@angular/core';
import { INavData } from '@coreui/angular';
import { freeSet } from '@coreui/icons';
import { IconSetService } from '@coreui/icons-angular';

@Component({
  selector: 'app-admin-menu',
  templateUrl: './admin-menu.component.html',
  styleUrls: ['./admin-menu.component.scss']
})
export class AdminMenuComponent implements OnInit {

  constructor(private iconSetService: IconSetService) {
    this.iconSetService.icons = { ... freeSet }
  }

  ngOnInit(): void {
  }


}
