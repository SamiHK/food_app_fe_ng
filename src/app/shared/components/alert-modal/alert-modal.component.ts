import { Component, Input, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-alert-modal',
  templateUrl: './alert-modal.component.html',
  styleUrls: ['./alert-modal.component.scss']
})
export class AlertModalComponent implements OnInit {

  @Input('alert') alert: {
    type: string,
    title: string,
    subtitle?: string,
    message: string
  }

  constructor(public bsModalRef: BsModalRef) { }

  ngOnInit(): void {
  }

}
