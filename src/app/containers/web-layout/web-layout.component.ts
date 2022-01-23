import { Component, OnInit } from '@angular/core';
import { SidebarComponent} from '@coreui/angular';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthUser } from 'src/app/models/auth-user';
import { logoutAction } from 'src/app/ngrx/auth/actions';

@Component({
  selector: 'app-web-layout',
  templateUrl: './web-layout.component.html',
  styleUrls: ['./web-layout.component.scss']
})
export class WebLayoutComponent implements OnInit {

  user?: AuthUser;

  constructor(private router: Router, private store: Store<{ 'auth': AuthUser }>) {}

  ngOnInit(): void {
    this.store.select('auth').forEach(v => {
      // console.log(v);
      if (v == null) {
        this.user = undefined;
        // this.router.navigate(['login']);
      } else {
        this.user = v;
      }
    });
  }

  

  public logout() {
    this.store.dispatch(logoutAction());
    this.router.navigate([''])
  }


}
