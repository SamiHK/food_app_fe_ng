import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-confirm-delete-modal',
  templateUrl: './confirm-delete-modal.component.html',
  styleUrls: ['./confirm-delete-modal.component.scss']
})
export class ConfirmDeleteModalComponent implements OnInit {

  title = 'Confirm Delete';
  message = 'Are you sure? Do you want to delete this permenantly?';
  confirm = false;

  constructor(public bsModalRef: BsModalRef) { }

  ngOnInit(): void {
  }

  yes(){
    this.confirm = true;
    this.bsModalRef.hide()
  }

}
