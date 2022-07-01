import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { DialogData } from 'src/app/shared/dialog/dialog-data.interface';
import { DialogService } from 'src/app/shared/dialog/dialog.service';
import { BookService } from '../../data-access/book.service';
import { BudgetItem } from '../../utils/budget-item.model';
import { BudgetType } from '../../utils/budget-types.enum';

@Component({
  selector: 'app-main-book',
  template: `    
      <div class="container mx-auto">        
        <net-budget></net-budget>
        <div class="lg:columns-2 columns-1">
          <budget-card [budgetCardType]="EXPENSE" [icon]="'attach_money'"></budget-card>
          <budget-card [budgetCardType]="INCOME" [icon]="'trending_up'"></budget-card>
        </div>
        <mat-tab-group mat-align-tabs="center">
          <mat-tab label="Expense">
            <expense-table [editItemCb]="editItem" [addItemCb]="addItem" [confirmDeleteCb]="openConfirmDeleteDialog"></expense-table>
          </mat-tab>
          <mat-tab label="Income">
            <income-table [editItemCb]="editItem" [addItemCb]="addItem" [confirmDeleteCb]="openConfirmDeleteDialog"></income-table>
          </mat-tab>          
        </mat-tab-group>        
      </div>

      <ng-template let-formSubmitCb="formCb" #addItemTemplate>
        <budget-form [formSubmitCb]="formSubmitCb"></budget-form>
      </ng-template>

      <ng-template let-formSubmitCb="formCb" let-budgetData="budgetData" #editItemTemplate>
        <budget-form [formSubmitCb]="formSubmitCb" [budgetData]="budgetData" ></budget-form>
      </ng-template>

      <ng-template let-budgetItem="budgetItem" let-budgetType="budgetType" #confirmDeleteTemplate>
        <budget-item-confirm-delete [budgetType]="budgetType" [budgetItem]="budgetItem"></budget-item-confirm-delete>
      </ng-template>
    
  `,
})
export class MainBookComponent implements OnInit {
  EXPENSE = BudgetType.EXPENSE;
  INCOME = BudgetType.INCOME;  

  @ViewChild('addItemTemplate') addItemTemplate: TemplateRef<any>;
  @ViewChild('editItemTemplate') editItemTemplate: TemplateRef<any>;
  @ViewChild('confirmDeleteTemplate') confirmDeleteTemplate: TemplateRef<any>;

  private DIALGUE_OPTIONS = { panelClass: 'modal-config', disableClose: false };

  constructor(public book: BookService, private dialog: DialogService) {
    this.addItem = this.addItem.bind(this);
    this.editItem = this.editItem.bind(this);
    this.openConfirmDeleteDialog = this.openConfirmDeleteDialog.bind(this);
  }

  ngOnInit(): void {}

  addItem(itemType: BudgetType) {
    const headerText =
      itemType === BudgetType.EXPENSE ? 'Add Expense Info' : 'Add Income Info';
    const dialogData: DialogData = {
      headerText: headerText,
      template: this.addItemTemplate,
      context: {
        formCb: (budgetItem: BudgetItem) =>
          this.book.addItem(budgetItem, itemType),
      },
    };

    this.dialog.openDialog(dialogData, this.DIALGUE_OPTIONS);
  }

  editItem(budgetItem: BudgetItem, itemType: BudgetType) {
    const headerText =
      itemType === BudgetType.EXPENSE
        ? 'Edit Expense Info'
        : 'Edit Income Info';

    const dialogData: DialogData = {
      headerText: headerText,
      template: this.editItemTemplate,
      context: {
        formCb: (budgetItem: BudgetItem) =>
          this.book.editItem(budgetItem, itemType),
        budgetData: budgetItem,
      },
    };

    this.dialog.openDialog(dialogData, this.DIALGUE_OPTIONS);
  }

  openConfirmDeleteDialog(budgetItem: BudgetItem, itemType: BudgetType) {
    const headerText = 'Confirm Record Delete';

    const dialogData: DialogData = {
      headerText: headerText,
      template: this.confirmDeleteTemplate,
      context: {
        budgetItem: budgetItem,
        budgetType: itemType,
      },
    };

    this.dialog.openDialog(dialogData, this.DIALGUE_OPTIONS);
  }
}
