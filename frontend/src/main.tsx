import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { RouteProvider } from '@/providers/route-providers';
import App from '@/App';
import '@/styles/globals.css';
import "@/i18n/i18n";

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <BrowserRouter>
            <RouteProvider>
                <App />
            </RouteProvider>
        </BrowserRouter>
    </React.StrictMode>
);