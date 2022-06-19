import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/auth/data-access/auth.service';

@Component({
  selector: 'chat-area',
  template: `
    <div class="flex flex-col w-full px-20 py-5">
      <ng-container *ngFor="let msg of messages">
        <app-my-message
          *ngIf="msg.sender === auth.user?.uid; else theirMessage"
          [message]="msg"
        ></app-my-message>
        <ng-template #theirMessage>
          <app-their-message [message]="msg"></app-their-message>
        </ng-template>
      </ng-container>
    </div>
  `
})
export class ChatAreaComponent implements OnInit {
  @Input() messages: any[];

  constructor(public auth: AuthService) {}

  ngOnInit(): void {}
}
