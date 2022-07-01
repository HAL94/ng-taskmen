import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { MainBookComponent } from './book-shell.component';


import { NetBudgetModule } from '../../ui/net-budget.component';
import { BudgetFormModule } from '../../ui/budget-form.component';
import { BudgetCardModule } from '../../ui/budget-card.component';
import { BudgetItemConfirmDeleteModule } from '../../ui/budget-item-confirm-delete.component';
import { ExpenseTableModule } from '../expense-table/expense-table.module';
import { IncomeTableModule } from '../income-table/income-table.module';

import { MatTabsModule } from '@angular/material/tabs'; 

const routes: Routes = [
  { path: '', component: MainBookComponent }
]

@NgModule({
  declarations: [
    MainBookComponent
  ],
  imports: [
    CommonModule,    
    ReactiveFormsModule,
    ExpenseTableModule,
    IncomeTableModule,
    BudgetCardModule,
    BudgetFormModule,
    NetBudgetModule,
    BudgetItemConfirmDeleteModule,
    RouterModule.forChild(routes),
    MatTabsModule,
  ]
})
export class BookShellModule { }
