import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from "react-toastify";
import './index.css'
import App from './App.jsx';
import { AuthProvider } from './context/AuthContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />
        <ToastContainer 
          position='bottom-center'
          autoClose={3000}
          newestOnTop
          closeButton
          pauseOnHover
          draggable
          theme='dark'
        />
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)
