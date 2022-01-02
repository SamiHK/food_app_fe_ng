import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import { Directive, ElementRef, HostBinding, Input } from '@angular/core';
import { ButtonDirective, ButtonType, Colors, Shapes } from '@coreui/angular';

@Directive({
  selector: '[xcButton]',
  exportAs: 'xcButton'
})
export class XcButtonDirective extends ButtonDirective {

  constructor(private el: ElementRef) {
    super()
  }

  private _loadingLabel: string = '';
  @Input('loadingLabel')
  public get loadingLabel(): string {
    return this._loadingLabel;
  }
  public set loadingLabel(value: string) {
    this._loadingLabel = value;
  }

  private _loading: boolean = false;
  @Input('loading')
  public get loading(): boolean {
    return this._loading;
  }

  private content: any
  public set loading(value: boolean) {
    this._loading = value;
    // console.log(this.el)
    if(!this.content){
      this.content = this.el.nativeElement.innerHTML
    }
    if(this._loading){
      this.el.nativeElement.innerHTML = `<span class="spinner-border spinner-border-sm ng-star-inserted"></span> ${this.loadingLabel}`
    } else {
      this.el.nativeElement.innerHTML = this.content
    }
  }
 
}
