import { Component, Input, OnInit } from '@angular/core';
import { Board, Task } from '../../utils/board.model';

@Component({
  selector: 'app-board-task-dialog',
  template: `   
    <div class="overflow-hidden h-auto p-5 w-full flex flex-col justify-center items-start">
      <mat-form-field class="w-full">
        <textarea placeholder="Task description" matInput [(ngModel)]="description"></textarea>
      </mat-form-field>
      <br />
      <mat-button-toggle-group #group="matButtonToggleGroup" [(ngModel)]="label">
        <mat-button-toggle *ngFor="let opt of labelOptions" [value]="opt">
          <mat-icon [ngStyle]="{color: opt}" [ngClass]="opt">{{
            opt === 'gray' ? 'check_circle' : 'lens'              
          }}</mat-icon>
        </mat-button-toggle>
      </mat-button-toggle-group>

      <button mat-stroked-button (click)="onCreateOrUpdate()" [disabled]="description === null || description === ''">
        {{ taskIdx ? 'Update Task' : 'Add Task' }}
      </button>
    </div>
  `,
  styles: [
  ]
})
export class BoardTaskDialogComponent implements OnInit {  
  @Input() formCb: Function;
  @Input() board: Board;
  @Input() taskIdx: number;
  
  labelOptions = ['purple', 'blue', 'green', 'yellow', 'red', 'gray'];
  
  description: string;
  label;

  constructor() { }

  ngOnInit(): void {

    if (this.taskIdx >= 0) {
      this.description = this.board.tasks[this.taskIdx].description
      this.label = this.board.tasks[this.taskIdx].label;
    }
  }

  onCreateOrUpdate() {
    const newTask: Task = {
      description: this.description,
      label: this.label
    }
    this.formCb(newTask);
  }
}
