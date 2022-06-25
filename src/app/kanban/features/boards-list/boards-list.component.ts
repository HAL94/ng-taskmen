import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { DialogData, DialogOptions } from 'src/app/shared/dialog/dialog-data.interface';
import { DialogService } from 'src/app/shared/dialog/dialog.service';
import { KanbanService } from '../../data-access/kanban.service';
import { Board, Task } from '../../utils/board.model';

@Component({
  selector: 'app-boards-list',
  template: `  
    <div cdkDropList cdkDropListOrientation="horizontal"
      (cdkDropListDropped)="drop($event)" 
      class="grid gap-3 grid-flow-col auto-cols-min w-auto p-3 overflow-x-auto h-full scrollbar-thin">
      
      <app-board cdkDrag [onDeleteBoard]="openDeleteBoardDialog" 
        [onDeleteTask]="openDeleteTaskDialog" 
        [onEditTask]="openEditTaskDialog" 
        [onAddTask]="openAddTaskDialog" 
        class="max-w-[300px] mx-3" 
        *ngFor="let board of boards; let i = index;" [board]="board">
      </app-board>

      <div class="flex flex-col h-[350px] justify-center items-center border-dashed border-4 border-gray-500 p-8">
        <button mat-raised-button color="accent" cdkDragDisabled (click)="openAddBoardDialog()">
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
    <ng-template let-confirmCb="confirmCb" #deleteTaskTemplate>
      <app-board-delete-confirm-dialog [confirmCb]="confirmCb"></app-board-delete-confirm-dialog>
    </ng-template>
    <ng-template let-confirmCb="confirmCb" #deleteBoardTemplate>
      <app-board-delete-confirm-dialog [confirmCb]="confirmCb"></app-board-delete-confirm-dialog>
    </ng-template>
    <ng-template let-createCb="createCb" #createBoardTemplate>
      <app-add-board-dialog [createCb]="createCb"></app-add-board-dialog>
    </ng-template>
  `,
  styles: [
    `
      .cdk-drag-placeholder {
        opacity: 0.2;
        width: 350px;
        border: 5px dashed gray;
        margin: 0 10px;
        
      }

      .boards.cdk-drop-list-dragging .cdk-drag {
        transition: transform 300ms ease;
      }


      .cdk-drag-animating {
        transition: transform 300ms ease;
      }
    `
  ]
})
export class BoardsListComponent implements OnInit {
  @Input() boards: Board[];
  @ViewChild('addTaskTemplate') addTaskTemplate: TemplateRef<any>;
  @ViewChild('editTaskTemplate') editTaskTemplate: TemplateRef<any>;
  @ViewChild('deleteTaskTemplate') deleteTaskTemplate: TemplateRef<any>;
  @ViewChild('deleteBoardTemplate') deleteBoardTemplate: TemplateRef<any>;
  @ViewChild('createBoardTemplate') createBoardTemplate: TemplateRef<any>;

  private DIALGUE_OPTIONS: DialogOptions = { panelClass: 'modal-config', disableClose: false };

  constructor(private kanban: KanbanService, private dialog: DialogService) {
    this.openAddTaskDialog = this.openAddTaskDialog.bind(this);
    this.openEditTaskDialog = this.openEditTaskDialog.bind(this);
    this.openDeleteTaskDialog = this.openDeleteTaskDialog.bind(this);
    this.openDeleteBoardDialog = this.openDeleteBoardDialog.bind(this);
  }

  ngOnInit(): void {
  }

  openAddTaskDialog(board: Board) {
    const dialogAddTaskData: DialogData = {
      headerText: 'Add a task',
      template: this.addTaskTemplate,
      context: {
        board: board,
        formCb: (newTask: Task) => {
          board.tasks.push(newTask);
          this.kanban.updateTasks(board.id, board.tasks);
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
        formCb: (newTask: Task) => {
          board.tasks[taskIdx] = {...newTask};
          this.kanban.updateTasks(board.id, board.tasks);
          this.dialog.closeDialog();
        },
      },
    };

    this.dialog.openDialog(dialogEditTaskData, this.DIALGUE_OPTIONS);
  }
  
  openDeleteTaskDialog(board: Board, taskIdx: number) {
    const dialogDeleteTaskData: DialogData = {
      headerText: `Are you sure you would like to delete the task ${board.tasks[taskIdx].description}`,
      template: this.deleteTaskTemplate,
      context: {        
        confirmCb: () => {
          board.tasks.splice(taskIdx, 1);
          this.kanban.updateTasks(board.id, board.tasks);
          this.dialog.closeDialog();
        },
      },
    };

    this.dialog.openDialog(dialogDeleteTaskData, this.DIALGUE_OPTIONS);
  }

  openDeleteBoardDialog(board: Board) {
    const dialogDeleteBoardData: DialogData = {
      headerText: `Are you sure you would like to delete the board ${board.title}`,
      template: this.deleteBoardTemplate,
      context: {        
        confirmCb: () => {          
          this.kanban.deleteBoard(board.id);
          this.dialog.closeDialog();
        },
      },
    };

    this.dialog.openDialog(dialogDeleteBoardData, this.DIALGUE_OPTIONS);
  }
  
  openAddBoardDialog() {
    const dialogAddBoardData: DialogData = {
      headerText: `What shall we call this board?`,
      template: this.createBoardTemplate,
      context: {        
        createCb: (title: string) => {          
          this.kanban.createBoard({ title, priority: this.boards.length });
          this.dialog.closeDialog();
        },
      },
    };

    this.dialog.openDialog(dialogAddBoardData, this.DIALGUE_OPTIONS);
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.boards, event.previousIndex, event.currentIndex);
    this.kanban.sortBoards(this.boards);
  }
}
