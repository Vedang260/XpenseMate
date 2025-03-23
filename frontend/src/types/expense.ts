export interface Expense {
    id: number;
    title: string;
    amount: number;
    date: string;
    category: string;
    description?: string;
    paymentMethod: string;
}

export interface ExpenseSate{
    expenses: Expense[];
    loading: boolean;
}