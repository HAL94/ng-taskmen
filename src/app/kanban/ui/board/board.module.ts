import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoardComponent } from './board.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { DragDropModule } from '@angular/cdk/drag-drop';



@NgModule({
  declarations: [
    BoardComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    DragDropModule,
    MatIconModule,
  ],
  exports: [BoardComponent]
})
export class BoardModule { }
