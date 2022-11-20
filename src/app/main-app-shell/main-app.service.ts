import { Injectable, EventEmitter } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class MainAppService {
  sidebarWatch: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor() { }

  toggleSidebar() {
    this.sidebarWatch.next(!this.sidebarWatch.getValue());
  }

  get sidebarOpened() {
    return this.sidebarWatch.asObservable();
  }
}
