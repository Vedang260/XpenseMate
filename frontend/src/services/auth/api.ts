import axios from 'axios';
import { LoginCredentials } from '../../types/LoginCredentials';
import { User } from '../../types/User';

const API_URL = 'http://localhost:8000/';

const api = axios.create({
    baseURL: API_URL,
    headers: {
      'Content-Type': 'application/json',
    },
  });

export const setAuthToken = (token: string | undefined) => {
    if (token) {
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      delete api.defaults.headers.common['Authorization'];
    }
};

export const login = async (credentials: LoginCredentials): Promise<User> => {
    const response = await api.post('/auth/login', credentials);
    return response.data;
};


