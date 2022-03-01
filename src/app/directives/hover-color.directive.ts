import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appHoverColor]'
})
export class HoverColorDirective {

  constructor(private el: ElementRef) {
    // console.log(el)
  }

  @HostListener('mouseenter') onHover(){
    this.el.nativeElement.style.backgroundColor = 'yellow';
  }
}
