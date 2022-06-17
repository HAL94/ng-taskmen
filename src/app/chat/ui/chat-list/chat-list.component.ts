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
          <div class="relative">
            <img
              [src]="user.photoURL"
              [alt]="user.displayName"
              width="50"
              height="50"
            />
            <div class="w-3 h-3 rounded-full absolute right-1 bottom-0" [ngClass]="{'bg-[#34eb52]' : user.isOnline, 'bg-[#eb4034]': !user.isOnline }"></div>
          </div>
          <div class="flex flex-col justify-center items-start ml-3 mr-auto">
            <span class="text-[#5a5a5a]">{{ user.displayName }}</span>            
            <span *ngIf="user.lastMessage" class="text-md text-[#a9a9a9] clamp-1">{{ user.lastMessage.message }}</span>
          </div>
          <div class="flex flex-col justify-center items-center">
            <span class="text-[#5a5a5a] text-lg mr-5"> {{lastMessageDate(user.lastMessage.timestamp)}} </span>
            <span class="text-[#5a5a5a] text-sm mr-5"> {{lastMessageTimestamp(user.lastMessage.timestamp)}} </span>
          </div>
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
  lastMessageDate(timestamp: string | number) {
    if (!timestamp) return "";
    const date = new Date(timestamp);    
    const dateText = (date.getMonth() + 1) + "/" + date.getDate() + "/" + date.getFullYear();
    return dateText;
  }
  lastMessageTimestamp(timestamp: string | number) {
    if (!timestamp) return "";
    const date = new Date(timestamp);
    
    const hour = date.getHours();
    const minutes = date.getMinutes();

    return hour + ":" + minutes + " " + (hour >= 12 ? "PM" : "AM");
  }
}
