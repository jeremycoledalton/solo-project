import React from 'react';
import { render } from 'react-dom';
import App from './App.jsx';
import './stylesheets/style.css';


console.log("Serving index.js")

render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);