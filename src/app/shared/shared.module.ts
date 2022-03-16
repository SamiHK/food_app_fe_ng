import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRegisterFormComponent } from './components/user-register-form/user-register-form.component';
import { UserProfileFormComponent } from './components/user-profile-form/user-profile-form.component';
import { FormModule, ButtonModule, SpinnerModule, GridModule, CardModule, AlertModule, TableModule } from '@coreui/angular';
import { InputErrorComponent } from './components/input-error/input-error.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AlertModalComponent } from './components/alert-modal/alert-modal.component';
import { UserActiveSwitchComponent } from './components/user-active-switch/user-active-switch.component';
import { XcButtonDirective } from './directives/xc-button.directive';
import { MapModalComponent } from './components/map-modal/map-modal.component';
import { GoogleMapsModule } from '@angular/google-maps';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { SalespersonListComponent } from './components/salesperson-list/salesperson-list.component';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { UploadButtonComponent } from './components/upload-button/upload-button.component';
import { InputSwitchComponent } from './components/input-switch/input-switch.component';
import { ConfirmDeleteModalComponent } from './components/confirm-delete-modal/confirm-delete-modal.component';
import { AuthErrorModalComponent } from './components/auth-error-modal/auth-error-modal.component';
import { BranchModalComponent } from './components/branch-modal/branch-modal.component';
import { IconModule } from '@coreui/icons-angular';
import { OrderListItemCardComponent } from './components/order-list-item-card/order-list-item-card.component';
import { OrderDetailComponent } from './components/order-detail/order-detail.component';

const CORE_UI_MODULES = [FormModule,
  ButtonModule,
  SpinnerModule,
  GridModule,
  CardModule,
  ButtonModule,
  AlertModule,
  TableModule,
  IconModule
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
    SalespersonListComponent,
    UploadButtonComponent,
    InputSwitchComponent,
    ConfirmDeleteModalComponent,
    AuthErrorModalComponent,
    BranchModalComponent,
    OrderListItemCardComponent,
    OrderDetailComponent,
  ],
  imports: [
    CommonModule,
    ...CORE_UI_MODULES,
    ReactiveFormsModule,
    FormsModule,
    GoogleMapsModule,
    PaginationModule.forRoot(),
    TypeaheadModule.forRoot()
  ],
  exports: [
    InputErrorComponent, UserProfileFormComponent, UploadButtonComponent,
    InputSwitchComponent,
    UserActiveSwitchComponent, XcButtonDirective, SalespersonListComponent,
    OrderListItemCardComponent
  ]
})
export class SharedModule { }
