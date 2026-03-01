import { Component } from 'react';

/**
 * ErrorBoundary - Catches JavaScript errors in child components
 * and displays a fallback UI instead of crashing the app
 */
class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null, errorInfo: null };
    }

    static getDerivedStateFromError(error) {
        // Update state so the next render will show the fallback UI
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        // Log error details
        console.error('ErrorBoundary caught an error:', error, errorInfo);
        this.setState({ error, errorInfo });

        // Could send error to error tracking service here
        // e.g., Sentry, LogRocket, etc.
    }

    handleReset = () => {
        this.setState({ hasError: false, error: null, errorInfo: null });
        if (this.props.onReset) {
            this.props.onReset();
        }
    };

    render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
                    <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 text-center">
                        <div className="text-6xl mb-4">😵</div>
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">
                            Something went wrong
                        </h2>
                        <p className="text-gray-600 mb-6">
                            We apologize for the inconvenience. Please try refreshing the page or go back to the home page.
                        </p>

                        {process.env.NODE_ENV === 'development' && this.state.error && (
                            <div className="mb-6 text-left">
                                <details className="bg-gray-100 rounded p-4 text-sm">
                                    <summary className="cursor-pointer font-semibold text-red-600">
                                        Error Details (Development Only)
                                    </summary>
                                    <pre className="mt-2 text-xs overflow-auto">
                                        {this.state.error.toString()}
                                        {'\n'}
                                        {this.state.errorInfo?.componentStack}
                                    </pre>
                                </details>
                            </div>
                        )}

                        <div className="flex gap-4 justify-center">
                            <button
                                onClick={this.handleReset}
                                className="btn btn-primary"
                            >
                                Try Again
                            </button>
                            <a href="/" className="btn btn-outline">
                                Go Home
                            </a>
                        </div>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
