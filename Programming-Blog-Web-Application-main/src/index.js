import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ContextProvider } from "./context/Context";

const root = ReactDOM.createRoot(document.getElementById('root'));
//here context provider sends the data of user and his details to all parts 
root.render(
  <React.StrictMode>
    <ContextProvider>
      <App />
    </ContextProvider>
  </React.StrictMode>
);


