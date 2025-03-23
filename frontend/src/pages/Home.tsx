import React from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography, Button, Container, Grid, Card, CardContent } from "@mui/material";
import { styled } from "@mui/material/styles";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import SecurityIcon from "@mui/icons-material/Security";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";

// Hero Section Styling
const HeroContainer = styled(Box)(({ theme }) => ({
  height: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  textAlign: "center",
  background: "linear-gradient(135deg,rgb(235, 115, 219) 0%,rgb(114, 8, 104) 100%)",
  color: "#fff",
  padding: theme.spacing(6, 2),
}));

const ContentBox = styled(Box)(({ theme }) => ({
  maxWidth: "700px",
  padding: theme.spacing(4),
  backdropFilter: "blur(10px)",
  borderRadius: "15px",
  background: "rgba(255, 255, 255, 0.1)",
  boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.2)",
}));

const StyledButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(1),
  fontSize: "18px",
  fontWeight: "bold",
  padding: "12px 24px",
  borderRadius: "30px",
  transition: "0.3s ease-in-out",
  "&:hover": {
    transform: "scale(1.05)",
  },
}));

const ImageBox = styled(Box)(({ theme }) => ({
  width: "100%",
  maxWidth: "500px",
  margin: "0 auto",
  textAlign: "center",
  "& img": {
    width: "100%",
    maxWidth: "400px",
    height: "500px",
    animation: "float 3s ease-in-out infinite",
  },
  "@keyframes float": {
    "0%, 100%": { transform: "translateY(0)" },
    "50%": { transform: "translateY(-10px)" },
  },
}));

const FeatureCard = styled(Card)(({ theme }) => ({
  textAlign: "center",
  padding: theme.spacing(3),
  transition: "transform 0.3s ease-in-out",
  borderRadius: "15px",
  background: "#f8f9fa",
  "&:hover": {
    transform: "scale(1.05)",
    boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.15)",
  },
}));

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Box>
      {/* Hero Section */}
      <HeroContainer>
        <Container maxWidth="lg">
          <Box display="flex" flexDirection={{ xs: "column", md: "row" }} alignItems="center" justifyContent="center">
            {/* Left Side - Text Content */}
            <ContentBox>
              <Typography variant="h2" fontWeight="bold" sx={{ fontFamily: "'Poppins', sans-serif" }}>
                Take Control of Your <span style={{ color: "#FFD700" }}>Finances</span> 💰
              </Typography>
              <Typography variant="h6" sx={{ opacity: 0.9, mt: 2 }}>
                Track, analyze, and manage your expenses effortlessly with <b>XpenseMate</b>. Stay on top of your financial goals.
              </Typography>
              <Box mt={3}>
                <StyledButton
                  variant="contained"
                  color="secondary"
                  onClick={() => navigate("/login")}
                  sx={{ background: "#FFD700", color: "#333", "&:hover": { background: "#FFC107" } }}
                >
                  Get Started 🚀
                </StyledButton>
                <StyledButton
                  variant="outlined"
                  color="inherit"
                  onClick={() => navigate("/register")}
                  sx={{ borderColor: "#fff", color: "#fff", "&:hover": { background: "#fff", color: "#333" } }}
                >
                  Learn More 🔍
                </StyledButton>
              </Box>
            </ContentBox>

            {/* Right Side - Hero Illustration */}
            <ImageBox>
              <img src="/assets/images/main.jpg" alt="Finance Management Illustration" />
            </ImageBox>
          </Box>
        </Container>
      </HeroContainer>

      {/* Features Section */}
      <Container sx={{ py: 6 }}>
        <Typography variant="h4" gutterBottom sx={{ textAlign: "center", fontWeight: "bold" }}>
          Why Choose <span style={{ color: "#4CAF50" }}>XpenseMate?</span> 🤔
        </Typography>
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} sm={6} md={3}>
            <FeatureCard>
              <AttachMoneyIcon sx={{ fontSize: 40, color: "#4CAF50" }} />
              <CardContent>
                <Typography variant="h6" fontWeight="bold">
                  Expense Tracking
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Easily track your daily expenses in one place.
                </Typography>
              </CardContent>
            </FeatureCard>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <FeatureCard>
              <AnalyticsIcon sx={{ fontSize: 40, color: "#F57C00" }} />
              <CardContent>
                <Typography variant="h6" fontWeight="bold">
                  Real-time Analytics
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Gain valuable insights with interactive reports.
                </Typography>
              </CardContent>
            </FeatureCard>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <FeatureCard>
              <SecurityIcon sx={{ fontSize: 40, color: "#1976D2" }} />
              <CardContent>
                <Typography variant="h6" fontWeight="bold">
                  Secure & Safe
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Your financial data is encrypted and protected.
                </Typography>
              </CardContent>
            </FeatureCard>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <FeatureCard>
              <TrendingUpIcon sx={{ fontSize: 40, color: "#D32F2F" }} />
              <CardContent>
                <Typography variant="h6" fontWeight="bold">
                  Financial Growth
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Plan your expenses and improve financial health.
                </Typography>
              </CardContent>
            </FeatureCard>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Home;
