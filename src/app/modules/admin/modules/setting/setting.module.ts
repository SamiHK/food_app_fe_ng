import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingRoutingModule } from './setting-routing.module';
import { ButtonModule, CardModule, GridModule, ImgModule, SpinnerModule, TooltipModule } from '@coreui/angular';
import { IconModule, IconSetModule } from '@coreui/icons-angular';
import { SharedModule } from 'src/app/shared/shared.module';
import { SettingComponent } from './setting.component';

const CORE_UI_MODULES = [
  GridModule, 
  SpinnerModule,
  CardModule,
  ImgModule,
  ButtonModule,
  IconModule, IconSetModule,
  TooltipModule
]

@NgModule({
  declarations: [
    SettingComponent
  ],
  imports: [
    CommonModule,
    SettingRoutingModule,
    ...CORE_UI_MODULES,
    SharedModule
  ]
})
export class SettingModule { }
