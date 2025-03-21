import React from 'react';
import { useDispatch } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import { TextField, Button, Box, CircularProgress } from '@mui/material';
import { login } from '../../services/api';
import { setUser, setLoading } from '../../redux/slices/authSlice';
import { LoginCredentials } from '../../types/LoginCredentials';

export const LoginForm: React.FC = () => {
    const dispatch = useDispatch();
    const {
        control,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<LoginCredentials>({
        defaultValues: { email: '', password: '' },
    });

    const onSubmit = async (data: LoginCredentials) => {
        try {
            dispatch(setLoading(true));
            const user = await login(data);
            dispatch(setUser(user));
        } catch (error) {
            console.error('Login failed:', error);
        } finally {
            dispatch(setLoading(false));
        }
    };

    return (
        <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ maxWidth: 400, mx: 'auto', mt: 4 }}>
          <Controller
            name="email"
            control={control}
            rules={{ required: 'Email is required' }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Email"
                fullWidth
                margin="normal"
                error={!!errors.email}
                helperText={errors.email?.message}
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
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ mt: 2 }}
            disabled={isSubmitting}
          >
            {isSubmitting ? <CircularProgress size={24} /> : 'Login'}
          </Button>
        </Box>
    );
}