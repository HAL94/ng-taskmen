import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './shared/auth/data-access/auth.service';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { MainAppService } from './main-app-shell/main-app.service';

@Component({
  selector: 'app-root',
  template: `
    <mat-toolbar class="border-b shadow-md">
      <button (click)="mainApp.toggleSidebar()" *ngIf="!(isTablet | async).matches" class="text-[#443c36] shadow-md !mr-3" mat-icon-button>
        <mat-icon>menu</mat-icon>
      </button>
      <span>
        <img src="../assets/app_logo.svg" width="150" height="150"/>
      </span>
      <span class="flex-auto"></span>
      <ng-container *ngIf="auth.isLoggedIn$ | async as user; else authButtons">
        <div class="flex flex-row justify-center items-center">
          <mat-icon aria-hidden="false" aria-label="User Icon"
            >account_circle</mat-icon
          >
          <div
            class="flex flex-col justify-start items-center mx-2 cursor-pointer"
          >
            <span class="text-sm mr-auto">Welcome</span>
            <span class="text-xs">{{ user?.displayName }}</span>
          </div>
        </div>

        <button class="!mx-6" mat-flat-button color="warn" (click)="signOut()">
          Sign Out
        </button>
      </ng-container>
    </mat-toolbar>

    <router-outlet></router-outlet>
    <ng-template #authButtons>
      <a routerLink="/auth/login" routerLinkActive="active" class="mx-2 " mat-button
        >Login</a
      >
      <a routerLink="/auth/signup" routerLinkActive="active" class="mx-2" mat-button
        >Signup</a
      >
    </ng-template>
  `,
  styles: [
    `
      .active {
        background: #443c36;
        color: #fff;
      }
    `,
  ],
})
export class AppComponent implements OnInit {
  isTablet: Observable<BreakpointState> = this.breakpointObserver.observe('(min-width: 991px)');

  constructor(
    public auth: AuthService,
    private router: Router,
    private breakpointObserver: BreakpointObserver,
    public mainApp: MainAppService) {}

  signOut() {
    this.auth.signOut().subscribe({
      next: () => this.router.navigate(['/auth/login']),
    });
  }

  ngOnInit(): void {

  }
}
