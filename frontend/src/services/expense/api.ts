import axios from "axios";
import { Expense, NewExpense } from "../../types/expense";

const api = axios.create({
    baseURL: "http://localhost:8000/api",
    headers: {
        "Content-Type": "application/json",
    },
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if(token){
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export const addExpense = async (expense: NewExpense) => api.post("/expenses", expense);
export const updateExpense = async (expense: NewExpense, id: number) => api.put(`/expenses/${id}`, expense);
export const deleteExpense = async (id: number) => api.delete(`/expenses/${id}`);

export default api;