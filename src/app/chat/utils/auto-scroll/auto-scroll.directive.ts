import { AfterViewInit, Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[autoScroll]'
})
export class AutoScrollDirective implements AfterViewInit {

  constructor(private element: ElementRef) { }

  ngAfterViewInit(): void {
    this.scrollToBottom();
  }

  scrollToBottom() {
    this.element.nativeElement.scrollTop = this.element.nativeElement.scrollHeight;
  }
  


}
