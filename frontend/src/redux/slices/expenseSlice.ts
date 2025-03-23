// src/features/expense/expenseSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Expense } from '../../types/expense';

interface ExpenseState {
  expenses: Expense[];
  loading: boolean;
}

const initialState: ExpenseState = {
  expenses: [],
  loading: false,
};

const expenseSlice = createSlice({
  name: 'expense',
  initialState,
  reducers: {
    setExpenses: (state, action: PayloadAction<Expense[]>) => {
      state.expenses = action.payload;
    },
    updateExpense: (state, action: PayloadAction<Expense>) => {
      const index = state.expenses.findIndex(exp => exp.id === action.payload.id);
      if (index !== -1) {
        state.expenses[index] = action.payload;
      }
    },
    deleteExpense: (state, action: PayloadAction<number>) => {
      state.expenses = state.expenses.filter(exp => exp.id !== action.payload);
    },
    // setAnalytics: (state, action: PayloadAction<{ categoryTotals: CategoryTotal[]; monthlyTotals: MonthlyTotal[] }>) => {
    //   state.categoryTotals = action.payload.categoryTotals;
    //   state.monthlyTotals = action.payload.monthlyTotals;
    // },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export const { setExpenses, updateExpense, deleteExpense, setLoading } = expenseSlice.actions;
export default expenseSlice.reducer;