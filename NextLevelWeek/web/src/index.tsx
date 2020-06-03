import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

//Renderiza o App no elemento root do index.html
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
