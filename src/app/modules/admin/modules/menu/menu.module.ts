import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MenuRoutingModule } from './menu-routing.module';
import { MenuComponent } from './components/menu/menu.component';
import { MenuListComponent } from './components/menu-list/menu-list.component';
import { MenuFormComponent } from './components/menu-form/menu-form.component';
import { MenuItemListComponent } from './components/menu-item-list/menu-item-list.component';
import { MenuItemFormComponent } from './components/menu-item-form/menu-item-form.component';
import { HttpClientJsonpModule, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { AlertModule, BadgeModule, ButtonModule, CardModule, FormModule, GridModule, ImgModule, ListGroupModule, SpinnerModule, TableModule } from '@coreui/angular';
import { IconModule } from '@coreui/icons-angular';
import { DragulaModule } from 'ng2-dragula';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { MenuBoardComponent } from './components/menu-board/menu-board.component';
import { MenuNavigationListComponent } from './components/menu-navigation-list/menu-navigation-list.component';
import { MenuCardComponent } from './components/menu-card/menu-card.component';
import { MenuItemUnitListComponent } from './components/menu-item-unit-list/menu-item-unit-list.component';

const CORE_UI_MODULES = [
  CardModule,
  ButtonModule,
  FormModule,
  GridModule,
  TableModule,
  SpinnerModule,
  AlertModule,
  IconModule,
  BadgeModule,
  PerfectScrollbarModule,
  ListGroupModule, ImgModule
]

const REQUIRED_MODULES = [
  SharedModule,
  FormsModule, ReactiveFormsModule,
  PaginationModule.forRoot(),
  HttpClientModule, HttpClientJsonpModule,
  DragulaModule.forRoot()
]


@NgModule({
  declarations: [
    MenuComponent,
    MenuListComponent,
    MenuFormComponent,
    MenuItemListComponent,
    MenuItemFormComponent,
    MenuBoardComponent,
    MenuNavigationListComponent,
    MenuCardComponent,
    MenuItemUnitListComponent
  ],
  imports: [
    CommonModule,
    MenuRoutingModule,
    ...CORE_UI_MODULES, ...REQUIRED_MODULES
  ]
})
export class MenuModule { }
