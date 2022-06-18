import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'chat-header',
  template: `
    <div class="flex flex-row">
      <img
        [src]="photoURL"
        [alt]="displayName"
        width="50"
        height="50"
      />
      <div class="flex flex-col justify-center items-start self-center mx-4">
        <span class="text-xl text-[#5a5a5a]">{{
          displayName
        }}</span>
      </div>
    </div>
  `,
  styles: [],
})
export class ChatHeaderComponent implements OnInit {
  @Input() photoURL: string;
  @Input() displayName: string;

  constructor() {}

  ngOnInit(): void {}
}
