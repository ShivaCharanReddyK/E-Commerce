const LoadingSpinner = ({ fullScreen = false }) => {
    if (fullScreen) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-primary-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600 font-medium">Loading...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex items-center justify-center p-8">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
        </div>
    );
};

export default LoadingSpinner;
