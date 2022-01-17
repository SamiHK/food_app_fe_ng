import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SalespersonListComponent } from './components/salesperson-list/salesperson-list.component';
import { SalespersonRegisterComponent } from './components/salesperson-register/salesperson-register.component';
import { SalespersonViewComponent } from './components/salesperson-view/salesperson-view.component';
import { SalespersonComponent } from './components/salesperson/salesperson.component';

const routes: Routes = [{
  path: '', component: SalespersonComponent, data: {title: 'Salesperson'},  children: [
    { path: '', component: SalespersonListComponent, data: {title: 'Search'} },
    { path: 'register', component: SalespersonRegisterComponent, data: {title: 'Register'} },
    { path: ':id', component: SalespersonViewComponent, data: {title: 'Detail'} },
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SalespersonRoutingModule { }
