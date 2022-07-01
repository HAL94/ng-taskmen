import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExpenseTableComponent } from './expense-table.component';
import { MatIconModule } from '@angular/material/icon';
import { TableModule } from 'src/app/shared/table/table.module';



@NgModule({
  declarations: [
    ExpenseTableComponent
  ],
  imports: [
    CommonModule,
    TableModule,
    MatIconModule
  ],
  exports: [ExpenseTableComponent]
})
export class ExpenseTableModule { }
