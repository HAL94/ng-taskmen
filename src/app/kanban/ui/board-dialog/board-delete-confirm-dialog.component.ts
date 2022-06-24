import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-board-delete-confirm-dialog',
  template: `
     <button mat-raised-button color="accent" (click)="confirmCb()">
      Confirm
    </button>
  `,
  styles: [
  ]
})
export class BoardDeleteConfirmDialogComponent implements OnInit {
  @Input() confirmCb: Function;
  
  constructor() { }

  ngOnInit(): void {
  }





}
