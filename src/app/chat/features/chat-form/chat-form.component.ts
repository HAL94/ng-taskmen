import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { FileUploadService } from 'src/app/shared/file-upload/data-access/file-upload.service';
import { FilePreview } from 'src/app/shared/file-upload/utils/file-preview.interface';
import { ChatService } from '../../data-access/chat.service';

@Component({
  selector: 'chat-form',
  template: `
    <form
      #chatTextForm="ngForm"
      (ngSubmit)="onSendMessage(chatTextForm)"
      class="flex flex-row items-center w-full px-20 relative"
    >
      <div
        class="bg-transparent flex flex-row px-2 py-2 my-2 justify-end items-center min-w-0 flex-grow border rounded-3xl"
      >
        <div class="w-full">
          <input
            name="message"
            class="w-full outline-none pl-3 text-sm"
            ngModel
            [(ngModel)]="message"
            type="text"
            placeholder="Your message..be nice"
          />
          <app-file-preview
            *ngIf="filePreview$ | async as filePreview"
            [filePreview]="filePreview"
          >
          </app-file-preview>
        </div>

        <div class=" self-baseline flex flex-row">
          <app-emoji-picker
            class="mx-1"
            (selectedEmoji)="setMessage($event)"
          ></app-emoji-picker>
          <app-file-upload class="mx-1"></app-file-upload>
        </div>
      </div>
      <div class="ml-4">
        <button
          mat-icon-button
          aria-label="Send Message"
          type="submit"
          [disabled]="chatTextForm.invalid"
          class="disabled:cursor-not-allowed disabled:opacity-60"
        >
          <mat-icon class="text-[#8b8e95]">send</mat-icon>
        </button>
      </div>
    </form>
  `,
  styles: [],
})
export class ChatFormComponent implements OnInit {
  @Input() userId: string;
  @Input() chatId: string;

  filePreview$: Observable<FilePreview>;
  message: string;


  constructor(private upload: FileUploadService, private chat: ChatService) {}

  ngOnInit(): void {
    this.filePreview$ = this.upload.filePreview;
  }

  onSendMessage(chatTextForm: NgForm) {
    // console.log('submitting', chatTextForm.value);
    if (chatTextForm.value['message'] !== '') {
      const content = chatTextForm.value['message'];
      this.chat.sendMessage(content, this.userId, this.chatId);      
      chatTextForm.reset();      
    }
  }

  setMessage(emojiStr: string | any) {
    this.message = (this.message ? this.message : "") + emojiStr;
  }
}
