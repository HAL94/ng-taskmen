import { Component, Input, OnInit } from '@angular/core';
import { User } from '../../../shared/models/user';

import { combineLatest, combineLatestAll, concatMap, filter, map, Observable, of, switchMap, take } from 'rxjs';
import { ChatService } from '../../data-access/chat.service';

@Component({
  selector: 'chat-users',
  template: `
    <ul class="bg-white rounded-2xl" *ngIf="usersWithLastMsgs$ | async as userObjs; else noUsers">
      <li *ngFor="let user of userObjs.users; let i = index" (click)="onClick(user)" class="px-2 pt-4 pb-3 w-full cursor-pointer relative chat-peer mb-5">
        <div class="flex flex-row justify-start items-center relative">
          <div class="relative">
            <img [src]="user.photoURL" [alt]="user.displayName" width="50" height="50"/>
            <div class="w-3 h-3 rounded-full absolute right-1 bottom-0" [ngClass]="{'bg-[#34eb52]' : user.isOnline, 'bg-[#eb4034]': !user.isOnline }"></div>
          </div>
          <div class="flex flex-col justify-center items-start ml-3 mr-auto">
            <span class="text-[#5a5a5a]">{{ user.displayName }}</span>
            <span class="text-md text-[#a9a9a9] clamp-1">{{ userObjs.lastMsgs[i].lastMessage?.message }}</span>
          </div>
          <div class="flex flex-col justify-center items-center" *ngIf="userObjs?.lastMsgs[i]?.lastMessage as msg">
            <!-- <span class="text-[#5a5a5a] text-lg mr-5"> {{lastMessageDate(msg?.timestamp)}} </span> -->
            <span class="text-[#5a5a5a] text-sm mr-5"> {{lastMessageTimestamp(msg?.timestamp)}} </span>
          </div>
        </div>
      </li>
    </ul>
    <ng-template #noUsers>
      <p>No users in this space</p>
    </ng-template>
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
export class ChatUsersComponent implements OnInit {
  @Input() onClick: Function;

  usersWithLastMsgs$: Observable<any>;

  constructor(private chat: ChatService) {}

  ngOnInit(): void {
    // console.log('got users', this.users$);
    const users$ = this.chat.chatUsers$.asObservable();
    const lastMessages$ = users$.pipe(
      filter((result) => result.length > 0),
      take(1),
      map((users) => users.map((user: User) => this.chat.getLastMessage(user.uid).pipe(
        // tap((result) => console.log('anything', result)),
        switchMap(lastMessage => of({ lastMessage: lastMessage[user.uid] ? lastMessage[user.uid] : null }))
      ))),
      concatMap(userObj => userObj),
      combineLatestAll()
    );

    this.usersWithLastMsgs$ = combineLatest([lastMessages$, users$], (lastMsgs, users) => ({ lastMsgs, users }));
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
