import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { ClassToggleService, HeaderComponent } from '@coreui/angular';
import { Store } from '@ngrx/store';
import { AuthUser } from 'src/app/models/auth-user';
import { logoutAction } from 'src/app/ngrx/auth/actions';
import { AppSettingService } from 'src/app/services/app-setting.service';

@Component({
  selector: 'app-default-header',
  templateUrl: './default-header.component.html',
})
export class DefaultHeaderComponent extends HeaderComponent implements OnInit {

  @Input() sidebarId: string = "sidebar";
  @Input() public user?: AuthUser;

  public newMessages = new Array(4)
  public newTasks = new Array(5)
  public newNotifications = new Array(5)

  constructor(private classToggler: ClassToggleService,
    private router: Router, private store: Store<{ 'auth': AuthUser }>) {
    super();
  }
  
  ngOnInit() {
  }

  public logout() {
    this.store.dispatch(logoutAction());
    this.router.navigate([''])
  }

}
