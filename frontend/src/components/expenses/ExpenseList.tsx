import React from 'react';
import { useSelector } from 'react-redux';
import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { RootState } from '../../redux/store';

export const ExpenseList: React.FC = () => {
  const { expenses, filters } = useSelector((state: RootState) => state.expenses);
  const user = useSelector((state: RootState) => state.auth.user);

  const filteredExpenses = expenses.filter((expense) => {
    if (user?.role !== 'admin' && expense.userId !== user?.id) return false;
    if (filters.category && expense.category !== filters.category) return false;
    if (filters.dateRange?.start && expense.date < filters.dateRange.start) return false;
    if (filters.dateRange?.end && expense.date > filters.dateRange.end) return false;
    return true;
  });

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Date</TableCell>
          <TableCell>Category</TableCell>
          <TableCell>Amount</TableCell>
          <TableCell>Description</TableCell>
          {user?.role === 'admin' && <TableCell>User ID</TableCell>}
        </TableRow>
      </TableHead>
      <TableBody>
        {filteredExpenses.map((expense) => (
          <TableRow
            key={expense.id}
            sx={{ '&:hover': { backgroundColor: '#f5f5f5', transition: '0.3s' } }}
          >
            <TableCell>{expense.date}</TableCell>
            <TableCell>{expense.category}</TableCell>
            <TableCell>${expense.amount.toFixed(2)}</TableCell>
            <TableCell>{expense.description}</TableCell>
            {user?.role === 'admin' && <TableCell>{expense.userId}</TableCell>}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};