import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatFormComponent } from './chat-form.component';
import { FormsModule } from '@angular/forms';
import { FileUploadModule } from 'src/app/shared/file-upload/file-upload.module';
import { EmojiPickerModule } from 'src/app/shared/emoji-picker/emoji-picker.module';
import { MatIconModule } from '@angular/material/icon';



@NgModule({
  declarations: [
    ChatFormComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    FileUploadModule,
    EmojiPickerModule,
    MatIconModule
  ],
  exports: [ChatFormComponent]
})
export class ChatFormModule { }
