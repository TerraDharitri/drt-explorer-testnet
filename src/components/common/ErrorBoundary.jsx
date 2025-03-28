import React, { Component } from "react";
import { Link } from "react-router-dom";
import { FaExclamationTriangle, FaHome, FaSync } from "react-icons/fa";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
      timestamp: null,
    };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Capture error details
    const timestamp = new Date().toISOString();

    this.setState({
      error: error,
      errorInfo: errorInfo,
      timestamp: timestamp,
    });

    // Log the error with timestamp for debugging
    console.error(`[${timestamp}] Error caught by ErrorBoundary:`, error);
    console.error(`Component stack:`, errorInfo?.componentStack);

    // In a production app, you would send this to your error tracking service
    // Example: sendToErrorTracking(error, errorInfo, timestamp);

    // Optionally, save error details to localStorage for debugging across sessions
    try {
      const errorLog = JSON.parse(
        localStorage.getItem("dharitri_explorer_errors") || "[]"
      );
      errorLog.push({
        timestamp,
        message: error.toString(),
        url: window.location.href,
        stack: error.stack,
        userAgent: navigator.userAgent,
      });
      // Keep only the last 5 errors to avoid filling localStorage
      if (errorLog.length > 5) errorLog.shift();
      localStorage.setItem(
        "dharitri_explorer_errors",
        JSON.stringify(errorLog)
      );
    } catch (e) {
      console.error("Failed to log error to localStorage:", e);
    }
  }

  resetErrorBoundary = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
      timestamp: null,
    });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="container mx-auto px-4 py-16 max-w-4xl">
          <div className="flex flex-col items-center justify-center text-center">
            <div className="bg-red-100 dark:bg-red-900/20 p-6 rounded-full mb-4">
              <FaExclamationTriangle className="text-red-500 dark:text-red-400 text-6xl" />
            </div>
            <h1 className="text-4xl font-bold mb-4">Something Went Wrong</h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-6">
              We apologize for the inconvenience. The issue has been logged and
              we'll look into it.
            </p>

            {import.meta.env.DEV && this.state.error && (
              <div className="mb-8 w-full">
                <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg text-left overflow-auto max-h-60">
                  <div className="flex justify-between items-center mb-2">
                    <p className="font-mono text-sm text-red-500">
                      {this.state.error.toString()}
                    </p>
                    <span className="text-xs text-gray-500">
                      {this.state.timestamp &&
                        new Date(this.state.timestamp).toLocaleTimeString()}
                    </span>
                  </div>
                  <p className="font-mono text-xs text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                    {this.state.errorInfo?.componentStack}
                  </p>
                </div>
              </div>
            )}

            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
              <button
                onClick={() => window.location.reload()}
                className="flex items-center justify-center px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
              >
                <FaSync className="mr-2" /> Reload Page
              </button>
              <Link
                to="/"
                className="flex items-center justify-center px-6 py-3 bg-primary hover:bg-primary-dark text-white rounded-lg transition-colors"
                onClick={this.resetErrorBoundary}
              >
                <FaHome className="mr-2" /> Return Home
              </Link>
            </div>

            <div className="mt-8 max-w-xl">
              <h2 className="text-lg font-semibold mb-2">
                Troubleshooting Tips
              </h2>
              <ul className="text-left list-disc list-inside text-gray-600 dark:text-gray-400">
                <li>Try refreshing the page</li>
                <li>Clear your browser cache and cookies</li>
                <li>Try using a different browser</li>
                <li>Check your internet connection</li>
                <li>Come back later if the problem persists</li>
              </ul>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
