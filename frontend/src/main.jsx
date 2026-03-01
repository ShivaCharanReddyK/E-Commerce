import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { AuthProvider } from './context/AuthContext.jsx'
import { CartProvider } from './context/CartContext.jsx'
import { ToastProvider } from './context/ToastContext.jsx'
import ErrorBoundary from './components/ErrorBoundary.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <ErrorBoundary>
            <ToastProvider>
                <AuthProvider>
                    <CartProvider>
                        <App />
                    </CartProvider>
                </AuthProvider>
            </ToastProvider>
        </ErrorBoundary>
    </React.StrictMode>,
)
