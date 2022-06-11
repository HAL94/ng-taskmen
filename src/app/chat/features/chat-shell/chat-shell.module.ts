import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatMainComponent } from './chat-main.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ChatListModule } from '../../ui/chat-list/chat-list.module';
import { MyMessageModule } from '../../ui/my-message/my-message.module';
import { TheirMessageModule } from '../../ui/their-message/their-message.module';
import materialImports from './material.imports';
import { EmojiPickerModule } from 'src/app/shared/emoji-picker/emoji-picker.module';

const routes: Routes = [
  { path: '', component: ChatMainComponent }
]

@NgModule({
  declarations: [
    ChatMainComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    ChatListModule,
    MyMessageModule,
    TheirMessageModule,
    EmojiPickerModule,
    FormsModule,    
    CommonModule,
    ...materialImports
  ]
})
export class ChatShellModule { }
