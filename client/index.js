import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './stylesheets/style.css';

const container = document.getElementById('root')
const root = createRoot(container)

console.log("Serving index.js")

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);