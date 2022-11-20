import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '../../data-access/auth.service';

@Component({
  selector: 'app-login',
  template: `
    <div class="container mx-auto px-6 py-3">
      <h1 class="text-[#333] text-3xl text-center my-3">Login</h1>
      <form [formGroup]="form" class="max-w-[500px] shadow-md p-5 mx-auto" (submit)="signIn()">
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
          <mat-error *ngIf="form.controls['email'].hasError('required')"
            >Enter your email</mat-error
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
          <mat-error *ngIf="form.controls['password'].hasError('required')"
            >Please enter your password</mat-error
          >
        </mat-form-field>

        <button mat-raised-button color="primary" [disabled]="form.invalid">
          Sign In
        </button>
      </form>
    </div>
  `,
  styles: [],
})
export class LoginComponent implements OnInit {
  form!: FormGroup;
  touchedFieldName: string;

  constructor(
    private auth: AuthService,
    private router: Router,
    private snackbar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    });
  }

  signIn() {
    const credentials = this.form.value;
    if (!credentials || !credentials.email || !credentials.password) {
      return;
    }
    this.auth.signIn(this.form.value).subscribe({
      next: (val) => this.router.navigate(['/']),
      error: (error) => this.snackbar.open(error.message),
    });
  }



}
