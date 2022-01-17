import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DragulaService } from 'ng2-dragula';
import { Menu } from 'src/app/models/menu';
import { MenuService } from '../../services/menu.service';

@Component({
  selector: 'app-menu-navigation-list',
  templateUrl: './menu-navigation-list.component.html',
  styleUrls: ['./menu-navigation-list.component.scss']
})
export class MenuNavigationListComponent implements OnInit {

  @Input('menus') menus: Menu[] = [];
  @Input('isLoading') isLoading = false

  constructor(private amService: MenuService,
    private dragulaService: DragulaService) {
  }

  async ngOnInit() {
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

  ngOnDestroy(): void {
    // this.sbjs.unsubscribe()
  }
}
