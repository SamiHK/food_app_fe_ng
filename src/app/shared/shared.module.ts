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
import { MapModalComponent } from './components/map-modal/map-modal.component';
import { GoogleMapsModule } from '@angular/google-maps';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';

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
    XcButtonDirective,
    MapModalComponent,
  ],
  imports: [
    CommonModule,
    ...CORE_UI_MODULES,
    ReactiveFormsModule,
    FormsModule,
    GoogleMapsModule,
    TypeaheadModule.forRoot()
  ],
  exports: [
    InputErrorComponent, UserProfileFormComponent,
    UserActiveSwitchComponent, XcButtonDirective
  ]
})
export class SharedModule { }
