import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthShellComponent } from './auth-shell.component';
import { RouterModule, Routes } from '@angular/router';
import { LoginModule } from '../login/login.module';
import { SignupModule } from '../signup/signup.module';
import { canActivate, redirectLoggedInTo } from '@angular/fire/auth-guard';

const routes: Routes = [
  {
    path: '',
    component: AuthShellComponent,
    children: [
      {
        path: 'login',
        loadChildren: () =>
          import('../login/login.module').then((m) => m.LoginModule),
        ...canActivate(() => redirectLoggedInTo(['/main'])),

      },
      {
        path: 'signup',
        loadChildren: () =>
          import('../signup/signup.module').then((m) => m.SignupModule),
        ...canActivate(() => redirectLoggedInTo(['/main'])),
      },
      { path: '', pathMatch: 'full', redirectTo: 'login' },
    ],
  },
];

@NgModule({
  declarations: [AuthShellComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    LoginModule,
    SignupModule,
  ],
})
export class AuthShellModule {}
