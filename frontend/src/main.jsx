import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import axios from 'axios';
import App from './App.jsx';
import './index.css';

// Configure global Axios request interceptor to automatically attach JWT authorization tokens
axios.interceptors.request.use(
  (config) => {
    // Dynamically rewrite localhost API base URL to production URL in hosting environment
    const prodApiUrl = import.meta.env.VITE_API_URL;
    if (prodApiUrl && config.url && config.url.startsWith('http://localhost:5000')) {
      config.url = config.url.replace('http://localhost:5000', prodApiUrl);
    }

    const token = localStorage.getItem('admin_token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
