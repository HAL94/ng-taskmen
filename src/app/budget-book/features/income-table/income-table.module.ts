import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IncomeTableComponent } from './income-table.component';
import { TableModule } from 'src/app/shared/table/table.module';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';



@NgModule({
  declarations: [
    IncomeTableComponent
  ],
  imports: [
    CommonModule,
    TableModule,
    MatIconModule,
    MatButtonModule
  ],
  exports: [IncomeTableComponent]
})
export class IncomeTableModule { }
