import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/shared/auth/data-access/auth.service';
import { ChatService } from '../../data-access/chat.service';

@Component({
  selector: 'app-chat-main',
  template: `
    <div class="grid grid-cols-4 bg-slate-300 h-[700px]">
      <div class="h-full flex flex-col justify-center items-center col-span-1 border-r">
        <ul *ngIf="peers$ | async as users" class="my-5 h-full w-full p-4">
          <li *ngFor="let user of users"
            (click)="startMessagingUser(user)"
            class="px-2 py-4 border-b w-full cursor-pointer hover:bg-gray-300"
          >
            <div>{{ user.displayName }}</div>
          </li>
        </ul>
      </div>
      <div class="h-full flex flex-col justify-center items-center col-span-3" *ngIf="(chat$ | async) as chatInfo">
        <div class="border-b h-4/5 flex flex-col w-full px-3 py-5">
          <span *ngFor="let msg of chatInfo?.messages" [ngClass]="msg.sender === auth.getCurrentUser()?.uid ? 'self-end' : 'self-start'">
            {{msg.message}}
          </span>
        </div>
        <div class="w-full">
          <form #chatTextForm="ngForm" (ngSubmit)="onSendMessage(chatTextForm, chatInfo.id)" class="flex flex-row justify-evenly items-center w-full">
            <mat-form-field class="w-4/5">
              <mat-label>Message</mat-label>
              <input name="message" ngModel type="text" matInput placeholder="Your message..be nice" />
            </mat-form-field>

            <button type="submit" mat-raised-button color="accent" [disabled]="chatTextForm.invalid" class="disabled:cursor-not-allowed">
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
    
  `,
  styles: [],
})
export class ChatMainComponent implements OnInit {
  peers$: Observable<any>;  
  chat$: Observable<any>;

  selectedUser: any;

  constructor(public auth: AuthService, public chat: ChatService) {}

  ngOnInit(): void {
    this.peers$ = this.chat.getUsersList();    
  }

  startMessagingUser(user: any) {
    this.chat$ = this.chat.getChat(user.uid);
    // this.chat$.subscribe(console.log);    
    this.selectedUser = user.uid;
  }

  onSendMessage(chatTextForm: NgForm, chatId: string) {
    console.log('submitting', chatTextForm.value);
    if (chatTextForm.value['message'] !== '') {
      const content = chatTextForm.value['message'];
      this.chat.sendMessage(content, this.selectedUser, chatId);
      chatTextForm.reset();
    }
  }
}
