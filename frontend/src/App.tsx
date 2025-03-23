import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./styles/theme";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./components/Dashboard";
import Home from "./pages/Home";
import Navbar from "./components/navbar";
import AddExpense from "./pages/AddExpense";
import ExpenseList from "./pages/ExpenseList";

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/add-expense" element={<AddExpense />} />
          <Route path="/expenses" element={<ExpenseList />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
