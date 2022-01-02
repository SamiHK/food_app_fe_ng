import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { AlertModule, ButtonModule, CardModule, FormModule, GridModule, SpinnerModule } from '@coreui/angular';
import { IconModule } from '@coreui/icons-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthComponent } from './auth/auth.component';
import { StoreModule } from '@ngrx/store';
import { authReducer } from '../ngrx/auth/reducers';
import { SharedModule } from '../shared/shared.module';

const CORE_UI_COMPONENET = [
  CardModule, IconModule, GridModule, FormModule, ButtonModule, AlertModule, 
  SpinnerModule
]

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    ForgetPasswordComponent,
    ResetPasswordComponent,
    AuthComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    HttpClientModule,
    ... CORE_UI_COMPONENET,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    StoreModule.forFeature('auth', authReducer)
  ]
})
export class AuthModule { }
