import { Directive, ElementRef } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FormControlDirective, InputType } from '@coreui/angular';

@Directive({
  selector: '[appXFormInput]'
})
export class XFormInputDirective extends FormControlDirective {

  private _validControl?: FormControl | undefined;

  public get validControl(): FormControl | undefined {
    return this._validControl;
  }

  public set validControl(value: FormControl | undefined) {
    this._validControl = value;
    if(this._validControl?.errors){
      super.valid = true;
    }
  }

  constructor(hostElement: ElementRef) {
    super(hostElement);
  }
}
