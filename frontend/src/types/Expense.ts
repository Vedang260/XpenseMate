export interface Expense {
    id: string;
    title: string;
    amount: number;
    category: string;
    description? : string;
    date: string;
    paymentMethod: string;
}
  