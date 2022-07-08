import { CommonModule } from '@angular/common';
import { Component, Input, NgModule, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { DialogService } from 'src/app/shared/dialog/dialog.service';
import { BookService } from '../data-access/book.service';
import { BudgetItem } from '../utils/budget-item.model';
import { BudgetType } from '../utils/budget-types.enum';

@Component({
  selector: 'budget-item-confirm-delete',
  template: `
    <p class="text-lg font-semibold my-5 text-center">
      Are you sure you want to delete the record 
      <span class="text-white bg-gray-400 p-1 rounded-xl">{{budgetItem.name}}</span> of type: <span [ngClass]="{'expense-bg': budgetItem.itemType === EXPENSE, 'income-bg': budgetItem.itemType === INCOME }" class="text-white p-1 rounded-xl">{{budgetTypeText}}</span>?
    </p>
    <div class="flex flex-row items-center justify-center">
      <button mat-stroked-button color="primary" type="button" class="!mx-1" (click)="confirmDelete()">Confirm</button>
      <button mat-stroked-button color="warn" type="button" class="!mx-1" (click)="dialog.closeDialog()">Cancel</button>
    </div>
  `,
  styles: [
  ]
})
export class BudgetItemConfirmDeleteComponent implements OnInit {
  @Input() budgetItem: BudgetItem;  
  budgetTypeText: string;
  readonly EXPENSE = BudgetType.EXPENSE;
  readonly INCOME = BudgetType.INCOME;

  constructor(private book: BookService, public dialog: DialogService) { }
  
  ngOnInit(): void {
    this.budgetTypeText = this.budgetItem.itemType === BudgetType.EXPENSE ? 'Expense' : 'Income';
  }

  confirmDelete() {
    this.book.deleteItem(this.budgetItem);
  }
}

@NgModule({
  declarations: [BudgetItemConfirmDeleteComponent],
  imports: [CommonModule, MatButtonModule],
  exports: [BudgetItemConfirmDeleteComponent]
})
export class BudgetItemConfirmDeleteModule {}