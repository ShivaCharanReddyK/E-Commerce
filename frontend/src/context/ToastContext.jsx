import { createContext, useState, useContext, useCallback } from 'react';

/**
 * ToastContext - Global toast notification system
 */
const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
    const [toasts, setToasts] = useState([]);

    const addToast = useCallback((message, type = 'info', duration = 3000) => {
        const id = Date.now() + Math.random();
        const toast = { id, message, type, duration };

        setToasts((prev) => [...prev, toast]);

        // Auto remove toast after duration
        setTimeout(() => {
            removeToast(id);
        }, duration);

        return id;
    }, []);

    const removeToast = useCallback((id) => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
    }, []);

    // Convenience methods
    const success = useCallback((message, duration) => addToast(message, 'success', duration), [addToast]);
    const error = useCallback((message, duration) => addToast(message, 'error', duration), [addToast]);
    const warning = useCallback((message, duration) => addToast(message, 'warning', duration), [addToast]);
    const info = useCallback((message, duration) => addToast(message, 'info', duration), [addToast]);

    const value = {
        toasts,
        addToast,
        removeToast,
        success,
        error,
        warning,
        info
    };

    return (
        <ToastContext.Provider value={value}>
            {children}
            {/* Toast Container */}
            <div className="fixed top-4 right-4 z-50 space-y-2">
                {toasts.map((toast) => (
                    <div
                        key={toast.id}
                        className={`px-6 py-3 rounded-lg shadow-lg transform transition-all duration-300 animate-slide-in-right flex items-center gap-2 ${
                            toast.type === 'success' ? 'bg-green-500 text-white' :
                            toast.type === 'error' ? 'bg-red-500 text-white' :
                            toast.type === 'warning' ? 'bg-yellow-500 text-white' :
                            'bg-blue-500 text-white'
                        }`}
                    >
                        <span className="text-xl">
                            {toast.type === 'success' && '✓'}
                            {toast.type === 'error' && '✕'}
                            {toast.type === 'warning' && '⚠'}
                            {toast.type === 'info' && 'ℹ'}
                        </span>
                        <span className="font-medium">{toast.message}</span>
                        <button
                            onClick={() => removeToast(toast.id)}
                            className="ml-2 text-white/80 hover:text-white"
                        >
                            ✕
                        </button>
                    </div>
                ))}
            </div>
        </ToastContext.Provider>
    );
};

export const useToast = () => {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error('useToast must be used within ToastProvider');
    }
    return context;
};

export default ToastContext;
