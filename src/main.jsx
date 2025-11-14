import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { MatrixProvider } from './context/MatrixContext';
import { ToastProvider } from './context/ToastContext';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter basename='/Discrete_Math_Project2/'>
      <ToastProvider>
        <MatrixProvider>
          <App />
        </MatrixProvider>
      </ToastProvider>
    </BrowserRouter>
  </React.StrictMode>
);