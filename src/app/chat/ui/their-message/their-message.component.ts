import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-their-message',
  template: `
    <div class="flex flex-col items-start">
      <span id="message"
        class="text-green-500 relative bg-[#f5f7fb] my-1 py-3 px-3 rounded-tl-0 rounded-tr-[30px] rounded-br-[30px] rounded-bl-[30px]"
      >
        {{ message.message }}
      </span>
      <span class="text-sm text-[#a9a9a9] ml-4 self-start">{{ timeSent }}</span>
    </div>

  `,
  styles: [
    `
      #message:after {
        content: ' ';
        position: absolute;
        width: 0;
        height: 0;
        left: -20px;
        right: auto;
        top: 0px;
        bottom: auto;
        border: 22px solid;
        border-color: #f5f7fb transparent transparent transparent;
      }
    `,
  ],
})
export class TheirMessageComponent implements OnInit {
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
