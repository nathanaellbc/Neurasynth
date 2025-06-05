import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import DarkApp from './DarkApp';
import './index.css';

const darkPath = window.location.pathname === '/dark';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {darkPath ? <DarkApp /> : <App onDarkModeToggle={() => { window.location.href = '/dark'; }} />}
  </StrictMode>
);