import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '../../data-access/auth.service';

@Component({
  selector: 'app-signup',
  template: `
    <form [formGroup]="form" class="form" (submit)="signUp()">
      <mat-form-field class="w-full">
        <mat-label>Display Name</mat-label>
        <input
          type="text"
          matInput
          formControlName="displayName"
          placeholder="Display Name"
        />
        <mat-error *ngIf="form.controls['displayName'].hasError('minlength')"
          >Name is too short</mat-error
        >
      </mat-form-field>
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
        Create Account
      </button>
      <a routerLink="/login" class="mat-caption ml-4"
        >Already have an account? Go to signin</a
      >
    </form>
  `,
  styles: [],
})
export class SignupComponent implements OnInit {
  form!: FormGroup;

  constructor(
    private auth: AuthService,
    private router: Router,
    private snackbar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      displayName: new FormControl('', [Validators.minLength(3)]),
      email: new FormControl('', [Validators.email]),
      password: new FormControl('', [Validators.minLength(6)]),
    })
  }

  signUp() {
    this.auth.signUp(this.form.value).subscribe({
      next: () => this.router.navigate(['chat']),
      error: (error) => this.snackbar.open(error.message)
    });
  }
}
