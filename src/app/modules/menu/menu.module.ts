import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MenuRoutingModule } from './menu-routing.module';
import { AdminMenuListComponent } from './components/admin-menu-list/admin-menu-list.component';
import { AdminMenuViewComponent } from './components/admin-menu-view/admin-menu-view.component';
import { AdminMenuComponent } from './components/admin-menu/admin-menu.component';
import { AlertModule, BadgeModule, ButtonModule, CardModule, FormModule, GridModule, ListGroupModule, NavbarModule, NavModule, SidebarModule, SpinnerModule, TableModule } from '@coreui/angular';
import { IconModule } from '@coreui/icons-angular';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';

const CORE_UI_MODULES = [
  CardModule, ButtonModule, FormModule, AlertModule, TableModule, SpinnerModule,
  GridModule, IconModule, BadgeModule, SidebarModule, ListGroupModule,
  PerfectScrollbarModule
];

@NgModule({
  declarations: [
    AdminMenuListComponent,
    AdminMenuViewComponent,
    AdminMenuComponent
  ],
  imports: [
    CommonModule,
    MenuRoutingModule,
    ...CORE_UI_MODULES
  ]
})
export class MenuModule { }
