// src/components/ExpenseList.tsx
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  MenuItem,
  CircularProgress,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { fetchExpenses, updateExpense as updateExpenseAPI, deleteExpense as deleteExpenseAPI } from "../services/expense/api";
import { setExpenses, setLoading, updateExpense, deleteExpense as deleteExpenseAction } from "../redux/slices/expenseSlice";
import { RootState } from "../redux/store/store";
import { Expense } from "../types/expense";
import { toastError, toastSuccess } from "../utils/toast";

const categories = [
    { name: "Food", emoji: "🍕" },
    { name: "Travel", emoji: "✈️" },
    { name: "Entertainment", emoji: "🎬" },
    { name: "Shopping", emoji: "🛍️" },
    { name: "Rent", emoji: "🏠" },
    { name: "Grocery", emoji: "🫛" },
    { name: "Medical", emoji: "💊" },
    { name: "Fuel", emoji: "⛽" },
    { name: "Personal Care", emoji: "😄" },
    { name: "Others", emoji: "📦" },
  ];

const ExpenseList: React.FC = () => {
  const dispatch = useDispatch();
  const { expenses, loading } = useSelector((state: RootState) => state.expense);
  const [filterCategory, setFilterCategory] = useState<string>("All");
  const [filterDate, setFilterDate] = useState<string>("");
  const [editExpense, setEditExpense] = useState<Expense | null>(null);

  useEffect(() => {
    const loadExpenses = async () => {
      dispatch(setLoading(true));
      try {
        const response = await fetchExpenses(); // Uses api.get('/expenses') with token
        if(response.data.success){
            dispatch(setExpenses(response.data.expenses));
            toastSuccess(response.data.message);
        }else{
            toastError(response.data.message);
        }
      } catch (error) {
        console.error("Failed to fetch expenses", error);
        toastError('Failed to fetch the expenses');
      } finally {
        dispatch(setLoading(false));
      }
    };
    loadExpenses();
  }, [dispatch]);

  const handleDelete = async (id: number) => {
    dispatch(setLoading(true));
    try {
      const response = await deleteExpenseAPI(id); // Uses api.delete('/expenses/:id') with token
      if(response.data.success){
        dispatch(deleteExpenseAction(id));
        toastSuccess(response.data.message);
      }else{
        toastError(response.data.message);
      }
    } catch (error) {
      console.error("Failed to delete expense", error);
      toastError('Failed to delete the expense');
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleUpdate = async () => {
    if (!editExpense) return;
    dispatch(setLoading(true));
    try {
      const response = await updateExpenseAPI({
        id: editExpense.id,
        title: editExpense.title,
        amount: editExpense.amount,
        category: editExpense.category,
        date: editExpense.date,
        description: editExpense.description,
        paymentMethod: editExpense.paymentMethod
      }, editExpense.id ); // Uses api.put('/expenses/:id') with token
      if(response.data.success){
        dispatch(updateExpense(response.data));
        setEditExpense(null);
        toastSuccess(response.data.message);
      }else{
        toastError(response.data.message);
      }
    } catch (error) {
      console.error("Failed to update expense", error);
      toastError('Failed to update the Expense');
    } finally {
      dispatch(setLoading(false));
    }
  };

  const filteredExpenses = expenses.filter((expense: Expense) => {
    const matchesCategory = filterCategory === "All" || expense.category === filterCategory;
    const matchesDate = !filterDate || expense.date.startsWith(filterDate);
    return matchesCategory && matchesDate;
  });

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>Your Expenses</Typography>
      <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
        <TextField
          select
          label="Filter by Category"
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          sx={{ minWidth: 200 }}
        >
          {categories.map((cat) => (
            <MenuItem key={cat.name} value={cat.name}>{`${cat.emoji} ${cat.name}`}</MenuItem>
          ))}
        </TextField>
        <TextField
          label="Filter by Date"
          type="date"
          value={filterDate}
          onChange={(e) => setFilterDate(e.target.value)}
          InputLabelProps={{ shrink: true }}
        />
      </Box>
      {loading ? (
        <CircularProgress />
      ) : (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredExpenses.length > 0 ? (
              filteredExpenses.map((expense: Expense) => (
                <TableRow key={expense.id}>
                  <TableCell>{expense.title}</TableCell>
                  <TableCell>{expense.date}</TableCell>
                  <TableCell>{expense.category}</TableCell>
                  <TableCell>{expense.amount}</TableCell>
                  <TableCell>{expense.description || "-"}</TableCell>
                  <TableCell>
                    <Button onClick={() => setEditExpense(expense)}>Edit</Button>
                    <Button onClick={() => handleDelete(expense.id)}></Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow><TableCell colSpan={5} align="center">No expenses found.</TableCell></TableRow>
            )}
          </TableBody>
        </Table>
      )}

      <Dialog open={!!editExpense} onClose={() => setEditExpense(null)}>
        <DialogTitle>Edit Expense</DialogTitle>
        <DialogContent>
          {editExpense && (
            <>
              <TextField
                label="Amount"
                type="number"
                fullWidth
                margin="normal"
                value={editExpense.amount}
                onChange={(e) => setEditExpense({ ...editExpense, amount: parseFloat(e.target.value) })}
              />
              <TextField
  select
  label="Category"
  fullWidth
  margin="normal"
  value={editExpense.category}
  onChange={(e) => setEditExpense({ ...editExpense, category: e.target.value })}
>
  {categories.map((cat) => (
    <MenuItem key={cat.name} value={cat.name}>
      {`${cat.emoji} ${cat.name}`}
    </MenuItem>
  ))}
</TextField>

              <TextField
                label="Date"
                type="date"
                fullWidth
                margin="normal"
                value={editExpense.date}
                onChange={(e) => setEditExpense({ ...editExpense, date: e.target.value })}
                InputLabelProps={{ shrink: true }}
              />
              <TextField
                label="Description"
                fullWidth
                margin="normal"
                value={editExpense.description || ""}
                onChange={(e) => setEditExpense({ ...editExpense, description: e.target.value })}
                multiline
                rows={3}
              />
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditExpense(null)}>Cancel</Button>
          <Button onClick={handleUpdate} disabled={loading}>Save</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ExpenseList;