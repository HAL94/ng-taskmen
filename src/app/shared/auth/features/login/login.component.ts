import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '../../data-access/auth.service';

@Component({
  selector: 'app-login',
  template: `
    <form [formGroup]="form" class="form" (submit)="signIn()">
      <mat-form-field class="w-full">
        <mat-label>Email</mat-label>
        <input
          type="email"
          matInput
          formControlName="email"
          placeholder="email"
        />
        <mat-error *ngIf="form.controls['email'].hasError('email')"
          >Enter a valid email</mat-error
        >
      </mat-form-field>
      <mat-form-field class="w-full">
        <mat-label>Password</mat-label>
        <input
          type="password"
          matInput
          formControlName="password"
          placeholder="Password"
        />
        <mat-error *ngIf="form.controls['password'].hasError('minlength')"
          >Password is too short</mat-error
        >
      </mat-form-field>

      <button mat-raised-button color="accent" [disabled]="form.invalid">
        Sign In
      </button>
    </form>
  `,
  styles: [],
})
export class LoginComponent implements OnInit {
  form!: FormGroup;
  
  constructor(
    private auth: AuthService,
    private router: Router,
    private snackbar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.email]),
      password: new FormControl('', [Validators.minLength(6)]),
    })
  }

  signIn() {
    this.auth.signIn(this.form.value).subscribe({
      next: (val) => this.router.navigate(['/']),
      error: (error) => this.snackbar.open(error.message)
    });
  }
}
