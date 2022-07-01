import { Component, Input, OnInit } from '@angular/core';
import { TableAction } from 'src/app/shared/table/table-action.interface';
import { BookService } from '../../data-access/book.service';
import { BudgetItem } from '../../utils/budget-item.model';
import { BudgetType } from '../../utils/budget-types.enum';

@Component({
  selector: 'income-table',
  template: `
    <ng-container *ngIf="book.income | async as income">
      <app-table
        [dataProperties]="budgetItemProperties"        
        [data]="income"
        [pageSizeOptions]="pageSizeOptions"
        [tableActions]="incomeTableActions"
        [execludedColumns]="excludes"
      >
        <div
          class="income-bg border rounded my-0 mx-4 p-4 shadow border-b-0 text-white"
        >
          <div class="flex flex-row items-center justify-between">
            <div class="flex flex-col items-center justify-center">
              <h3 class="text-2xl mb-3">Income Table</h3>
              <p class="text-sm">Add your list of income</p>
            </div>
            <button mat-icon-button type="button" (click)="addItemCb(INCOME)">
              <mat-icon>add</mat-icon>
            </button>
          </div>
        </div>
      </app-table>
    </ng-container>
  `,
  styles: [],
})
export class IncomeTableComponent implements OnInit {
  @Input() editItemCb: Function;
  @Input() confirmDeleteCb: Function;
  @Input() addItemCb: Function;

  budgetItemProperties = Object.keys(new BudgetItem());
  INCOME = BudgetType.INCOME;
  excludes = ['id'];
  pageSizeOptions = [2, 5, 10];

  incomeTableActions: TableAction[] = [
    {
      actionIcon: 'edit',
      actionCb: (budgetItem: BudgetItem) =>
        this.editItemCb(budgetItem, this.INCOME),
    },
    {
      actionIcon: 'delete',
      actionCb: (budgetItem: BudgetItem) => {
        this.confirmDeleteCb(budgetItem, this.INCOME);
      },
    },
  ];

  constructor(public book: BookService) {}

  ngOnInit(): void {}
}
