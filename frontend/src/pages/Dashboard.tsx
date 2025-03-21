import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Grid,
  Paper,
  Typography,
  Button,
  Fade,
  CircularProgress,
} from '@mui/material';
import { ExpenseForm } from '../components/expenses/ExpenseForm';
import { ExpenseList } from '../components/expenses/ExpenseList';
import { FilterControls } from '../components/expenses/FilterControls';
import { RootState } from '../redux/store';
import { fetchExpenses } from '../services/api';
import { setExpenses, setLoading } from '../redux/slices/expenseSlice';

export const Dashboard: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state: RootState) => state.auth);
  const { expenses, loading } = useSelector((state: RootState) => state.expenses);
  const [showForm, setShowForm] = React.useState(false);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    const loadExpenses = async () => {
      try {
        dispatch(setLoading(true));
        const data = await fetchExpenses();
        dispatch(setExpenses(data));
      } catch (error) {
        console.error('Failed to fetch expenses:', error);
      } finally {
        dispatch(setLoading(false));
      }
    };
    loadExpenses();
  }, [user, dispatch, navigate]);

  const categoryTotals = expenses.reduce((acc, expense) => {
    acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
    return acc;
  }, {} as Record<string, number>);

  if (!user) return null;

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Fade in={true} timeout={500}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="h4" gutterBottom>
                Expense Dashboard
              </Typography>
              {user.role === 'admin' && (
                <Typography variant="subtitle1">
                  Admin View - All Expenses
                </Typography>
              )}
              <Button
                variant="contained"
                onClick={() => setShowForm(!showForm)}
                sx={{ mb: 2 }}
              >
                {showForm ? 'Hide Form' : 'Add Expense'}
              </Button>
            </Paper>
          </Grid>

          {showForm && (
            <Grid item xs={12}>
              <Fade in={showForm}>
                <Paper sx={{ p: 2 }}>
                  <ExpenseForm onSuccess={() => setShowForm(false)} />
                </Paper>
              </Fade>
            </Grid>
          )}

          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="h6">Summary by Category</Typography>
              {loading ? (
                <CircularProgress />
              ) : (
                Object.entries(categoryTotals).map(([category, total]) => (
                  <Typography key={category}>
                    {category}: ${total.toFixed(2)}
                  </Typography>
                ))
              )}
            </Paper>
          </Grid>

          <Grid item xs={12} md={8}>
            <Paper sx={{ p: 2 }}>
              <FilterControls />
              {loading ? <CircularProgress /> : <ExpenseList />}
            </Paper>
          </Grid>
        </Grid>
      </Fade>
    </Container>
  );
};