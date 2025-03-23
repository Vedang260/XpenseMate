import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  Box,
  Typography,
  CircularProgress,
  Divider,
} from "@mui/material";
import { login } from "../services/auth/api";
import { setCredentials, setLoading } from "../redux/slices/authSlice";
import { toastSuccess, toastError } from "../utils/toast";
import { RootState } from "../redux/store/store";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loading = useSelector((state: RootState) => state.auth.loading);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(setLoading(true));
    try {
      const response = await login({ email, password });
      dispatch(setCredentials(response.data));
      toastSuccess("Login successful!");
      navigate("/dashboard");
    } catch (error) {
      toastError("Login failed. Please try again.");
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <Box
      sx={{
        maxWidth: 400,
        mx: "auto",
        mt: 8,
        p: 3,
        boxShadow: 3,
        borderRadius: 2,
        bgcolor: "background.paper",
      }}
    >
      <Typography
        variant="h4"
        gutterBottom
        sx={{ fontWeight: 700, textAlign: "center", color: "primary.main" }}
      >
        Welcome Back!
      </Typography>
      <Typography
        variant="body1"
        sx={{ textAlign: "center", color: "text.secondary", mb: 2 }}
      >
        Login to continue managing your expenses.
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Email"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <TextField
          label="Password"
          type="password"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Button
          type="submit"
          variant="contained"
          fullWidth
          sx={{ mt: 2, py: 1.5, fontWeight: 600 }}
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : "Login"}
        </Button>
      </form>
      
      <Divider sx={{ my: 2 }} />

      <Typography variant="body2" sx={{ textAlign: "center", mt: 1 }}>
        Don't have an account?{" "}
        <Typography
          component="span"
          sx={{ color: "primary.main", fontWeight: 600, cursor: "pointer" }}
          onClick={() => navigate("/register")}
        >
          Register
        </Typography>
      </Typography>
    </Box>
  );
};

export default Login;
