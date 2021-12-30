import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-input-error-helper',
  templateUrl: './input-error-helper.component.html',
  styleUrls: ['./input-error-helper.component.scss']
})
export class InputErrorHelperComponent implements OnInit {

  @Input('control') control: FormControl

  constructor() { }

  ngOnInit(): void {
  }

}
