import {Directive, ElementRef, HostListener, Renderer2} from '@angular/core';

@Directive({
  selector: '[appOnHoverDirective]'
})
export class OnHoverDirective {

  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2) {}

  @HostListener('mouseenter')mouseover(){
    this.renderer.setStyle(this.elementRef.nativeElement, 'box-shadow', ' inset 0 0 0 2px lightgrey');
  }

  @HostListener('mouseleave') mouseleave(){
    this.renderer.setStyle(this.elementRef.nativeElement, 'box-shadow', ' inset 0 0 0 0 lightgrey');
  }

}
