import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoardsListComponent } from './boards-list.component';
import { BoardModule } from '../../ui/board/board.module';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { MatButtonModule } from '@angular/material/button';
import { DialogModule } from 'src/app/shared/dialog/dialog.module';
import { BoardTaskDialogModule } from '../../ui/board-dialog/board-task-dialog.module';



@NgModule({
  declarations: [
    BoardsListComponent
  ],
  imports: [
    CommonModule,
    BoardModule,
    DragDropModule,
    MatButtonModule,
    DialogModule,
    BoardTaskDialogModule
  ],
  exports: [BoardsListComponent]
})
export class BoardsListModule { }
