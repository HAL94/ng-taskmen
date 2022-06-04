import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthShellComponent } from './auth-shell.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [  
  { path: 'login', loadChildren: () => import('../login/login.module').then(m => m.LoginModule)},
  { path: 'signup', loadChildren: () => import('../signup/signup.module').then(m => m.SignupModule)},
]

@NgModule({
  declarations: [
    AuthShellComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class AuthShellModule { }
