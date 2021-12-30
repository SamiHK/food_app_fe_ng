import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-then-na',
  templateUrl: './then-na.component.html',
  styleUrls: ['./then-na.component.scss']
})
export class ThenNaComponent implements OnInit {

  @Input('content') content;

  constructor() { }

  ngOnInit(): void {
  }

}
