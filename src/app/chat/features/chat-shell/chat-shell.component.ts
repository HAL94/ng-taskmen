import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';

import { combineLatest, Observable, Subscription } from 'rxjs';
import { AuthService } from 'src/app/shared/auth/data-access/auth.service';
import { ChatService } from '../../data-access/chat.service';
import { AutoScrollDirective } from '../../utils/auto-scroll/auto-scroll.directive';

@Component({
  selector: 'chat-shell',
  template: `
    <div class="grid grid-cols-4">
      <div class="flex flex-col justify-center items-center col-span-1">
        <chat-users [users$]="peers$" [onClick]="startMessagingUser" class="h-full w-full px-4 pt-0"></chat-users>
      </div>
      <div class="flex flex-col w-full justify-center items-center col-span-3 bg-white rounded-2xl h-full" *ngIf="chatInfo$ | async as chatInfo">
        <div class="w-full border-b border-[#F7F7F7] mx-3 px-3 py-3">
          <chat-header [displayName]="chatInfo.user.displayName" [photoURL]="chatInfo.user.photoURL"></chat-header>          
        </div>
        <div class="w-full h-[700px] overflow-y-auto scrollbar-thin" autoScroll>
          <chat-area [messages]="chatInfo.chat?.messages"></chat-area>
        </div>
        <div class="w-full">
          <chat-form [userId]="chatInfo.user.uid" [chatId]="chatInfo.chat?.id"></chat-form>          
        </div>        
      </div>
    </div>
  `,
  styles: [
    `
    `,
  ],
})
export class ChatShellComponent implements OnInit, OnDestroy {
  peers$: Observable<any>;
  chatInfo$: Observable<any>;
  subChat: Subscription;
  @ViewChild(AutoScrollDirective) scrollDirRef: AutoScrollDirective;

  constructor(public auth: AuthService, public chat: ChatService) {
    this.startMessagingUser = this.startMessagingUser.bind(this);
  }
  ngOnDestroy(): void {
    if (this.subChat) {
      this.subChat.unsubscribe();
    }
  }
  ngOnInit(): void {
    this.peers$ = this.chat.chatUsers$.asObservable();
  }

  startMessagingUser(user: any) {
    const chat$ = this.chat.getChat(user.uid);

    const clickedUser$ = this.chat.getUserInfo(user.uid);

    this.chatInfo$ = combineLatest([chat$, clickedUser$], (chat, user) => ({
      chat,
      user,
    }));

    this.subChat = chat$.subscribe(() => {
      if (this.scrollDirRef) {
        setTimeout(() => {
          this.scrollDirRef.scrollToBottom();
        }, 0)
      }
    })
    
    // this.chatInfo$.subscribe(console.log);
  }

}
