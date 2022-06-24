import { Component, Input, OnInit } from '@angular/core';
import { Board, Task } from '../../utils/board.model';

@Component({
  selector: 'app-board',
  template: `
    <div class="flex flex-col relative w-[300px] bg-white rounded hover:shadow-lg transition-shadow duration-200 ease-in p-3">
      <div class="absolute top-3 right-3 cursor-move">
        <mat-icon>drag_indicator</mat-icon>
      </div>
      <div class="flex flex-col items-start">
        <span class="text-lg text-slate-600 font-semibold">{{board.title}}</span>
        <span class="text-sm text-gray-600 font-normal">{{board.id}}</span>
      </div>
      <div class="flex flex-col w-full mt-3">
        <div *ngFor="let task of board.tasks; let idx = index;" class="my-1">
          <div (click)="openDialog('edit', idx)" class="p-4 cursor-pointer rounded" [ngClass]="task.label">{{task.description}}</div>
        </div>
        <div class="flex flex-row flex-wrap items-start justify-start my-4">
          <button mat-stroked-button (click)="openDialog('add')" class="mr-3">
            <mat-icon>add</mat-icon>
          </button>
          <button mat-button color="warn">
            <mat-icon>delete</mat-icon>
          </button>
        </div>
      </div>      
    </div>    
  `,
  styles: [
    `
      .blue { background: #0b81e8; color: white; }
      .green { background: #36e9b6; color: black;  }
      .yellow { background: #ffcf44; color: black; }
      .purple { background: #0a0a5b; color: white; }
      .red { background: #e74a4a; }
      .gray { background: gray; text-decoration: line-through; }
    `
  ]
})
export class BoardComponent implements OnInit {
  @Input() board: Board;
  @Input() onAddTask: Function;
  @Input() onEditTask: Function;

  constructor() { }

  ngOnInit(): void {
  }
  
  openDialog(mode: string, taskIdx?: number) {
    if (mode === 'add') {
      this.onAddTask(this.board);
    }
    else if (mode === 'edit') {
      this.onEditTask(this.board, taskIdx);
    }
  }
}
