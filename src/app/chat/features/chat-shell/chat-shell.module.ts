import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatMainComponent } from './chat-main.component';
import { RouterModule, Routes } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';

const routes: Routes = [
  { path: '', component: ChatMainComponent }
]

@NgModule({
  declarations: [
    ChatMainComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    FormsModule,
    MatFormFieldModule,    
    MatInputModule,
    CommonModule
  ]
})
export class ChatShellModule { }
