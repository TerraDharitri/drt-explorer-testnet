import React, { createContext, useState, useEffect, useContext } from "react";

// Define the context with default values
const ThemeContext = createContext({
  theme: "light",
  toggleTheme: () => {},
});

export const ThemeProvider = ({ children }) => {
  // Add error handling for localStorage
  const getInitialTheme = () => {
    try {
      const savedTheme = localStorage.getItem("theme");
      return savedTheme || "light"; // Default to light if not found
    } catch (error) {
      console.error("Error accessing localStorage:", error);
      return "light"; // Default to light on error
    }
  };

  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    try {
      // Log theme changes
      console.log("Applying theme:", theme);

      // First, remove all theme classes
      document.documentElement.classList.remove(
        "light-theme",
        "dim-theme",
        "dark-theme",
        "dark"
      );
      document.body.classList.remove("light-theme", "dim-theme", "dark-theme");

      // Apply the specific theme class
      document.documentElement.classList.add(`${theme}-theme`);
      document.body.classList.add(`${theme}-theme`);

      // For dark mode compatibility with Tailwind
      if (theme === "dark" || theme === "dim") {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }

      // Safety check to ensure at least one theme is applied
      if (!document.documentElement.className) {
        console.warn("No theme class applied, forcing light theme");
        document.documentElement.classList.add("light-theme");
        document.body.classList.add("light-theme");
      }

      // Save to localStorage with error handling
      try {
        localStorage.setItem("theme", theme);
      } catch (error) {
        console.error("Error saving theme to localStorage:", error);
      }
    } catch (error) {
      console.error("Error applying theme:", error);
    }
  }, [theme]);

  const toggleTheme = (newTheme) => {
    try {
      console.log("Toggling theme to:", newTheme);
      setTheme(newTheme);
    } catch (error) {
      console.error("Error toggling theme:", error);
    }
  };

  // Use memoized value to prevent unnecessary re-renders
  const contextValue = React.useMemo(
    () => ({
      theme,
      toggleTheme,
    }),
    [theme]
  );

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    console.error("useTheme must be used within a ThemeProvider");
    // Return fallback values if the context is missing
    return { theme: "light", toggleTheme: () => {} };
  }
  return context;
};
