import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRegisterFormComponent } from './components/user-register-form/user-register-form.component';
import { UserProfileFormComponent } from './components/user-profile-form/user-profile-form.component';
import { FormModule, ButtonModule, SpinnerModule, GridModule, CardModule, AlertModule } from '@coreui/angular';
import { XFormInputDirective } from './directive/x-form-input.directive';
import { InputErrorComponent } from './components/input-error/input-error.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AlertModalComponent } from './components/alert-modal/alert-modal.component';
import { UserActiveSwitchComponent } from './components/user-active-switch/user-active-switch.component';

const CORE_UI_MODULES = [FormModule,
  ButtonModule,
  SpinnerModule,
  GridModule,
  CardModule,
  ButtonModule,
  AlertModule,
]

@NgModule({
  declarations: [
    UserRegisterFormComponent,
    UserProfileFormComponent,
    XFormInputDirective,
    InputErrorComponent,
    AlertModalComponent,
    UserActiveSwitchComponent,
  ],
  imports: [
    CommonModule,
    ...CORE_UI_MODULES,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [
    XFormInputDirective,
    InputErrorComponent, UserProfileFormComponent,
    UserActiveSwitchComponent
  ]
})
export class SharedModule { }
