import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import { TextField, Button, MenuItem, Box, CircularProgress } from '@mui/material';
import { createExpense } from '../../services/api';
import { addExpense, setLoading } from '../../redux/slices/expenseSlice';
import { RootState } from '../../redux/store';
import { Expense } from '../../types/Expense';

export const ExpenseForm: React.FC<{ onSuccess?: () => void }> = ({ onSuccess }) => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);
  const loading = useSelector((state: RootState) => state.expenses.loading);
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Omit<Expense, 'id' | 'userId'>>({
    defaultValues: {
      amount: 0,
      category: '',
      date: new Date().toISOString().split('T')[0],
      description: '',
    },
  });

  const categories = ['Food', 'Transportation', 'Entertainment', 'Bills', 'Other'];

  const onSubmit = async (data: Omit<Expense, 'id' | 'userId'>) => {
    if (!user) return;
    try {
      dispatch(setLoading(true));
      const expense = await createExpense({ ...data, userId: user.id });
      dispatch(addExpense(expense));
      reset();
      onSuccess?.();
    } catch (error) {
      console.error('Failed to add expense:', error);
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 1 }}>
      <Controller
        name="amount"
        control={control}
        rules={{ required: 'Amount is required', min: 0.01 }}
        render={({ field }) => (
          <TextField
            {...field}
            type="number"
            label="Amount"
            fullWidth
            margin="normal"
            error={!!errors.amount}
            helperText={errors.amount?.message}
          />
        )}
      />
      <Controller
        name="category"
        control={control}
        rules={{ required: 'Category is required' }}
        render={({ field }) => (
          <TextField
            {...field}
            select
            label="Category"
            fullWidth
            margin="normal"
            error={!!errors.category}
            helperText={errors.category?.message}
          >
            {categories.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
        )}
      />
      <Controller
        name="date"
        control={control}
        rules={{ required: 'Date is required' }}
        render={({ field }) => (
          <TextField
            {...field}
            type="date"
            label="Date"
            fullWidth
            margin="normal"
            error={!!errors.date}
            helperText={errors.date?.message}
          />
        )}
      />
      <Controller
        name="description"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label="Description"
            fullWidth
            margin="normal"
            multiline
            rows={2}
          />
        )}
      />
      <Button type="submit" variant="contained" sx={{ mt: 2 }} disabled={loading}>
        {loading ? <CircularProgress size={24} /> : 'Add Expense'}
      </Button>
    </Box>
  );
};