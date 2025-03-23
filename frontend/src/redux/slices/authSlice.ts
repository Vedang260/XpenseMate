import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthResponse, User } from "../../types/auth";

interface AuthState {
    user: User | null;
    token: string | null;
    loading: boolean;
}

const initialState: AuthState = {
    user: null,
    token: localStorage.getItem("token"),
    loading: false
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
      setCredentials: (state, action: PayloadAction<AuthResponse>) => {
        state.user = null;
        state.token = action.payload.token;
        localStorage.setItem("token", action.payload.token);
      },
      logout: (state) => {
        state.user = null;
        state.token = null;
        localStorage.removeItem("token");
      },
      setLoading: (state, action: PayloadAction<boolean>) => {
        state.loading = action.payload;
      },
    },
  });


  export const { setCredentials, logout, setLoading } = authSlice.actions;
  export default authSlice.reducer;