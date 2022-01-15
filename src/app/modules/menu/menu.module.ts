import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MenuRoutingModule } from './menu-routing.module';
import { AdminMenuListComponent } from './components/admin-menu-list/admin-menu-list.component';
import { AdminMenuComponent } from './components/admin-menu/admin-menu.component';
import { AlertModule, BadgeModule, ButtonGroupModule, ButtonModule, CardModule, FormModule, GridModule, ListGroupModule, NavbarModule, NavModule, SidebarModule, SpinnerModule, TableModule } from '@coreui/angular';
import { IconModule, IconSetModule, IconSetService } from '@coreui/icons-angular';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { AdminMenuItemListComponent } from './components/admin-menu-item-list/admin-menu-item-list.component';
import { AdminMenuItemCreateComponent } from './components/admin-menu-item-create/admin-menu-item-create.component';
import { AdminMenuFormComponent } from './components/admin-menu-form/admin-menu-form.component';

const CORE_UI_MODULES = [
  CardModule, ButtonModule, ButtonGroupModule, FormModule, AlertModule, TableModule, SpinnerModule,
  GridModule, IconModule, IconSetModule, BadgeModule, SidebarModule, ListGroupModule,
  PerfectScrollbarModule
];

@NgModule({
  declarations: [
    AdminMenuListComponent,
    AdminMenuComponent,
    AdminMenuItemListComponent,
    AdminMenuItemCreateComponent,
    AdminMenuFormComponent
  ],
  imports: [
    CommonModule,
    MenuRoutingModule,
    ...CORE_UI_MODULES,
    SharedModule,
    FormsModule, ReactiveFormsModule
  ], providers: [
    IconSetService
  ]
})
export class MenuModule { }
