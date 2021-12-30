import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputErrorHelperComponent } from './components/input-error-helper/input-error-helper.component';
import { ErrorModalComponent } from './components/error-modal/error-modal.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ThenNaComponent } from './components/then-na/then-na.component';
import { LoaderComponent } from './components/loader/loader.component';



@NgModule({
  declarations: [
    InputErrorHelperComponent,
    ErrorModalComponent,
    ThenNaComponent,
    LoaderComponent
  ],
  imports: [
    CommonModule,
    ModalModule.forRoot()
  ],
  exports: [
    InputErrorHelperComponent,
    ThenNaComponent,
    LoaderComponent
  ]
})
export class SharedModule { }
