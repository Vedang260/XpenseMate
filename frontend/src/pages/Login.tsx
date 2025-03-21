import React from 'react';
import { useDispatch } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import { TextField, Button, Box, Typography, Fade, Container } from '@mui/material';
import { loginUser } from '../api/expenseApi';
import { setUser, setLoading } from '../redux/slices/authSlice';
import { useNavigate } from 'react-router-dom';

interface LoginForm {
  username: string;
  password: string;
}

export const Login: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { control, handleSubmit, formState: { errors } } = useForm<LoginForm>({
    defaultValues: { username: '', password: '' },
  });

  const onSubmit = async (data: LoginForm) => {
    try {
      dispatch(setLoading(true));
      const response = await loginUser(data);
      localStorage.setItem('token', response.data.token);
      dispatch(setUser(response.data.user));
      navigate('/dashboard');
    } catch (error) {
      console.error('Login failed:', error);
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <Container maxWidth="xs">
      <Fade in={true}>
        <Box sx={{ mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Typography variant="h4" gutterBottom>
            Login
          </Typography>
          <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 1 }}>
            <Controller
              name="username"
              control={control}
              rules={{ required: 'Username is required' }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Username"
                  fullWidth
                  margin="normal"
                  error={!!errors.username}
                  helperText={errors.username?.message}
                />
              )}
            />
            <Controller
              name="password"
              control={control}
              rules={{ required: 'Password is required' }}
              render={({ field }) => (
                <TextField
                  {...field}
                  type="password"
                  label="Password"
                  fullWidth
                  margin="normal"
                  error={!!errors.password}
                  helperText={errors.password?.message}
                />
              )}
            />
            <Button type="submit" variant="contained" fullWidth sx={{ mt: 3, mb: 2 }}>
              Login
            </Button>
          </Box>
        </Box>
      </Fade>
    </Container>
  );
};