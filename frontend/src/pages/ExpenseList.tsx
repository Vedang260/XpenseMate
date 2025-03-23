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
  TableContainer,
  Paper,
  TablePagination,
  IconButton,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
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

const paymentMethods = [
  { name: "Cash", emoji: "💵" },
  { name: "Card", emoji: "💳" },
  { name: "Online", emoji: "📱" },
];

const ExpenseList: React.FC = () => {
  const dispatch = useDispatch();
  const { expenses, loading } = useSelector((state: RootState) => state.expense);
  const [filterCategory, setFilterCategory] = useState<string>("All");
  const [filterDate, setFilterDate] = useState<string>("");
  const [editExpense, setEditExpense] = useState<Expense | null>(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    const loadExpenses = async () => {
      dispatch(setLoading(true));
      try {
        const response = await fetchExpenses();
        if (response.data.success) {
          dispatch(setExpenses(response.data.expenses));
          toastSuccess(response.data.message);
        } else {
          toastError(response.data.message);
        }
      } catch (error) {
        toastError("Failed to fetch expenses.");
      } finally {
        dispatch(setLoading(false));
      }
    };
    loadExpenses();
  }, [dispatch]);

  const handleDelete = async (id: number) => {
    dispatch(setLoading(true));
    try {
      const response = await deleteExpenseAPI(id);
      if (response.data.success) {
        dispatch(deleteExpenseAction(id));
        toastSuccess(response.data.message);
      } else {
        toastError(response.data.message);
      }
    } catch (error) {
      toastError("Failed to delete expense.");
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleUpdate = async () => {
    if (!editExpense) return;
    dispatch(setLoading(true));
    try {
      const response = await updateExpenseAPI(editExpense, editExpense.id);
      if (response.data.success) {
        dispatch(updateExpense(response.data));
        setEditExpense(null);
        toastSuccess(response.data.message);
      } else {
        toastError(response.data.message);
      }
    } catch (error) {
      toastError("Failed to update the expense.");
    } finally {
      dispatch(setLoading(false));
    }
  };

  const filteredExpenses = expenses.filter((expense: Expense) => {
    return (
      (filterCategory === "All" || expense.category === filterCategory) &&
      (!filterDate || expense.date.startsWith(filterDate))
    );
  });

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: "bold" }}>💰 Your Expenses</Typography>
      
      {/* Filters */}
      <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
        <TextField
          select
          label="Filter by Category"
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          sx={{ minWidth: 200 }}
        >
          <MenuItem value="All">🌍 All</MenuItem>
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
        <TableContainer component={Paper} sx={{ borderRadius: 3, boxShadow: 3 }}>
          <Table>
            <TableHead sx={{ bgcolor: "#32612D" }}>
              <TableRow>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Title</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Date</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Category</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Amount</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Payment Method</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredExpenses.length > 0 ? 
              (filteredExpenses.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((expense) => (
                <TableRow key={expense.id} sx={{ fontSize: 18, bgcolor: "#f9f9f9", "&:nth-of-type(even)": { bgcolor: "e3f2fd" } }}>
                  <TableCell>{expense.title}</TableCell>
                  <TableCell>{expense.date}</TableCell>
                  <TableCell>{categories.find(cat => cat.name === expense.category)?.emoji} {expense.category}</TableCell>
                  <TableCell>₹{expense.amount}</TableCell>
                  <TableCell>{paymentMethods.find(pm => pm.name === expense.paymentMethod)?.emoji} {expense.paymentMethod}</TableCell>
                  <TableCell>
                    <IconButton color="primary" onClick={() => setEditExpense(expense)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton color="error" onClick={() => handleDelete(expense.id)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))): (
                <TableRow><TableCell colSpan={5} align="center">No expenses found.</TableCell></TableRow>
              )}
            </TableBody>
          </Table>
          
          {/* Pagination */}
          <TablePagination
            component="div"
            count={filteredExpenses.length}
            page={page}
            rowsPerPage={rowsPerPage}
            onPageChange={(e, newPage) => setPage(newPage)}
            onRowsPerPageChange={(e) => setRowsPerPage(parseInt(e.target.value, 10))}
          />
        </TableContainer>
      )}
      <Dialog open={!!editExpense} onClose={() => setEditExpense(null)}>
        <DialogTitle>Edit Expense</DialogTitle>
        <DialogContent>
          {editExpense && (
            <>
            <TextField
                label="Title"
                type="string"
                fullWidth
                margin="normal"
                value={editExpense.title}
                onChange={(e) => setEditExpense({ ...editExpense, title: e.target.value })}
              />
              <TextField
                label="Amount"
                type="number"
                fullWidth
                margin="normal"
                value={editExpense.amount}
                onChange={(e) => setEditExpense({ ...editExpense, amount: parseInt(e.target.value) })}
              />
              <TextField
                select
                label="Category"
                fullWidth
                margin="normal"
                value={editExpense.category}
                onChange={(e) => setEditExpense({ ...editExpense, category: e.target.value })}
              >
                {categories.slice(1).map((cat) => (
                  <MenuItem key={cat.name} value={cat.name}>
                    {`${cat.emoji} ${cat.name}`}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                select
                label="PaymentMethod"
                fullWidth
                margin="normal"
                value={editExpense.paymentMethod}
                onChange={(e) => setEditExpense({ ...editExpense, paymentMethod: e.target.value })}
              >
                {paymentMethods.slice(1).map((method) => (
                  <MenuItem key={method.name} value={method.name}>
                    {`${method.emoji} ${method.name}`}
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
