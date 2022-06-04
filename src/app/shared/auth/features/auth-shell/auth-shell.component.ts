import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-auth-shell',
  template: `    
    <router-outlet></router-outlet>    
  `,
  styles: [
  ]
})
export class AuthShellComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
