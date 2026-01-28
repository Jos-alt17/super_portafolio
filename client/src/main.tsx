import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './index.css' // Importante: Contiene las directivas @tailwind
import './App.css'   // Importante: Contiene el diseño del CV y el corte azul

// Seleccionamos el elemento root del index.html
const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error("No se encontró el elemento root. Verifica tu index.html");
}

createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>,
)