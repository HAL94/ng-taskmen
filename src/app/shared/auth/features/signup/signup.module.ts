import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignupComponent } from './signup.component';
import { RouterModule, Routes } from '@angular/router';
import materialImports from '../../utils/material.imports';
import { ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  { path: '', component: SignupComponent }
]


@NgModule({
  declarations: [
    SignupComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    CommonModule,
    ...materialImports
  ]
})
export class SignupModule { }
