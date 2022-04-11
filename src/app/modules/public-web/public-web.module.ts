import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PublicWebRoutingModule } from './public-web-routing.module';
import { MenuListComponent } from './components/menu-list/menu-list.component';
import { MenuItemsComponent } from './components/menu-items/menu-items.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { AlertModule, BadgeModule, ButtonModule, CardModule, FooterModule, FormModule, GridModule, HeaderModule, NavModule, SidebarModule, SpinnerModule, TableModule, TooltipModule } from '@coreui/angular';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { IconModule } from '@coreui/icons-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { DealsComponent } from './components/deals/deals.component';
import { PromosComponent } from './components/promos/promos.component';

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
  TooltipModule,
  HeaderModule, FooterModule, 
]

const NGX_BOOTSTRAP_MODULES = [
  ModalModule.forRoot()
]


@NgModule({
  declarations: [
    MenuListComponent,
    MenuItemsComponent,
    DealsComponent,
    PromosComponent,
  ],
  imports: [
    CommonModule,
    PublicWebRoutingModule,
    FormsModule, ReactiveFormsModule,
    ...CORE_UI_MODULES,
    ...NGX_BOOTSTRAP_MODULES,
    SharedModule
  ]
})
export class PublicWebModule { }
