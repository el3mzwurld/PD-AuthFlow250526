import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#4C4FFE",
      light: "#6a64da",
      dark: "#26418F",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#F5F5f5",
      contrastText: "#1a1a1a",
    },
    background: {
      default: "#f8f9f8",
      paper: "#ffffff",
      authSide: "#e9edf7ec",
    },
    text: {
      primary: "#1a1a1a",
      secondary: "#6b7280",
      disabled: "#9ca3af",
    },
    error: {
      main: "#EF4444",
      light: "#f87171",
      dark: "#b91c1c",
      contrastText: "#ffffff",
    },
    success: {
      main: "#72A284",
      contrastText: "#ffffff",
    },
    divider: "#bfc6d4",
  },
  typography: {
    fontFamily: "'DM Sans', sans-serif",
    altFont: "'Bricolage Grotesque', sans-serif",
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 700,
    h1: { fontSize: "2.5rem", fontWeight: 700 },
    h2: { fontSize: "1.5rem", fontWeight: 600 },
    h3: { fontSize: "1.25rem", fontWeight: 600 },
    h4: { fontSize: "1rem", fontWeight: 600 },
    body1: { fontSize: "1rem", fontWeight: 400 },
    body2: { fontSize: "0.875rem", fontWeight: 400 },
    caption: { fontSize: "0.75rem", fontWeight: 400 },
    button: { fontSize: "0.875rem", fontWeight: 600, textTransform: "none" },
  },
  shape: {
    borderRadius: 4,
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1024,
      xl: 1500,
    },
  },
  components: {
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
      styleOverrides: {
        root: {
          borderRadius: 4,
          padding: "8px 20px",
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        size: "small",
        variant: "outlined",
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: "0px 1px 4px rgba(0,0,0,0.06)",
          borderRadius: 4,
        },
      },
    },
    MuiAppBar: {
      defaultProps: {
        elevation: 0,
      },
      styleOverrides: {
        root: {
          borderBottom: "1px solid #E5E7EB",
          backgroundColor: "#FFFFFF",
          color: "#1A1A1A",
        },
      },
    },
  },
});

export default theme;
