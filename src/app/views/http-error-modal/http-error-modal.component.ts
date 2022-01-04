import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-http-error-modal',
  templateUrl: './http-error-modal.component.html',
  styleUrls: ['./http-error-modal.component.scss']
})
export class HttpErrorModalComponent implements OnInit {

  public er!: HttpErrorResponse;

  constructor(public bsModalRef: BsModalRef) { }

  ngOnInit(): void {
  }

}
