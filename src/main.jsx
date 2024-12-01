import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import App from './App.jsx';

const clientId = "838534377733-746qa86si60iggc1rclouo8jeoaqg3j0.apps.googleusercontent.com";

  
ReactDOM.createRoot(document.getElementById('root')).render(
    <GoogleOAuthProvider clientId={clientId}>
        <Router>
            <App />
        </Router>
    </GoogleOAuthProvider>
);