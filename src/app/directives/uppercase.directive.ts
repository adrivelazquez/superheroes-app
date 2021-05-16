import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[uppercase]'
})
export class UppercaseDirective {

  constructor(private el: ElementRef) {}

  @HostListener('input', ['$event']) onInput(event: any) {
    this.el.nativeElement.value = event.target.value.toUpperCase();
 }
}
