//index.js

import React from 'react';
import "./style.css"
import ReactDOM from 'react-dom/client';
import { AuthContextProvider } from './authContext';


import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <AuthContextProvider>
        <React.StrictMode>
            <App />
        </React.StrictMode>
    </AuthContextProvider>
);
