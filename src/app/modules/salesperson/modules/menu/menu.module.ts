import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MenuRoutingModule } from './menu-routing.module';
import { MenuBoardComponent } from './components/menu-board/menu-board.component';
import { MenuNavigationListComponent } from './components/menu-navigation-list/menu-navigation-list.component';
import { MenuCardComponent } from './components/menu-card/menu-card.component';
import { MenuItemListComponent } from './components/menu-item-list/menu-item-list.component';
import { MenuListComponent } from './components/menu-list/menu-list.component';
import { AlertModule, BadgeModule, ButtonGroupModule, ButtonModule, CardModule, FormModule, GridModule, ImgModule, ListGroupModule, SidebarModule, SpinnerModule, TableModule } from '@coreui/angular';
import { IconModule, IconSetModule } from '@coreui/icons-angular';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { SharedModule } from 'src/app/shared/shared.module';

const CORE_UI_MODULES = [CardModule, ButtonModule, ButtonGroupModule,
  FormModule, AlertModule, TableModule, SpinnerModule,
  GridModule, IconModule, IconSetModule, BadgeModule,
  SidebarModule, ListGroupModule,
  PerfectScrollbarModule, ImgModule
]


@NgModule({
  declarations: [
    MenuBoardComponent,
    MenuNavigationListComponent,
    MenuCardComponent,
    MenuItemListComponent,
    MenuListComponent
  ],
  imports: [
    CommonModule,
    MenuRoutingModule,
    ...CORE_UI_MODULES,
    SharedModule,
  ]
})
export class MenuModule { }
