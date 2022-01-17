import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SalespersonComponent } from './components/salesperson/salesperson.component';

const routes: Routes = [{
  path: '', component: SalespersonComponent, data: {title: 'Salesperson'},  children: [
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SalespersonRoutingModule { }
