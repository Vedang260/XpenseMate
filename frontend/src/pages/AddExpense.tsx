import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Typography,
  TextField,
  Button,
  MenuItem,
  CircularProgress,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { addExpense } from "../services/expense/api";
import { setExpenses, setLoading } from "../redux/slices/expenseSlice";
import { RootState } from "../redux/store/store";
import { toastSuccess, toastError } from "../utils/toast";

// Categories with Emojis
const categories = [
  { name: "Food", emoji: "🍕" },
  { name: "Transport", emoji: "🚕" },
  { name: "Entertainment", emoji: "🎬" },
  { name: "Bills", emoji: "💡" },
  { name: "Other", emoji: "📌" },
];

// Payment Methods
const paymentMethods = ["Cash", "Credit Card", "Debit Card", "UPI", "Net Banking"];

const AddExpense: React.FC = () => {
  const [title, setTitle] = useState<string>("");  
  const [amount, setAmount] = useState<number | "">("");
  const [category, setCategory] = useState<string>("");
  const [paymentMethod, setPaymentMethod] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loading = useSelector((state: RootState) => state.expense.loading);
  const expenses = useSelector((state: RootState) => state.expense.expenses);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !amount || !category || !paymentMethod || !date) {
      toastError("Please fill all required fields.");
      return;
    }

    dispatch(setLoading(true));
    try {
      const newExpense = { title, amount, date, category, description, paymentMethod };
      const response = await addExpense(newExpense);
      if(response.data.success){
        dispatch(setExpenses([...expenses, response.data.expense]));
        toastSuccess("Expense added successfully!");
        navigate("/expenses");
      }
    } catch (error) {
      toastError("Failed to add expense.");
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <Box
      sx={{
        maxWidth: 500,
        mx: "auto",
        mt: 6,
        p: 3,
        borderRadius: 2,
        boxShadow: 4,
        bgcolor: "background.paper",
      }}
    >
      <Typography
        variant="h4"
        gutterBottom
        sx={{ fontWeight: 700, textAlign: "center", color: "primary.main" }}
      >
        Add Expense 💰
      </Typography>
      <Typography variant="body2" sx={{ textAlign: "center", mb: 3, color: "text.secondary" }}>
        Keep track of your expenses efficiently.
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Amount"
          type="number"
          fullWidth
          margin="normal"
          value={amount}
          onChange={(e) => setAmount(e.target.value ? parseFloat(e.target.value) : "")}
          required
          InputProps={{ inputProps: { min: 0 } }}
        />

        {/* Category Dropdown with Emojis */}
        <FormControl fullWidth margin="normal" required>
          <InputLabel>Category</InputLabel>
          <Select value={category} onChange={(e) => setCategory(e.target.value)}>
            {categories.map((cat) => (
              <MenuItem key={cat.name} value={cat.name}>
                {`${cat.emoji} ${cat.name}`}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Payment Method Dropdown */}
        <FormControl fullWidth margin="normal" required>
          <InputLabel>Payment Method</InputLabel>
          <Select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
            {paymentMethods.map((method) => (
              <MenuItem key={method} value={method}>
                {method}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          label="Date"
          type="date"
          fullWidth
          margin="normal"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
          InputLabelProps={{ shrink: true }}
        />

        <TextField
          label="Description (Optional)"
          fullWidth
          margin="normal"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          multiline
          rows={3}
        />

        <Button
          type="submit"
          variant="contained"
          fullWidth
          sx={{ mt: 3, py: 1.5, fontWeight: 600 }}
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : "Add Expense"}
        </Button>
      </form>
    </Box>
  );
};

export default AddExpense;