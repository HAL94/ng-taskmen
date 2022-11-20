import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainAppShellComponent } from './main-app-shell.component';
import { RouterModule, Routes } from '@angular/router';
import { canActivate, redirectUnauthorizedTo } from '@angular/fire/auth-guard';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';

const routes: Routes = [
  {
    path: '',
    component: MainAppShellComponent,
    children: [
      {
        path: 'chat',
        ...canActivate(() => redirectUnauthorizedTo(['/auth'])),
        loadChildren: () =>
          import('../chat/features/chat-shell/chat-shell.module').then(
            (m) => m.ChatShellModule
          ),
      },

      {
        path: 'board',
        ...canActivate(() => redirectUnauthorizedTo(['login'])),
        loadChildren: () =>
          import('../kanban/features/board-shell/board-shell.module').then(
            (m) => m.BoardShellModule
          ),
      },

      {
        path: 'budget-book',
        ...canActivate(() => redirectUnauthorizedTo(['/auth'])),
        loadChildren: () =>
          import('../budget-book/features/book-shell/book-shell.module').then(
            (m) => m.BookShellModule
          ),
      },
      { path: '', pathMatch: 'full', redirectTo: 'budget-book'}

    ],
  },
];

@NgModule({
  declarations: [MainAppShellComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatSidenavModule,
    MatIconModule,
    MatButtonModule,
    MatListModule,
    MatDividerModule,
  ],
})
export class MainAppShellModule {}
