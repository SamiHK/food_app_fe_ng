import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-input-switch',
  templateUrl: './input-switch.component.html',
  styleUrls: ['./input-switch.component.scss']
})
export class InputSwitchComponent implements OnInit {

  @Input('isLoading') isLoading = false;
  @Input('id') id: any;
  @Input('status') status: boolean = false;
  @Input('label') label?: string;
  @Output('onChange') change = new EventEmitter<{
    id: any, status: boolean
  }>();

  constructor() { }

  ngOnInit(): void {
  }

  onChange(event: any){
    this.change.emit({
      id: this.id,
      status: this.status
    });
  }

}
