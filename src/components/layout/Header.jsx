import React, { useState } from "react";
import { useTheme } from "../../context/ThemeContext";

const Header = () => {
  const { theme, toggleTheme } = useTheme();
  const [showThemeMenu, setShowThemeMenu] = useState(false);

  const themeOptions = [
    { value: "light", label: "Light" },
    { value: "dim", label: "Dim" },
    { value: "dark", label: "Dark" },
  ];

  const handleThemeChange = (newTheme) => {
    toggleTheme(newTheme);
    setShowThemeMenu(false);
  };

  return (
    <header
      style={{
        padding: "1rem",
        backgroundColor:
          theme === "light" ? "#f0f0f0" : theme === "dim" ? "#333" : "#111",
        color: theme === "light" ? "#333" : "#fff",
        borderBottom: `1px solid ${
          theme === "light" ? "#ddd" : theme === "dim" ? "#444" : "#222"
        }`,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <h1 style={{ margin: 0 }}>Dharitri Explorer</h1>

      <div style={{ position: "relative" }}>
        <button
          onClick={() => setShowThemeMenu(!showThemeMenu)}
          style={{
            background:
              theme === "light" ? "#fff" : theme === "dim" ? "#444" : "#222",
            color: theme === "light" ? "#333" : "#fff",
            border: `1px solid ${
              theme === "light" ? "#ddd" : theme === "dim" ? "#555" : "#333"
            }`,
            padding: "0.5rem 1rem",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          {themeOptions.find((option) => option.value === theme)?.label ||
            "Theme"}{" "}
          ▼
        </button>

        {showThemeMenu && (
          <div
            style={{
              position: "absolute",
              top: "100%",
              right: 0,
              marginTop: "4px",
              background:
                theme === "light" ? "#fff" : theme === "dim" ? "#444" : "#222",
              border: `1px solid ${
                theme === "light" ? "#ddd" : theme === "dim" ? "#555" : "#333"
              }`,
              borderRadius: "4px",
              zIndex: 10,
            }}
          >
            {themeOptions.map((option) => (
              <div
                key={option.value}
                onClick={() => handleThemeChange(option.value)}
                style={{
                  padding: "0.5rem 1rem",
                  cursor: "pointer",
                  backgroundColor:
                    theme === option.value
                      ? theme === "light"
                        ? "#f0f0f0"
                        : theme === "dim"
                        ? "#555"
                        : "#333"
                      : "transparent",
                  color: theme === "light" ? "#333" : "#fff",
                }}
              >
                {option.label}
              </div>
            ))}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
