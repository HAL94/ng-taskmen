import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './shared/auth/data-access/auth.service';
// .auth-area {
//   padding: 23px;
//   background: white;
//   border-radius: 10px;
// }

// .auth-area-content {
//   padding: 15px 0;
//   box-sizing: border-box;
// }

// .heading {
//   margin-bottom: 15px;
// }
@Component({
  selector: 'app-root',
  template: `
    <mat-toolbar color="primary">
      <span>Task Men</span>
      <span class="flex-auto"></span>
      <ng-container *ngIf="auth.isLoggedIn$ | async as user; else authButtons">
        <span class="mx-2">User {{ user?.displayName }} is logged in</span>
        <button mat-button (click)="signOut()">Sign Out</button>
      </ng-container>
    </mat-toolbar>

    <main class="content bg-main-bg">
      <router-outlet></router-outlet>
    </main>

    <ng-template #authButtons>
      <a routerLink="login" routerLinkActive="active" class="mx-2" mat-button>Login</a>
      <a routerLink="signup" routerLinkActive="active" class="mx-2" mat-button>Signup</a>
    </ng-template>
  `,
  styles: [`
    .content {
      min-height: calc(100vh - 64px);
      padding: 25px 15px;
      box-sizing: border-box;
    }
    .active {
      border: 1px solid white;
    }
  `],
})
export class AppComponent {
  constructor(public auth: AuthService, private router: Router) {}

  signOut() {
    this.auth.signOut().subscribe({
      next: () => this.router.navigate(['login'])
    });
  }
}
