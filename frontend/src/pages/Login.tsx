import React from 'react';
import { Container, Paper, Typography, Fade } from '@mui/material';
import { LoginForm } from '../components/auth/LoginForm';

export const Login: React.FC = () => {
  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Fade in={true} timeout={500}>
        <Paper elevation={3} sx={{ p: 4 }}>
          <Typography variant="h4" gutterBottom align="center">
            Xpense Mate Login
          </Typography>
          <LoginForm />
        </Paper>
      </Fade>
    </Container>
  );
};