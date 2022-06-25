import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoardTaskDialogComponent } from './board-task-dialog.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatIconModule } from '@angular/material/icon';
import { BoardDeleteConfirmDialogComponent } from './board-delete-confirm-dialog.component';
import { AddBoardDialogComponent } from './add-board-dialog.component';



@NgModule({
  declarations: [
    BoardTaskDialogComponent,
    BoardDeleteConfirmDialogComponent,
    AddBoardDialogComponent
  ],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonToggleModule,
    MatIconModule,
    FormsModule,
  ],
  exports: [BoardTaskDialogComponent, 
    BoardDeleteConfirmDialogComponent,
    AddBoardDialogComponent]
})
export class BoardDialogModule { }
