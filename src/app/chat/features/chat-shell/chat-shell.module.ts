import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatShellComponent } from './chat-shell.component';
import { RouterModule, Routes } from '@angular/router';

import { ChatUsersModule } from '../../ui/chat-users/chat-users.module';
import { ChatFormModule } from '../chat-form/chat-form.module';
import { ChatHeaderModule } from '../../ui/chat-header/chat-header.module';
import { ChatAreaModule } from '../chat-area/chat-area.module';
import { AutoScrollModule } from '../../utils/auto-scroll/auto-scroll.module';

const routes: Routes = [
  { path: '', component: ChatShellComponent }
]

@NgModule({
  declarations: [
    ChatShellComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    ChatUsersModule,    
    ChatFormModule,    
    ChatHeaderModule,
    ChatAreaModule,
    AutoScrollModule,
    CommonModule
  ]
})
export class ChatShellModule { }
