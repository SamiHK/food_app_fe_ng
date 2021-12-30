import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-error-modal',
  templateUrl: './error-modal.component.html',
  styleUrls: ['./error-modal.component.scss']
})
export class ErrorModalComponent implements OnInit {
  err: HttpErrorResponse;
  
  constructor(public bsModalRef: BsModalRef) { }
  ngOnInit(): void {
    // this.bsModalRef.hide()
  }

}
