import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-auth-error-modal',
  templateUrl: './auth-error-modal.component.html',
  styleUrls: ['./auth-error-modal.component.scss']
})
export class AuthErrorModalComponent implements OnInit {

  constructor(private bsRefMod: BsModalRef<AuthErrorModalComponent>) { }

  ngOnInit(): void {}

  close(){
    this.bsRefMod.hide();
  }

}
