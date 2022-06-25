import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { KanbanService } from '../../data-access/kanban.service';
import { Board } from '../../utils/board.model';

@Component({
  selector: 'app-board-shell',
  template: `    
    <div *ngIf="boards$ | async as boards" class="board-main w-full">
      <app-boards-list [boards]="boards"></app-boards-list>
    </div>
  `,
  styles: [
    `
      .board-main {
        height: 100%;
      }

      :host app-boards-list {
        height: 100%;
        display: block;
      }
    `
  ]
})
export class BoardShellComponent implements OnInit {
  boards$: Observable<Board[]>;

  constructor(public kanban: KanbanService) { }

  ngOnInit(): void {
    this.boards$ = this.kanban.getUserBoards();
  }

}
