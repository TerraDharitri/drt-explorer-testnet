import React, { useEffect, useState } from "react";

function DebugTest() {
  const [diagnostics, setDiagnostics] = useState({
    windowDimensions: { width: window.innerWidth, height: window.innerHeight },
    userAgent: navigator.userAgent,
    rootElement: null,
    time: new Date().toLocaleTimeString(),
  });

  useEffect(() => {
    console.log("DebugTest component mounted");

    // Check if root element exists and has dimensions
    const rootElement = document.getElementById("root");
    setDiagnostics((prev) => ({
      ...prev,
      rootElement: rootElement
        ? {
            exists: true,
            width: rootElement.offsetWidth,
            height: rootElement.offsetHeight,
            display: window.getComputedStyle(rootElement).display,
            visibility: window.getComputedStyle(rootElement).visibility,
            overflow: window.getComputedStyle(rootElement).overflow,
          }
        : { exists: false },
    }));

    // Check for CSS or style issues
    document.body.style.height = "100vh";
    document.body.style.overflow = "auto";
    document.body.style.margin = "0";

    // Log diagnostics to console
    console.log("Environment diagnostics:", {
      viewport: { width: window.innerWidth, height: window.innerHeight },
      userAgent: navigator.userAgent,
      docMode: document.compatMode,
      rootElement: rootElement
        ? {
            exists: true,
            dimensions: {
              width: rootElement.offsetWidth,
              height: rootElement.offsetHeight,
            },
            styles: window.getComputedStyle(rootElement),
          }
        : { exists: false },
    });

    // Update time every second
    const timer = setInterval(() => {
      setDiagnostics((prev) => ({
        ...prev,
        time: new Date().toLocaleTimeString(),
      }));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div style={{ padding: "40px", textAlign: "center" }}>
      <h1>Debug Test Page</h1>
      <p>This is a simple test component to diagnose rendering issues.</p>

      <div
        style={{
          marginTop: "20px",
          padding: "20px",
          backgroundColor: "#f0f0f0",
          borderRadius: "8px",
          textAlign: "left",
        }}
      >
        <h2>Diagnostics:</h2>
        <ul>
          <li>
            <strong>Current time:</strong> {diagnostics.time}
          </li>
          <li>
            <strong>Window:</strong> {diagnostics.windowDimensions.width}x
            {diagnostics.windowDimensions.height}
          </li>
          <li>
            <strong>User Agent:</strong> {diagnostics.userAgent}
          </li>
          <li>
            <strong>Root Element:</strong>{" "}
            {diagnostics.rootElement
              ? `${diagnostics.rootElement.width}x${diagnostics.rootElement.height} (${diagnostics.rootElement.display}, ${diagnostics.rootElement.visibility})`
              : "Not found"}
          </li>
        </ul>
      </div>

      <button
        onClick={() => window.location.reload()}
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          backgroundColor: "blue",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        Reload Page
      </button>
    </div>
  );
}

export default DebugTest;
