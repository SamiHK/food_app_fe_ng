import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PromosRoutingModule } from './promos-routing.module';
import { PromoComponent } from './promo/promo.component';


@NgModule({
  declarations: [
    PromoComponent
  ],
  imports: [
    CommonModule,
    PromosRoutingModule
  ]
})
export class PromosModule { }
