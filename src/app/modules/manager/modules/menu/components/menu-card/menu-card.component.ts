import { Component, Input, OnInit } from '@angular/core';
import { Menu } from 'src/app/models/menu';
import { MenuService } from '../../services/menu.service';

@Component({
  selector: 'app-menu-card',
  templateUrl: './menu-card.component.html',
  styleUrls: ['./menu-card.component.scss']
})
export class MenuCardComponent implements OnInit {

  @Input('menu') menu?: Menu;
  @Input('isLoading') isLoading = false;

  constructor(private mService: MenuService) { }

  ngOnInit(): void {
  }

  updatingAvailableStatus = false;
  async onChangeAvailability(event:any){
    console.log(event)
    if(event != undefined && event != null && this.menu){
      this.updatingAvailableStatus = true;
      this.menu.isAvailable = event.status;
      await this.mService.menuAvailability(this.menu).forEach(v => console.log(v))
      this.updatingAvailableStatus = false;
    }
  }

}
