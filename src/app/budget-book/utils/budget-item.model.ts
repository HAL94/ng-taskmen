import { BudgetType } from "./budget-types.enum";

export class BudgetItem {
    constructor(public uid?: string, public id?: string, public name?: string, public description?: string, public amount?: number, public itemType?: BudgetType) {}
}