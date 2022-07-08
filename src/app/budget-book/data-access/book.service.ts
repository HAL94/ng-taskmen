import { Injectable } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';
import { BudgetItem } from '../utils/budget-item.model';
import { BudgetType } from '../utils/budget-types.enum';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DialogService } from 'src/app/shared/dialog/dialog.service';
import {
  collection,
  collectionData,
  deleteDoc,
  doc,
  Firestore,
  onSnapshot,
  query,
  where,
} from '@angular/fire/firestore';
import { addDoc, updateDoc } from '@firebase/firestore';
import { AuthService } from 'src/app/shared/auth/data-access/auth.service';

@Injectable({
  providedIn: 'root',
})
export class BookService {  
  netBudget$ = new BehaviorSubject<number | string>(0);

  constructor(
    private snackbar: MatSnackBar,
    private dialog: DialogService,
    private fs: Firestore,
    private auth: AuthService
  ) {
    this.netBudget()
  }

  get expenses() {
    if (!this.auth.user) {
      return of(null);
    }
    const { uid } = this.auth.user;
    const booksRef = collection(this.fs, 'books');
    const userExpenseQuery = query(
      booksRef,
      where('uid', '==', uid),
      where('itemType', '==', BudgetType.EXPENSE)
    );
    return collectionData(userExpenseQuery);
  }

  get income() {
    if (!this.auth.user) {
      return of(null);
    }
    const { uid } = this.auth.user;

    const booksRef = collection(this.fs, 'books');
    const userExpenseQuery = query(
      booksRef,
      where('uid', '==', uid),
      where('itemType', '==', BudgetType.INCOME)
    );
    return collectionData(userExpenseQuery);
  }

  netBudget() {
    const { uid } = this.auth.user;
    const booksRef = collection(this.fs, 'books');
    const userBookQuery = query(booksRef, where('uid', '==', uid));
    const unSub = onSnapshot(userBookQuery, (qs) => {
      let currentBudget = 0;
      qs.forEach((doc) => {
        const item = doc.data() as BudgetItem;
        // console.log(item);
        if (item.itemType === BudgetType.EXPENSE) {
          currentBudget = currentBudget - item.amount;
        } else {
          currentBudget = currentBudget + item.amount;
        }
      });
      this.netBudget$.next(currentBudget);
    }, (error) => {
      unSub();
    });
  }

  getBudgetItems(itemType: BudgetType) {
    if (itemType === BudgetType.EXPENSE) {
      return this.expenses;
    }
    return this.income;
  }

  async addItem(item: BudgetItem) {
    const booksRef = collection(this.fs, 'books');
    const { uid } = this.auth.user;

    const createdBudgetItemRef = await addDoc(booksRef, {
      createdAt: Date.now(),
      uid: uid,
      id: null,
      ...item,
    });

    await updateDoc(createdBudgetItemRef, {
      id: createdBudgetItemRef.id,
    });

    // let budgetList = this.budgetItems$.getValue();
    // budgetList.push(item);
    // this.budgetItems$.next(budgetList);

    const snackbarMessage = `Added Item: ${item.name}`;
    this.dialog.closeDialog();
    this.snackbar.open(snackbarMessage, null, {
      duration: 2000,
      verticalPosition: 'top',
    });
  }

  async editItem(item: BudgetItem) {
    const budgetItemRef = doc(this.fs, `books/${item.id}`);
    await updateDoc(budgetItemRef, {
      ...item
    });
    const snackbarMessage = `Saved: ${item.name}`;
    this.dialog.closeDialog();
    this.snackbar.open(snackbarMessage, null, { duration: 2000, verticalPosition: 'top' });  
  }

  async deleteItem(item: BudgetItem) {
    const budgetItemRef = doc(this.fs, `books/${item.id}`);
    try {
      await deleteDoc(budgetItemRef);      
      const snackbarMessage = `Deleted: ${item.name}`;
      this.dialog.closeDialog();
      this.snackbar.open(snackbarMessage, null, { duration: 2000, verticalPosition: 'top' });      
    } catch (error) {
      this.snackbar.open('That failed, sorrt :(', null, { duration: 2000, verticalPosition: 'top' }); 
      console.log(error);
    }
  }
}
