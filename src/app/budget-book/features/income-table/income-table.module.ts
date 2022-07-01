import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IncomeTableComponent } from './income-table.component';
import { TableModule } from 'src/app/shared/table/table.module';
import { MatIconModule } from '@angular/material/icon';



@NgModule({
  declarations: [
    IncomeTableComponent
  ],
  imports: [
    CommonModule,
    TableModule,
    MatIconModule
  ],
  exports: [IncomeTableComponent]
})
export class IncomeTableModule { }
