import { Component, Input, OnInit } from '@angular/core';
import { Menu } from 'src/app/models/menu';
import { AdminFileService } from 'src/app/services/admin-file.service';
import { MenuService } from '../../services/menu.service';

@Component({
  selector: 'app-menu-card',
  templateUrl: './menu-card.component.html',
  styleUrls: ['./menu-card.component.scss']
})
export class MenuCardComponent implements OnInit {

  @Input('isLoading') isLoading = false;
  @Input('menu') menu?: Menu;

  constructor(private afService: AdminFileService) { }

  ngOnInit(): void {
  }

  updatingImage = false;
  async updateMenuImage(data: {
    id?: any, files: FileList
  }) {
    // console.log(data);
    if (this.menu && data.files) {
      this.updatingImage = true;
      await this.afService.menu(this.menu.id, data.files[0]).forEach(v => {
        // console.log(v);
        if(this.menu){
          this.menu.primaryImg = v.path
        }
      })
      this.updatingImage = false;
    }
  }

}
