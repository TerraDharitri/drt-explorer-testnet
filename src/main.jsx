import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

// Initialize error monitoring
const initializeErrorTracking = () => {
  // Global error handler
  window.addEventListener("error", (event) => {
    console.error("Global error caught:", event.error);
    logErrorToStorage("uncaught_error", event.error);
    // Prevent default browser error handling
    event.preventDefault();
  });

  // Unhandled promise rejection handler
  window.addEventListener("unhandledrejection", (event) => {
    console.error("Unhandled Promise rejection:", event.reason);
    logErrorToStorage("unhandled_promise", event.reason);
    // Prevent default handling
    event.preventDefault();
  });

  // Log errors to localStorage for debugging
  const logErrorToStorage = (type, error) => {
    try {
      const errorLog = JSON.parse(
        localStorage.getItem("dharitri_explorer_errors") || "[]"
      );
      errorLog.push({
        type,
        timestamp: new Date().toISOString(),
        message: error?.message || String(error),
        stack: error?.stack,
        url: window.location.href,
        userAgent: navigator.userAgent,
      });
      // Keep only the last 10 errors
      if (errorLog.length > 10) errorLog.shift();
      localStorage.setItem(
        "dharitri_explorer_errors",
        JSON.stringify(errorLog)
      );
    } catch (e) {
      console.error("Failed to log error to localStorage:", e);
    }
  };
};

// Clean up potentially corrupted storage
const cleanupStorage = () => {
  try {
    console.log("Checking localStorage integrity...");

    // Check if localStorage is accessible
    if (typeof localStorage === "undefined") {
      console.warn("localStorage is not available in this environment");
      return;
    }

    // Try to access localStorage
    const testKey = "_test_dharitri_explorer";
    localStorage.setItem(testKey, "test");
    localStorage.removeItem(testKey);

    // Validate error log structure
    try {
      const storedErrors = localStorage.getItem("dharitri_explorer_errors");
      if (storedErrors) {
        JSON.parse(storedErrors); // Will throw if invalid JSON
      }
    } catch (e) {
      console.warn("Found corrupted error logs, resetting...");
      localStorage.removeItem("dharitri_explorer_errors");
    }

    console.log("localStorage integrity check completed");
  } catch (e) {
    console.error("Error during localStorage cleanup:", e);
  }
};

// Setup and render application
const renderApp = () => {
  try {
    console.log("Attempting to render the application...");

    const rootElement = document.getElementById("root");
    if (!rootElement) {
      throw new Error("Root element not found - DOM might not be ready");
    }

    // Render without StrictMode for now to fix Router context issues
    ReactDOM.createRoot(rootElement).render(<App />);

    console.log("Application rendered successfully!");
  } catch (error) {
    console.error("Error rendering application:", error);

    // Fallback render for critical errors
    const rootElement = document.getElementById("root");
    if (rootElement) {
      ReactDOM.createRoot(rootElement).render(
        <div style={{ padding: "40px", color: "red", textAlign: "center" }}>
          <h1>Application Error</h1>
          <p>There was a problem loading the application.</p>
          <div
            style={{
              margin: "20px 0",
              padding: "10px",
              background: "#ffeeee",
              borderRadius: "5px",
              textAlign: "left",
            }}
          >
            <p>
              <strong>Error:</strong> {error.message}
            </p>
            {error.stack && (
              <pre
                style={{
                  whiteSpace: "pre-wrap",
                  fontSize: "12px",
                  marginTop: "10px",
                }}
              >
                {error.stack}
              </pre>
            )}
          </div>
          <button
            onClick={() => window.location.reload()}
            style={{
              padding: "10px 20px",
              background: "#0066cc",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Reload Page
          </button>
        </div>
      );
    } else {
      // If even the root element isn't available, use document.body
      document.body.innerHTML = `
        <div style="padding: 40px; color: red; text-align: center">
          <h1>Critical Error</h1>
          <p>The application could not be loaded due to a critical error.</p>
          <p>Please refresh the page or try again later.</p>
        </div>
      `;
    }
  }
};

// Initialize the application
const initializeApp = () => {
  // Setup error tracking
  initializeErrorTracking();

  // Clean up storage
  cleanupStorage();

  // Render the application
  renderApp();
};

// Start the application
initializeApp();
