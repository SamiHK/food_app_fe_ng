import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { logoutAction } from 'src/app/ngrx/auth/actions';

@Component({
  selector: 'app-http-error-modal',
  templateUrl: './http-error-modal.component.html',
  styleUrls: ['./http-error-modal.component.scss']
})
export class HttpErrorModalComponent implements OnInit {

  public er!: HttpErrorResponse;
  isLogin = false;

  constructor(public bsModalRef: BsModalRef, private store: Store) {}

  ngOnInit(): void {
    if(this.er){
      if(this.er.status == 401){
        this.isLogin = true;
      }
    }
  }

  login(){
    this.bsModalRef.hide()
    this.store.dispatch(logoutAction())
  }
}
