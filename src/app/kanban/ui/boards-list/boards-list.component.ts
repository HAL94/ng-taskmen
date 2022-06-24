import { Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { DialogData } from 'src/app/shared/dialog/dialog-data.interface';
import { DialogService } from 'src/app/shared/dialog/dialog.service';
import { KanbanService } from '../../data-access/kanban.service';
import { Board, Task } from '../../utils/board.model';

@Component({
  selector: 'app-boards-list',
  template: `  
    <div class="grid gap-3 grid-flow-col auto-cols-min w-auto p-3 mx-3 my-2 overflow-auto h-full scrollbar-thin">
      <app-board [onEditTask]="openEditTaskDialog" [onAddTask]="openAddTaskDialog" class="max-w-[300px] mx-3" *ngFor="let board of boards; let i = index;" [board]="board"></app-board>
      <div class="flex flex-col h-[350px] justify-center items-center border-dashed border-4 border-gray-500 p-8">
        <button mat-raised-button color="accent" cdkDragDisabled (click)="openBoardDialog()">
          New Board
        </button>
      </div>
    </div>
    <ng-template let-board="board" let-formCb="formCb" #addTaskTemplate>
      <app-board-task-dialog [board]="board" [formCb]="formCb"></app-board-task-dialog>
    </ng-template>
    <ng-template let-taskIdx="taskIdx" let-board="board" let-formCb="formCb" #editTaskTemplate>
      <app-board-task-dialog [taskIdx]="taskIdx" [board]="board" [formCb]="formCb"></app-board-task-dialog>
    </ng-template>
  `,
  styles: [
  ]
})
export class BoardsListComponent implements OnInit {
  @Input() boards: Board[];
  @ViewChild('addTaskTemplate') addTaskTemplate: TemplateRef<any>;
  @ViewChild('editTaskTemplate') editTaskTemplate: TemplateRef<any>;

  private DIALGUE_OPTIONS = { width: '50vw', disableClose: false };

  constructor(private kanban: KanbanService, private dialog: DialogService) {
    this.openAddTaskDialog = this.openAddTaskDialog.bind(this);
    this.openEditTaskDialog = this.openEditTaskDialog.bind(this);
  }

  ngOnInit(): void {
  }

  openBoardDialog() {
    console.log('adding new board here');
  }

  openAddTaskDialog(board: Board) {
    const dialogAddTaskData: DialogData = {
      headerText: 'Add a task',
      template: this.addTaskTemplate,
      context: {
        board: board,
        formCb: (boardEdited: Board, newTask: Task) => {
          boardEdited.tasks.push(newTask);
          this.kanban.updateTasks(boardEdited.id, boardEdited.tasks);
          this.dialog.closeDialog();
        },
      },
    };

    this.dialog.openDialog(dialogAddTaskData, this.DIALGUE_OPTIONS);
  }

  openEditTaskDialog(board: Board, taskIdx: number) {
    const dialogEditTaskData: DialogData = {
      headerText: `Edit ${board.tasks[taskIdx].description}`,
      template: this.editTaskTemplate,
      context: {
        board: board,
        taskIdx,
        formCb: (boardEdited: Board, newTask: Task) => {
          boardEdited.tasks[taskIdx] = {...newTask};
          this.kanban.updateTasks(boardEdited.id, boardEdited.tasks);
          this.dialog.closeDialog();
        },
      },
    };

    this.dialog.openDialog(dialogEditTaskData, this.DIALGUE_OPTIONS);
  }
}
