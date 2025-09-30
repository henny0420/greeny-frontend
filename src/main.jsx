import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/authContext'; // 1. Import AuthProvider
import App from './App.jsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider> {/* 2. Wrap App with the provider */}
        <App />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
);