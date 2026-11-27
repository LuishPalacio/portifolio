import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
// Fontes hospedadas no próprio site (sem request a serviços externos).
import '@fontsource-variable/geist/index.css';
import '@fontsource-variable/geist-mono/index.css';
import App from './App.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
