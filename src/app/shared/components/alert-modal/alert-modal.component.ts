import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { ModalComponent } from '@coreui/angular';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-alert-modal',
  templateUrl: './alert-modal.component.html',
  styleUrls: ['./alert-modal.component.scss']
})
export class AlertModalComponent implements OnInit {

  choice = false;
  constructor(public bsModalRef: BsModalRef) {
    this.bsModalRef.onHide?.emit(this.choice);
    // super()
  }

  ngOnInit(): void {
    // this.er?.statusText
  }

  confirm(){
    this.choice = true;
    this.bsModalRef.hide()
  }

}
