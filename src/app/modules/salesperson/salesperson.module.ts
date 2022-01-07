import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SalespersonRoutingModule } from './salesperson-routing.module';
import { SalespersonListComponent } from './components/salesperson-list/salesperson-list.component';
import { SalespersonViewComponent } from './components/salesperson-view/salesperson-view.component';
import { SalespersonComponent } from './components/salesperson/salesperson.component';


@NgModule({
  declarations: [
    SalespersonListComponent,
    SalespersonViewComponent,
    SalespersonComponent
  ],
  imports: [
    CommonModule,
    SalespersonRoutingModule
  ]
})
export class SalespersonModule { }
