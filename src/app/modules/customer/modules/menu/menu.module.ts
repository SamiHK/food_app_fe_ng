import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MenuRoutingModule } from './menu-routing.module';
import { MenuComponent } from './menu/menu.component';
import { AlertModule, BadgeModule, ButtonModule, CardModule, FormModule, GridModule, NavModule, SidebarModule, SpinnerModule, TableModule, TooltipModule } from '@coreui/angular';
import { IconModule } from '@coreui/icons-angular';
import { SharedModule } from 'src/app/shared/shared.module';
import { ModalModule } from 'ngx-bootstrap/modal';
import { MenuItemListComponent } from './menu-item-list/menu-item-list.component';
import { PerfectScrollbarConfigInterface, PerfectScrollbarModule, PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';

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
  NavModule,
  SidebarModule,
  TooltipModule
]

const NGX_BOOTSTRAP_MODULES = [
  ModalModule.forRoot()
]

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

@NgModule({
  declarations: [
    MenuComponent,
    MenuItemListComponent
  ],
  imports: [
    CommonModule,
    MenuRoutingModule,
    ...CORE_UI_MODULES, ...NGX_BOOTSTRAP_MODULES, SharedModule
  ],
  providers: [
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG

    }
  ]
})
export class MenuModule { }
