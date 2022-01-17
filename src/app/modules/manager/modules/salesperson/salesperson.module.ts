import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SalespersonRoutingModule } from './salesperson-routing.module';
import { SalespersonComponent } from './components/salesperson/salesperson.component';
import { SalespersonListComponent } from './components/salesperson-list/salesperson-list.component';
import { SalespersonRegisterComponent } from './components/salesperson-register/salesperson-register.component';
import { SalespersonViewComponent } from './components/salesperson-view/salesperson-view.component';


@NgModule({
  declarations: [
    SalespersonComponent,
    SalespersonListComponent,
    SalespersonRegisterComponent,
    SalespersonViewComponent
  ],
  imports: [
    CommonModule,
    SalespersonRoutingModule
  ]
})
export class SalespersonModule { }
