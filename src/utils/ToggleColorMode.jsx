import { createTheme, ThemeProvider } from '@mui/material';
import React from 'react';

export const ColorModeContext = React.createContext();

export const ToggleColorMode = ({ children }) => {
  const [mode, setMode] = React.useState(localStorage.getItem('colorMode') || 'light');

  const toggleColorMode = () => {
    setMode((prevMode) => {
      const newMode = prevMode === 'light' ? 'dark' : 'light';
      localStorage.setItem('colorMode', newMode);
      return newMode;
    });
  };

  const theme = React.useMemo(() => createTheme({
    typography: {
      fontFamily: [
        'Plus Jakarta Sans',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
      ].join(','),
    },
    palette: {
      mode,
    },
  }), [mode]);

  return (
    <ColorModeContext.Provider value={{ mode, setMode, toggleColorMode }}>
      <ThemeProvider theme={theme}>
        {children}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default ToggleColorMode;
