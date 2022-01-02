import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRegisterFormComponent } from './components/user-register-form/user-register-form.component';
import { UserProfileFormComponent } from './components/user-profile-form/user-profile-form.component';
import { FormModule, ButtonModule, SpinnerModule, GridModule, CardModule, AlertModule } from '@coreui/angular';
import { InputErrorComponent } from './components/input-error/input-error.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AlertModalComponent } from './components/alert-modal/alert-modal.component';
import { UserActiveSwitchComponent } from './components/user-active-switch/user-active-switch.component';
import { XcButtonDirective } from './directives/xc-button.directive';

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
    InputErrorComponent,
    AlertModalComponent,
    UserActiveSwitchComponent,
    XcButtonDirective
  ],
  imports: [
    CommonModule,
    ...CORE_UI_MODULES,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [
    InputErrorComponent, UserProfileFormComponent,
    UserActiveSwitchComponent, XcButtonDirective
  ]
})
export class SharedModule { }
