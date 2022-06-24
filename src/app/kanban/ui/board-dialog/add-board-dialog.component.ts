import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-board-dialog',
  template: `    
    <mat-form-field class="w-full">
      <input placeholder="title" matInput [(ngModel)]="title" />
    </mat-form-field>
    <div mat-dialog-actions>
      <button mat-button cdkFocusInitial (click)="createCb(title)">Create</button>
    </div>
  `,
  styles: [],
})
export class AddBoardDialogComponent implements OnInit {
  @Input() createCb: Function;
  title: string;

  constructor() {}

  ngOnInit(): void {}
}
