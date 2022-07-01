import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { redirectLoggedInTo, canActivate, redirectUnauthorizedTo } from '@angular/fire/auth-guard';

const routes: Routes = [
   { path: 'login', loadChildren: () => import('./shared/auth/features/login/login.module').then(m => m.LoginModule),
   ...canActivate(() => redirectLoggedInTo(['chat']))},
  
   { path: 'signup', loadChildren: () => import('./shared/auth/features/signup/signup.module').then(m => m.SignupModule),
   ...canActivate(() => redirectLoggedInTo(['chat']))},

  { path: 'chat', ...canActivate(() => redirectUnauthorizedTo(['login'])),
   loadChildren: () => import('./chat/features/chat-shell/chat-shell.module').then(m => m.ChatShellModule)},
  
   { path: 'board', ...canActivate(() => redirectUnauthorizedTo(['login'])),
   loadChildren: () => import('./kanban/features/board-shell/board-shell.module').then(m => m.BoardShellModule)},

  
   { path: 'budget-book', ...canActivate(() => redirectUnauthorizedTo(['login'])),
   loadChildren: () => import('./budget-book/features/book-shell/book-shell.module').then(m => m.BookShellModule)},

  { path: '', pathMatch: 'full', redirectTo: 'chat'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
