import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmojiPickerComponent } from './emoji-picker.component';
import { PickerModule } from '@ctrl/ngx-emoji-mart';
import { EmojiModule } from '@ctrl/ngx-emoji-mart/ngx-emoji';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [
    EmojiPickerComponent
  ],
  imports: [
    PickerModule,
    EmojiModule,
    MatIconModule,
    CommonModule
  ],
  exports: [EmojiPickerComponent]
})
export class EmojiPickerModule { }
