import { AfterViewChecked, AfterViewInit, Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[lastElement]'
})
export class LastElementDirective implements AfterViewInit {

  constructor(private element: ElementRef) { }

  ngAfterViewInit(): void {
    this.scrollToBottom();
  }

  scrollToBottom() {
    this.element.nativeElement.scrollTop = this.element.nativeElement.scrollHeight;
  }
  


}
