import React from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography, Button, Container, Fade } from "@mui/material";
import { styled } from "@mui/material/styles";

const HeroSection = styled(Box)(({ theme }) => ({
  background: "linear-gradient(135deg, #4CAF50 30%, #81C784 90%)",
  color: "#fff",
  padding: theme.spacing(8, 0),
  textAlign: "center",
  borderRadius: "0 0 20px 20px",
}));

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Fade in timeout={1000}>
      <Box>
        <HeroSection>
          <Container maxWidth="md">
            <Typography variant="h2" gutterBottom sx={{ fontWeight: "bold" }}>
              Welcome to XpenseMate
            </Typography>
            <Typography variant="h5" gutterBottom>
              Track, manage, and analyze your expenses with ease.
            </Typography>
            <Typography variant="body1" sx={{ mb: 4 }}>
              XpenseMate is your modern companion for financial clarity. Whether
              you're a user or an admin, take control of your spending with our
              intuitive dashboard and powerful tools.
            </Typography>
            <Box>
              <Button
                variant="contained"
                color="secondary"
                size="large"
                sx={{ mr: 2 }}
                onClick={() => navigate("/login")}
              >
                Login
              </Button>
              <Button
                variant="outlined"
                color="inherit"
                size="large"
                onClick={() => navigate("/register")}
              >
                Sign Up
              </Button>
            </Box>
          </Container>
        </HeroSection>
        <Container sx={{ py: 4 }}>
          <Typography variant="h4" gutterBottom>
            Why Choose XpenseMate?
          </Typography>
          <Typography variant="body1">
            - Beautiful, responsive design
            <br />
            - Real-time expense analytics
            <br />
            - Role-based access for users and admins
            <br />
            - Secure and easy-to-use interface
          </Typography>
        </Container>
      </Box>
    </Fade>
  );
};

export default Home;