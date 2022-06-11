import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { combineLatest, combineLatestAll, Observable } from 'rxjs';
import { AuthService } from 'src/app/shared/auth/data-access/auth.service';
import { FileUploadService } from 'src/app/shared/file-upload/data-access/file-upload.service';
import { FilePreview } from 'src/app/shared/file-upload/utils/file-preview.interface';
import { ChatService } from '../../data-access/chat.service';

@Component({
  selector: 'app-chat-main',
  template: `
    <div class="grid grid-cols-4">
      <div class="flex flex-col justify-center items-center col-span-1">
        <app-chat-list
          [users]="peers$ | async"
          [onClick]="startMessagingUser"
          class="h-full w-full px-4 pt-0"
        ></app-chat-list>
      </div>
      <div
        class="flex flex-col justify-center items-center col-span-3 bg-white rounded-2xl h-full"
        *ngIf="chatInfo$ | async as chatInfo"
      >
        <div class="w-full border-b border-[#F7F7F7] mx-3 px-3 py-3">
          <div class="flex flex-row">
            <img
              [src]="chatInfo.user.photoURL"
              [alt]="chatInfo.user.displayName"
              width="50"
              height="50"
            />
            <div
              class="flex flex-col justify-center items-start self-center mx-4"
            >
              <span class="text-xl text-[#5a5a5a]">{{
                chatInfo.user.displayName
              }}</span>
              <span class="text-sm text-[#a9a9a9]">Last seen: 4:19 PM</span>
            </div>
          </div>
        </div>
        <div
          class="flex flex-col w-full px-20 py-5 h-[700px] overflow-y-auto"
          id="chat-area"
        >
          <ng-container *ngFor="let msg of chatInfo.chat?.messages">
            <app-my-message
              *ngIf="msg.sender === auth.user?.uid; else theirMessage"
              [message]="msg"
            ></app-my-message>
            <ng-template #theirMessage>
              <app-their-message [message]="msg"></app-their-message>
            </ng-template>
          </ng-container>
        </div>        
        <div class="w-full">
          <form
            #chatTextForm="ngForm"
            (ngSubmit)="
              onSendMessage(chatTextForm, chatInfo.user.uid, chatInfo.chat?.id)
            "
            class="flex flex-row items-center w-full px-20 relative"
          >
            <div class="bg-transparent flex flex-row px-2 py-2 my-2 justify-end items-center min-w-0 flex-grow border rounded-3xl">
              
              <div class="w-full">                
                <input name="message" class="w-full outline-none pl-3 text-sm" ngModel [(ngModel)]="message" type="text" placeholder="Your message..be nice" />
                <app-file-preview *ngIf="filePreview$ | async as filePreview" [filePreview]="filePreview">                  
                </app-file-preview>
              </div>
                
              <div class=" self-baseline flex flex-row">
                <app-emoji-picker class="mx-1" (selectedEmoji)="message = message + $event"></app-emoji-picker>
                <app-file-upload class="mx-1"></app-file-upload>
              </div>

            </div>
            <div class="ml-4">              
              <button mat-icon-button aria-label="Send Message" type="submit" [disabled]="chatTextForm.invalid" class="disabled:cursor-not-allowed">
                <mat-icon class="text-[#8b8e95]">send</mat-icon>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      ::-webkit-scrollbar {
        width: 6px;
      }
      ::-webkit-scrollbar-thumb {
        background-color: rgb(216, 216, 216);
        border-radius: 40px;
      }
      ::-webkit-scrollbar-track {
        background-color: transparent;
      }
    `,
  ],
})
export class ChatMainComponent implements OnInit {
  peers$: Observable<any>;
  chatInfo$: Observable<any>;  
  message = "";
  filePreview$: Observable<FilePreview>;
  

  constructor(public auth: AuthService, public chat: ChatService, private upload: FileUploadService) {
    this.startMessagingUser = this.startMessagingUser.bind(this);
  }

  ngOnInit(): void {
    this.peers$ = this.chat.getUsersList();
    this.filePreview$ = this.upload.filePreview;
  }

  startMessagingUser(user: any) {
    const chat$ = this.chat.getChat(user.uid);

    const clickedUser$ = this.chat.getUserInfo(user.uid);

    this.chatInfo$ = combineLatest(chat$, clickedUser$, (chat, user) => ({
      chat,
      user,
    }));

    this.chatInfo$.subscribe(console.log);
  }

  onSendMessage(chatTextForm: NgForm, thatUser: string, chatId: string) {
    console.log('submitting', chatTextForm.value);
    if (chatTextForm.value['message'] !== '') {
      const content = chatTextForm.value['message'];
      this.chat.sendMessage(content, thatUser, chatId);
      chatTextForm.reset();
    }
  }  
}
