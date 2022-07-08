import { CommonModule } from '@angular/common';
import { Component, Input, NgModule, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { map, Observable } from 'rxjs';
import { BookService } from '../data-access/book.service';
import { BudgetType } from '../utils/budget-types.enum';

@Component({
  selector: 'budget-card',
  template: `
    <div class="p-5 bg-gray-100 shadow-md rounded lg:max-w-xs m-auto my-3">
      <div class="flex flex-row items-center justify-between">
        <div class="rounded p-3 text-white" [ngClass]="budgetCardType === BUDGET_TYPES.INCOME ? 'income-bg': 'expense-bg'">
          <mat-icon>{{icon}}</mat-icon>
        </div>
        <span class="text-sm text-[#999] font-medium">{{budgetTypeText}}</span>
      </div>
      <p class="text-right font-semibold">{{ budget$ | async }}</p>
    </div>
  `,
  styles: [
  ]
})
export class BudgetCardComponent implements OnInit {
  BUDGET_TYPES = BudgetType;
  @Input() budgetCardType: BudgetType;
  @Input() budgetTypeText: string;
  @Input() icon: string;
  
  budget$: Observable<number>;

  constructor(public book: BookService) { }

  ngOnInit(): void {
    const budgetObs = this.book.getBudgetItems(this.budgetCardType);

    this.budget$ = budgetObs.pipe(
      map((values) =>
        values.reduce(
          (accumlator, currentItem) => accumlator + currentItem['amount'],
          0
        )
      )
    );
  }
}

@NgModule({
  declarations: [BudgetCardComponent],
  imports: [MatIconModule, CommonModule],
  exports: [BudgetCardComponent]
})
export class BudgetCardModule {}


