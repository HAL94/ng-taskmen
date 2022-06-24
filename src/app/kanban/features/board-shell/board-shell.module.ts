import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoardShellComponent } from './board-shell.component';
import { RouterModule, Routes } from '@angular/router';
import { BoardsListModule } from '../../ui/boards-list/boards-list.module';

const routes: Routes = [
  { path: '', component: BoardShellComponent }
];


@NgModule({
  declarations: [
    BoardShellComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    BoardsListModule,
    CommonModule
  ]
})
export class BoardShellModule { }
