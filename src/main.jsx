import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

// Findet das 'root'-Element in der index.html
const rootElement = document.getElementById('root');

if (rootElement) {
  // Rendert die Hauptkomponente (App.jsx) in das DOM
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  );
} else {
  console.error("Root element with id 'root' not found in the HTML document.");
}