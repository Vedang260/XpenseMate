import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TextField, Box, MenuItem } from '@mui/material';
import {
  setCategoryFilter,
  setDateRangeFilter,
} from '../../redux/slices/expenseSlice';
import { RootState } from '../../redux/store';

export const FilterControls: React.FC = () => {
  const dispatch = useDispatch();
  const filters = useSelector((state: RootState) => state.expenses.filters);
  const categories = ['Food', 'Transportation', 'Entertainment', 'Bills', 'Other'];

  return (
    <Box sx={{ mb: 2, display: 'flex', gap: 2 }}>
      <TextField
        select
        label="Category"
        value={filters.category || ''}
        onChange={(e) =>
          dispatch(setCategoryFilter(e.target.value || undefined))
        }
        sx={{ minWidth: 150 }}
      >
        <MenuItem value="">All</MenuItem>
        {categories.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        type="date"
        label="Start Date"
        value={filters.dateRange?.start || ''}
        onChange={(e) =>
          dispatch(
            setDateRangeFilter({
              ...filters.dateRange,
              start: e.target.value,
            })
          )
        }
      />
      <TextField
        type="date"
        label="End Date"
        value={filters.dateRange?.end || ''}
        onChange={(e) =>
          dispatch(
            setDateRangeFilter({
              ...filters.dateRange,
              end: e.target.value,
            })
          )
        }
      />
    </Box>
  );
};