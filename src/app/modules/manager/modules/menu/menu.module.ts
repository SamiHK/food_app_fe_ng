import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MenuRoutingModule } from './menu-routing.module';
import { MenuComponent } from './components/menu/menu.component';
import { MenuListComponent } from './components/menu-list/menu-list.component';
import { MenuItemListComponent } from './components/menu-item-list/menu-item-list.component';
import { AlertModule, BadgeModule, ButtonGroupModule, ButtonModule, CardModule, FormModule, GridModule, ImgModule, ListGroupModule, SidebarModule, SpinnerModule, TableModule } from '@coreui/angular';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { IconModule, IconSetModule } from '@coreui/icons-angular';
import { MenuCardComponent } from './components/menu-card/menu-card.component';
import { MenuNavigationListComponent } from './components/menu-navigation-list/menu-navigation-list.component';
import { MenuBoardComponent } from './components/menu-board/menu-board.component';
import { DragulaModule } from 'ng2-dragula';
import { SharedModule } from 'src/app/shared/shared.module';

const CORE_UI_MODULES = [CardModule, ButtonModule, ButtonGroupModule,
  FormModule, AlertModule, TableModule, SpinnerModule,
  GridModule, IconModule, IconSetModule, BadgeModule,
  SidebarModule, ListGroupModule,
  PerfectScrollbarModule, ImgModule
]

@NgModule({
  declarations: [
    MenuComponent,
    MenuListComponent,
    MenuItemListComponent,
    MenuCardComponent,
    MenuNavigationListComponent,
    MenuBoardComponent
  ],
  imports: [
    CommonModule,
    MenuRoutingModule,
    ...CORE_UI_MODULES,
    DragulaModule.forRoot(),
    SharedModule
  ]
})
export class MenuModule { }
