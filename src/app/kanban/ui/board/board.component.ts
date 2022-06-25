import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, Input, OnInit } from '@angular/core';
import { KanbanService } from '../../data-access/kanban.service';
import { Board } from '../../utils/board.model';

@Component({
  selector: 'app-board',
  template: `
    <div class="flex flex-col relative w-[300px] bg-white rounded hover:shadow-lg transition-shadow duration-200 ease-in p-3">
      <div class="absolute top-3 right-3 cursor-move">
        <mat-icon cdkDragHandle>drag_indicator</mat-icon>
      </div>
      <div class="flex flex-col items-start">
        <span class="text-lg text-slate-600 font-semibold">{{board.title}}</span>
        <span class="text-sm text-gray-600 font-normal">{{board.id}}</span>
      </div>
      <div class="flex flex-col w-full mt-3" cdkDropList cdkDropListOrientation="vertical" (cdkDropListDropped)="taskDrop($event)">
        <div cdkDrag *ngFor="let task of board.tasks; let idx = index;" class="my-1">
          <div class="w-full group p-4 cursor-pointer rounded flex flex-row items-center justify-between" [ngClass]="task.label">
            <span>{{task.description}}</span>
            <div class="flex flex-row items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 ease-in">
              <mat-icon (click)="onDeleteTask(board, idx)">remove</mat-icon>
              <mat-icon (click)="onEditTask(board, idx)">edit</mat-icon>
            </div>
          </div>
        </div>
        <div class="flex flex-row flex-wrap items-start justify-start my-4">
          <button mat-stroked-button (click)="onAddTask(board)" class="mr-3">
            <mat-icon>add</mat-icon>
          </button>
          <button mat-button color="warn" (click)="onDeleteBoard(board)">
            <mat-icon>delete</mat-icon>
          </button>
        </div>
      </div>      
    </div>    
  `,
  styles: [
    `
      .blue { background: #0b81e8; color: white; }
      .green { background: #36e9b6; color: #333;  }
      .yellow { background: #ffcf44; color: #333; }
      .purple { background: #0a0a5b; color: white; }
      .red { background: #e74a4a; color: white; }
      .gray { background: gray; text-decoration: line-through; }

      .cdk-drag-animating {
        transition: transform 300ms ease;
      }
      
      .cdk-drop-list-dragging .cdk-drag {
        transition: transform 300ms ease;
      }

      .cdk-drag-placeholder {
        opacity: 0.5;
      }
    `
  ]
})
export class BoardComponent implements OnInit {
  @Input() board: Board;
  @Input() onAddTask: Function;
  @Input() onEditTask: Function;
  @Input() onDeleteTask: Function;
  @Input() onDeleteBoard: Function;


  constructor(public kanban: KanbanService) { }

  ngOnInit(): void {
  }

  taskDrop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.board.tasks, event.previousIndex, event.currentIndex);
    this.kanban.updateTasks(this.board.id, this.board.tasks);
  }
  
}
