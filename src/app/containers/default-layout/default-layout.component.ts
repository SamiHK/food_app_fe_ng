import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthUser } from 'src/app/models/auth-user';
import { adminNavItems, managerNavItems, navItems } from './_nav';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html',
})
export class DefaultLayoutComponent implements OnInit {

  public navItems = navItems;
  public user?: AuthUser;

  public perfectScrollbarConfig = {
    suppressScrollX: true,
  };

  constructor(private router: Router, private store: Store<{ 'auth': AuthUser }>) {}

  ngOnInit(): void {
    this.store.select('auth').forEach(v => {
      // console.log(v);
      if (v == null) {
        this.router.navigate(['login']);
      } else {
        this.user = v;
        switch(this.user.role) {
          case 'ADMIN': this.navItems = adminNavItems; break;
          case 'MANAGER': this.navItems = managerNavItems; break;
          // default: 
        }
      }
    });
  }

}
