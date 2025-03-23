import axios from "axios";
import { AuthResponse, LoginRequest, RegisterRequest } from "../../types/auth";

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

export const login = (data: LoginRequest) => api.post<AuthResponse>("/auth/login", data);
export const register = (data: RegisterRequest) => api.post<AuthResponse>("/auth/register", data);

export default api;