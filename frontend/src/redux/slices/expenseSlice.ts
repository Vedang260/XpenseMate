import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Expense } from '../../types/Expense';

interface ExpenseState {
  expenses: Expense[];
  filters: {
    category?: string;
    dateRange?: { start: string; end: string };
  };
  loading: boolean;
}

const initialState: ExpenseState = {
  expenses: [],
  filters: {},
  loading: false,
};

const expenseSlice = createSlice({
  name: 'expenses',
  initialState,
  reducers: {
    setExpenses: (state, action: PayloadAction<Expense[]>) => {
      state.expenses = action.payload;
    },
    addExpense: (state, action: PayloadAction<Expense>) => {
      state.expenses.push(action.payload);
    },
    setCategoryFilter: (state, action: PayloadAction<string | undefined>) => {
      state.filters.category = action.payload;
    },
    setDateRangeFilter: (
      state,
      action: PayloadAction<{ start: string; end: string } | undefined>
    ) => {
      state.filters.dateRange = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export const { setExpenses, addExpense, setCategoryFilter, setDateRangeFilter, setLoading } =
  expenseSlice.actions;
export default expenseSlice.reducer;