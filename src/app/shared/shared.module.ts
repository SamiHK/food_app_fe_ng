import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputErrorHelperComponent } from './components/input-error-helper/input-error-helper.component';
import { ErrorModalComponent } from './components/error-modal/error-modal.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ThenNaComponent } from './components/then-na/then-na.component';
import { LoaderComponent } from './components/loader/loader.component';
import { UserProfileCardComponent } from './components/user-profile-card/user-profile-card.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AlertModalComponent } from './components/alert-modal/alert-modal.component';



@NgModule({
  declarations: [
    InputErrorHelperComponent,
    ErrorModalComponent,
    ThenNaComponent,
    LoaderComponent,
    UserProfileCardComponent,
    AlertModalComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ModalModule.forRoot()
  ],
  exports: [
    InputErrorHelperComponent,
    ThenNaComponent,
    LoaderComponent,
    UserProfileCardComponent
  ]
})
export class SharedModule { }
