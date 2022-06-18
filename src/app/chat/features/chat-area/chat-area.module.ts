import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatAreaComponent } from './chat-area.component';
import { MyMessageModule } from '../../ui/my-message/my-message.module';
import { TheirMessageModule } from '../../ui/their-message/their-message.module';



@NgModule({
  declarations: [
    ChatAreaComponent,    
  ],
  imports: [
    MyMessageModule,
    TheirMessageModule,
    CommonModule
  ],
  exports: [ChatAreaComponent]
})
export class ChatAreaModule { }
