export interface BaseExpense {
    amount: number;
    date: string;
    category: string;
    description?: string;
    paymentMethod: string;
  }
  
  export interface Expense extends BaseExpense {
    id: number;
  }
  
  export type NewExpense = BaseExpense;