import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import { AuthProvider } from './context/AuthContext.jsx';
import { QuizProvider } from './context/QuizContext.jsx';
import { seed } from './services/storageService.js';
import './styles/global.css';
import './styles/Navbar.css';
import './styles/Auth.css';
import './styles/Dashboard.css';
import './styles/Quiz.css';
import './styles/Admin.css';
import './styles/Results.css';

seed();
createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <QuizProvider>
          <App />
        </QuizProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
