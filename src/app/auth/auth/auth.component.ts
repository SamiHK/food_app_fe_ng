import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthUser } from 'src/app/models/auth-user';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  constructor(private router: Router, private store: Store<{'auth': AuthUser}>) { }

  ngOnInit(): void {
    this.store.select('auth').forEach(v => {
      // console.log(v);
      if(v != undefined && v != null){  
        this.router.navigateByUrl('/')
      }
    });
  }

}
