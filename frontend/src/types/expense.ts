export interface BaseExpense {
    title: string;
    amount: number;
    date: string;
    category: string;
    description?: string;
    paymentMethod: string;
  }
  
  export interface Expense extends BaseExpense {
    id: number;
  }
  
  export type NewExpense = BaseExpense;

// Define the analytics response type
export interface AnalyticsData {
    dailyTotal: number; // Total for today
    weeklyTotal: number; // Total for this week
    monthlyTotal: number; // Total for this month
    yearlyTotal: number; // Total for this year
    categoryTotals: { category: string; total: number }[]; // { category: string, total: number }
    weeklyExpenses: { day: string; amount: number }[]; // e.g., [{ day: "Mon", amount: 50 }]
    yearlyExpenses: { month: string; amount: number }[]; // e.g., [{ month: "Jan", amount: 500 }]
  }