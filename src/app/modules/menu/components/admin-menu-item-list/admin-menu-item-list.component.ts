import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DragulaService } from 'ng2-dragula';
import { Observable, Subscription } from 'rxjs';
import { Menu, MenuItem } from 'src/app/models/menu';
import { AdminMenuService } from 'src/app/services/admin-menu.service';

@Component({
  selector: 'app-admin-menu-item-list',
  templateUrl: './admin-menu-item-list.component.html',
  styleUrls: ['./admin-menu-item-list.component.scss']
})
export class AdminMenuItemListComponent implements OnInit, OnDestroy {

  menuItems: MenuItem[] | null = null;
  sbjs  = new Subscription();
  constructor(private route: ActivatedRoute, 
    private amService: AdminMenuService,
    private dragulaService: DragulaService) {
  }

  async ngOnInit() {
    this.route.params.forEach(params => {
      if(params['id']){
        // this.sbjs.unsubscribe();
        this.loadMenu(params['id'])
      }
    })
  }

  ngOnDestroy(): void {
      this.sbjs.unsubscribe()
  }

  isLoading = false;
  async loadMenu(id: number){
    this.isLoading = true;
    // console.log(id);
    await this.amService.items(id).forEach(v => this.menuItems = v)
    if(this.menuItems){
      this.sbjs.add(
        this.dragulaService.dragend('menuItems').subscribe(v => {
          this.menuItems?.forEach((v, i) => {
            v.sortOrder = i+1
          });
          let sortMap = this.menuItems?.map(m => {
            return {
              id: m.id, 
              sortOrder: m.sortOrder}
          })
          this.amService.updateItemSorting(sortMap).subscribe(v => console.log(v))
        })
      )
    }
    this.isLoading = false;
  }
  

}
