import { CollectionViewer, DataSource } from "@angular/cdk/collections";
import { BehaviorSubject, Observable } from "rxjs";
import { BookService } from "../data-access/book.service";
import { BudgetItem } from "./budget-item.model";
import { BudgetType } from "./budget-types.enum";

export class BookDataSource implements DataSource<BudgetItem> {
    // private budgetItems$ = new BehaviorSubject<BudgetItem[]>([]);
    private loadingSubject = new BehaviorSubject<boolean>(false);
    public loading$ = this.loadingSubject.asObservable();
    
    constructor(private budgetItemType: BudgetType, private book: BookService) {}

    connect(collectionViewer: CollectionViewer): Observable<readonly BudgetItem[]> {
        return this.book.getBudgetItems(this.budgetItemType);
    }

    disconnect(collectionViewer: CollectionViewer): void {        
        this.loadingSubject.complete();
    }

}