import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoardTaskDialogComponent } from './board-task-dialog.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatIconModule } from '@angular/material/icon';



@NgModule({
  declarations: [
    BoardTaskDialogComponent
  ],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonToggleModule,
    MatIconModule,
    FormsModule,
  ],
  exports: [BoardTaskDialogComponent]
})
export class BoardTaskDialogModule { }
