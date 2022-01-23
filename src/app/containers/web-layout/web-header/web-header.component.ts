import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterState } from '@angular/router';
import { ClassToggleService, HeaderComponent, INavData } from '@coreui/angular';
import { Store } from '@ngrx/store';
import { AuthUser } from 'src/app/models/auth-user';
import { logoutAction } from 'src/app/ngrx/auth/actions';
import { adminNavItems, customerNavItems, managerNavItems, salespersonNavItems } from '../_nav';

@Component({
  selector: 'app-web-header',
  templateUrl: './web-header.component.html',
  styleUrls: ['./web-header.component.scss']
})
export class WebHeaderComponent extends HeaderComponent implements OnInit {

  @Input() sidebarId: string = "sidebar";

  @Input() public user?: AuthUser;

  constructor(private classToggler: ClassToggleService,
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<{ 'auth': AuthUser }>) {
    super();
  }

  userMenus: INavData[] = customerNavItems;
  ngOnInit() {
    this.store.select('auth').forEach(v => {
      if (v && v.role) {
        switch (v.role) {
          case 'ADMIN': this.userMenus = adminNavItems; break;
          case 'MANAGER': this.userMenus = managerNavItems; break;
          case 'SALES_PERSON': this.userMenus = salespersonNavItems; break;
          case 'CUSTOMER': this.userMenus = customerNavItems;
        }
      } else {
        this.userMenus = [];
      }
    })
  }

  public logout() {
    this.store.dispatch(logoutAction());
    this.router.navigate([''])
  }

}
