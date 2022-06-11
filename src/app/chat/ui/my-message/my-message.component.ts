import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-message',
  template: `
    <div class="flex flex-col items-end">
      <span id="message"
        class="my-1 py-3 px-3 relative rounded-tr-0 rounded-tl-[30px] rounded-br-[30px] rounded-bl-[30px] bg-[#248bf5] text-white"
      >
        {{ message.message }}
      </span>
      <div *ngIf="message.file">
        <div *ngIf="message.file.type.startsWith('image')">
          <img class="rounded-3xl" [src]="message.file.url" width="300" height="100" [alt]="message.file.name" />
        </div>
      </div>
      <span class="text-sm text-[#a9a9a9] mr-4 self-end">
        {{timeSent}}
      </span>

    </div>
  `,
  styles: [
    `
      #message:after {
        content: ' ';
        position: absolute;
        width: 0;
        height: 0;
        left: auto;
        right: -20px;
        top: 0px;
        bottom: auto;
        border: 20px solid;
        border-color: #248bf5 transparent transparent transparent;
      }
    `,
  ],
})
export class MyMessageComponent implements OnInit {
  @Input() message: any;
  timeSent: string;
  constructor() {}

  ngOnInit(): void {
    const date = new Date(this.message.timestamp);
    const hour = date.getHours();
    const minutes = date.getMinutes();
    this.timeSent = hour + ":" + minutes + " " + (hour >= 12 ? "PM" : "AM");
  }
}
