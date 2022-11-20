import { Component, OnInit, HostListener, ElementRef } from '@angular/core';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';

import { Observable } from 'rxjs';
import { MainAppService } from './main-app.service';


@Component({
  selector: 'app-main-app-shell',
  template: `
    <main class="content bg-main-bg">
      <mat-drawer-container class="h-[100vh] border-r shadow-md" [hasBackdrop]="!(isTablet | async).matches">
        <mat-drawer
          #drawer
          [mode]="!(isTablet | async).matches ? 'over' : 'side'"
          [opened]="(isTablet | async).matches || (mainApp.sidebarOpened | async)"

          class="text-gray-700 shadow-md bg-[#f5f5f5] min-w-[150px] px-4"
        >
          <mat-list class="mt-0 !pt-0">
            <mat-list-item
              (click)="mainApp.toggleSidebar()"
              routerLinkActive="active"
              routerLink="/main/chat"
              class="my-3 cursor-pointer group hover:bg-gray-700 rounded transition-[background] duration-200 ease-in-out"
            >
              <mat-icon matListItemIcon class="mr-4 group-hover:text-white"
                >chat</mat-icon
              >
              <div matListItemTitle class="group-hover:text-white">Chat</div>
            </mat-list-item>
            <!-- <mat-divider></mat-divider> -->
            <mat-list-item
              (click)="mainApp.toggleSidebar()"
              routerLinkActive="active"
              routerLink="/main/budget-book"
              class="my-3 cursor-pointer group hover:bg-gray-700 rounded transition-[background] duration-200 ease-in-out"
            >
              <mat-icon matListItemIcon class="mr-4  group-hover:text-white"
                >menu_book</mat-icon
              >
              <div matListItemTitle class=" group-hover:text-white">
                Budget Book
              </div>
            </mat-list-item>
            <!-- <mat-divider></mat-divider> -->
            <mat-list-item
              (click)="mainApp.toggleSidebar()"
              routerLinkActive="active"
              routerLink="/main/board"
              class="my-3 cursor-pointer group text-gray-500 hover:bg-gray-700 rounded transition-[background] duration-200 ease-in-out"
            >
              <mat-icon matListItemIcon class="mr-4 group-hover:text-white"
                >view_kanban</mat-icon
              >
              <div matListItemTitle class="group-hover:text-white">Tasks</div>
            </mat-list-item>
          </mat-list>
        </mat-drawer>
        <mat-drawer-content class="p-4 h-full">
          <router-outlet></router-outlet>
        </mat-drawer-content>
      </mat-drawer-container>
    </main>
  `,
  styles: [
    `
      .content {
        min-height: calc(100vh - 64px);
        height: auto;
        /* padding: 25px 15px; */
        box-sizing: border-box;
      }
      .active {
        background: #443c36;
        color: #fff;
      }

      :host ::ng-deep app-board-shell {
        height: 100%;
        display: block;
      }
    `,
  ],
})
export class MainAppShellComponent implements OnInit {
  isTablet: Observable<BreakpointState> = this.breakpointObserver.observe('(min-width: 991px)');

  constructor(private breakpointObserver: BreakpointObserver,
    public mainApp: MainAppService,
    private eRef: ElementRef) {}

  @HostListener('document:click', ['$event'])
  clickout($event) {
    const element = $event.target as HTMLDivElement;
    const isContained = this.eRef.nativeElement.contains($event.target);
    if (isContained && element.classList.contains('mat-drawer-backdrop')) {
      this.mainApp.toggleSidebar();
    }
  }

  ngOnInit(): void {
  }
}
