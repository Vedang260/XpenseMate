import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: { main: "#00796B" }, // Teal Blue for a modern & elegant touch
    secondary: { main: "#FFA726" }, // Soft Amber for contrast
    background: { 
      default: "#F0F4F8", // Light grayish-blue for a clean look
      paper: "#FFFFFF", // White background for cards and sections
    },
    text: {
      primary: "#263238", // Deep charcoal for readability
      secondary: "#546E7A", // Muted gray-blue for subtle text
    },
  },
  typography: {
    fontFamily: "Inter, sans-serif",
    h1: { fontSize: "2.2rem", fontWeight: 700 },
    h2: { fontSize: "1.8rem", fontWeight: 600 },
    body1: { fontSize: "1rem", lineHeight: 1.6 },
  },
  shape: {
    borderRadius: 12, // Slightly rounded corners for a soft, modern feel
  },
  transitions: {
    duration: {
      standard: 250, // Smoother animations
    },
  },
});

export default theme;
