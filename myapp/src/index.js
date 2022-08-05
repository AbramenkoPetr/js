import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
const root = ReactDOM.createRoot(document.getElementById('root'));
const Message = 'Hello, Petr!';
root.render(
  <React.StrictMode>
    <App message={Message} />
  </React.StrictMode>
  
);
