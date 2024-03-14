// src/theme.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    button: {
      textTransform: 'none',
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
          borderRadius: '8px',
          margin: '20px 0',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          margin: '20px 0',
        },
      },
    },
  },
});

export default theme;
