import {Component, OnInit} from '@angular/core';
import { AppSidebarComponent } from '@coreui/angular';
import { Store } from '@ngrx/store';
import { logoutAction } from '../../auth/ngrx/actions';
import { AuthGuard } from '../../auth/services/auth.guard';
import { User } from '../../models/user';
import { navItems, loadingNavItem, adminNavItems, managerNavItems, salespersonNavItems } from '../../_nav';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html'
})
export class DefaultLayoutComponent implements OnInit {

  public user = null;
  public sidebarMinimized = false;
  // public navItemsLoading = false;
  public navItems = loadingNavItem;

  constructor(private store: Store<{authReducer: AuthGuard}>){}
  
  async ngOnInit() {
    // this.navItemsLoading = true;
    this.store.select('authReducer').subscribe(e => {
      this.user = e;
      if(this.user && this.user.role){
        switch(this.user.role){
          case "ADMIN":
            this.navItems = adminNavItems;
            break;
          case "MANAGER":
            this.navItems = managerNavItems;
            break;
          case "SALESPERSON":
            this.navItems = salespersonNavItems;
            break;
        }
      }
    } );
  }

  get userFullName(){
    let _userFullName = this.user.fullName;
    if(_userFullName == null){
      _userFullName = this.user.username;
    }
    if(_userFullName == null){
      _userFullName = this.user.email;
    }
    return _userFullName;
  }

  toggleMinimize(e) {
    this.sidebarMinimized = e;
  }

  logout(){
    this.store.dispatch(logoutAction());      
  }
}
