import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-chat-list',
  template: `
    <ul *ngIf="users" class="bg-white rounded-2xl">
      <li
        *ngFor="let user of users"
        (click)="onClick(user)"
        class="px-2 pt-4 pb-3 w-full cursor-pointer relative chat-peer mb-5"
      >
        <div class="flex flex-row justify-start items-center relative">
          <div>
            <img
              [src]="user.photoURL"
              [alt]="user.displayName"
              width="50"
              height="50"
            />
          </div>
          <div class="flex flex-col justify-center items-start ml-3 mr-auto">
            <span class="text-[#5a5a5a]">{{ user.displayName }}</span>
            <span class="text-md text-[#a9a9a9]">Hi, How are you?</span>
          </div>
          <span class="text-[#5a5a5a] text-lg mr-5"> 9:00 </span>
        </div>
      </li>
    </ul>
  `,
  styles: [
    `
      .chat-peer::after {
        content: '';
        position: absolute;
        left: 45px;
        bottom: 0;
        height: 1px;
        width: 85%;
        border-bottom: 1px solid #F7F7F7;
        top: 93px;
      }

      .chat-peer:last-child::after {
        border-bottom: none;
      }
    `,
  ],
})
export class ChatListComponent implements OnInit {
  @Input() users: any[];
  @Input() onClick: Function;

  constructor() {}

  ngOnInit(): void {
  }
}
