import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { AuthProvider } from './context/AuthProvider';
import theme from './theme';
import './index.css'

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <StrictMode>
    <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
          <AuthProvider>
              <App /> 
          </AuthProvider>      
        </BrowserRouter>
    </ThemeProvider>
  </StrictMode>
);
