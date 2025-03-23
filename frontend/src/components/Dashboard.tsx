// src/components/Dashboard.tsx
import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CircularProgress,
  Container,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { Pie, Bar, Line } from 'react-chartjs-2';
import { fetchAnalytics } from '../services/expense/api';
import { AnalyticsData } from '../types/expense';
import { toastError, toastSuccess } from '../utils/toast';

// Styled components for modern aesthetics
const DashboardCard = styled(Card)(({ theme }) => ({
  background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)',
  color: '#fff',
  borderRadius: '16px',
  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.2)',
  transition: 'transform 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-5px)',
  },
}));

const ChartContainer = styled(Box)(({ theme }) => ({
  background: '#fff',
  borderRadius: '16px',
  padding: theme.spacing(3),
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
  marginBottom: theme.spacing(4),
}));

const Dashboard: React.FC = () => {
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadAnalytics = async () => {
      setLoading(true);
      try {
        const response = await fetchAnalytics();
        if(response.data.success){
            setAnalytics(response.data.analytics);
            toastSuccess(response.data.message);
        }else{
            toastError(response.data.message);
        }
      } catch (error) {
        console.error('Failed to fetch analytics', error);
      } finally {
        setLoading(false);
      }
    };
    loadAnalytics();
  }, []);

  // Chart data preparation
  const pieData = analytics
    ? {
        labels: analytics.categoryTotals.map((cat) => cat.category),
        datasets: [
          {
            data: analytics.categoryTotals.map((cat) => cat.total),
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40', '#8BC34A', '#D32F2F'],
            hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40', '#8BC34A', '#D32F2F'],

          },
        ],
      }
    : { labels: [], datasets: [] };

  const barData = analytics
    ? {
        labels: analytics.weeklyExpenses.map((exp) => exp.day),
        datasets: [
          {
            label: 'Weekly Expenses',
            data: analytics.weeklyExpenses.map((exp) => exp.amount),
            backgroundColor: 'rgba(75, 192, 192, 0.6)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
          },
        ],
      }
    : { labels: [], datasets: [] };

  const lineData = analytics
    ? {
        labels: analytics.yearlyExpenses.map((exp) => exp.month),
        datasets: [
          {
            label: 'Yearly Expenses',
            data: analytics.yearlyExpenses.map((exp) => exp.amount),
            fill: false,
            borderColor: '#FF6384',
            tension: 0.4,
          },
        ],
      }
    : { labels: [], datasets: [] };

  const chartOptions = {
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          font: { size: 14 },
          color: '#333',
        },
      },
    },
  };

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      {/* <Typography
        variant="h3"
        gutterBottom
        sx={{
          fontWeight: 'bold',
          color: '#1e3c72',
          textAlign: 'center',
          mb: 4,
          textShadow: '1px 1px 2px rgba(0, 0, 0, 0.1)',
        }}
      >
        Expense Dashboard
      </Typography> */}

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 8 }}>
          <CircularProgress size={60} sx={{ color: '#2a5298' }} />
        </Box>
      ) : analytics ? (
        <Box>
          {/* Total Expense Cards */}
          <Grid container spacing={3} sx={{ mb: 6 }}>
            {[
              { title: 'Daily Total', value: analytics.dailyTotal },
              { title: 'Weekly Total', value: analytics.weeklyTotal },
              { title: 'Monthly Total', value: analytics.monthlyTotal },
              { title: 'Yearly Total', value: analytics.yearlyTotal },
            ].map((item) => (
              <Grid item xs={12} sm={6} md={3} key={item.title}>
                <DashboardCard>
                  <CardContent>
                    <Typography variant="h6" sx={{ fontWeight: 'medium', opacity: 0.9 }}>
                      {item.title}
                    </Typography>
                    <Typography variant="h4" sx={{ fontWeight: 'bold', mt: 1 }}>
                      ₹{Number(item.value).toFixed(2)}
                    </Typography>
                  </CardContent>
                </DashboardCard>
              </Grid>
            ))}
          </Grid>

          {/* Charts */}
          <Grid container spacing={3}>
            {/* Pie Chart: Category-wise % */}
            <Grid item xs={12} md={4}>
              <ChartContainer>
                <Typography variant="h6" sx={{ mb: 2, color: '#1e3c72', fontWeight: 'bold' }}>
                  Category-wise Expenses
                </Typography>
                <Box sx={{ height: '300px' }}>
                  <Pie data={pieData} options={{ ...chartOptions, responsive: true }} />
                </Box>
              </ChartContainer>
            </Grid>

            {/* Bar Chart: Weekly Expenses */}
            <Grid item xs={12} md={4}>
              <ChartContainer>
                <Typography variant="h6" sx={{ mb: 2, color: '#1e3c72', fontWeight: 'bold' }}>
                  Weekly Expenses
                </Typography>
                <Box sx={{ height: '300px' }}>
                  <Bar data={barData} options={{ ...chartOptions, responsive: true }} />
                </Box>
              </ChartContainer>
            </Grid>

            {/* Line Chart: Yearly Expenses */}
            <Grid item xs={12} md={4}>
              <ChartContainer>
                <Typography variant="h6" sx={{ mb: 2, color: '#1e3c72', fontWeight: 'bold' }}>
                  Yearly Expenses
                </Typography>
                <Box sx={{ height: '300px' }}>
                  <Line data={lineData} options={{ ...chartOptions, responsive: true }} />
                </Box>
              </ChartContainer>
            </Grid>
          </Grid>
        </Box>
      ) : (
        <Typography variant="h6" sx={{ textAlign: 'center', mt: 8, color: '#666' }}>
          No analytics data available.
        </Typography>
      )}
    </Container>
  );
};

export default Dashboard;