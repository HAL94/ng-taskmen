import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-emoji-picker',
  template: `
    <div class="relative">
      <button mat-icon-button aria-label="Emojis" type="button" (click)="toggleEmojiPicker('clicked on icon')">
        <mat-icon class="text-[#8b8e95]">sentiment_satisfied</mat-icon>
      </button>
  
      <div class="fixed inset-0 z-20" *ngIf="showEmojiPicker" (click)="toggleEmojiPicker('clicked on overlay')">
      </div>
      <emoji-mart
        [style]="style"
        set="google"        
        *ngIf="showEmojiPicker"  
        (emojiSelect)="addEmoji($event)"
        title="Pick your emoji…"
      ></emoji-mart>
    </div>
  `,
  styles: [],
})
export class EmojiPickerComponent implements OnInit {
  @Input() style: any = {
    width: '392px',
    position: 'absolute',
    bottom: '50px',
    right: 0,
    zIndex: 40
  };

  @Output() selectedEmoji = new EventEmitter<any>();

  showEmojiPicker = false;

  addEmoji(event) {
    console.log(`${event.emoji.native}`);
    const text = `${event.emoji.native}`;
    this.selectedEmoji.emit(text);
    this.showEmojiPicker = false;
  }

  toggleEmojiPicker(logMsg?: string) {
    console.log(logMsg);
    console.log(this.showEmojiPicker);
    this.showEmojiPicker = !this.showEmojiPicker;
  }

  constructor() {}

  ngOnInit(): void {}
}
