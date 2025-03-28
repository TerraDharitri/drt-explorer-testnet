import React from "react";

const Badge = ({
  children,
  variant = "default",
  size = "md",
  glow = false,
  dot = false,
  pulse = false,
  className = "",
  onClick,
}) => {
  const variantClasses = {
    default: "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300",
    primary: "bg-primary bg-opacity-10 text-primary",
    secondary: "bg-secondary bg-opacity-10 text-secondary",
    success:
      "bg-green-100 text-green-700 dark:bg-green-900 dark:bg-opacity-20 dark:text-green-400",
    warning:
      "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:bg-opacity-20 dark:text-yellow-400",
    danger:
      "bg-red-100 text-red-700 dark:bg-red-900 dark:bg-opacity-20 dark:text-red-400",
    info: "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:bg-opacity-20 dark:text-blue-400",
    outline:
      "bg-transparent border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300",
    glass:
      "bg-white bg-opacity-10 backdrop-blur-md text-gray-800 dark:text-white border border-white border-opacity-20",
  };

  const sizeClasses = {
    xs: "text-xs px-1.5 py-0.5",
    sm: "text-xs px-2 py-0.5",
    md: "text-xs px-2.5 py-1",
    lg: "text-sm px-3 py-1.5",
  };

  const dotColors = {
    default: "bg-gray-500",
    primary: "bg-primary",
    secondary: "bg-secondary",
    success: "bg-green-500",
    warning: "bg-yellow-500",
    danger: "bg-red-500",
    info: "bg-blue-500",
    outline: "bg-gray-500",
    glass: "bg-white",
  };

  const glowColors = {
    default: "",
    primary: "shadow-primary/30 shadow-sm",
    secondary: "shadow-secondary/30 shadow-sm",
    success: "shadow-green-500/30 shadow-sm",
    warning: "shadow-yellow-500/30 shadow-sm",
    danger: "shadow-red-500/30 shadow-sm",
    info: "shadow-blue-500/30 shadow-sm",
    outline: "",
    glass: "shadow-white/20 shadow-sm",
  };

  const variantClass = variantClasses[variant] || variantClasses.default;
  const sizeClass = sizeClasses[size] || sizeClasses.md;
  const dotColor = dotColors[variant] || dotColors.default;
  const glowEffect = glow ? glowColors[variant] : "";
  const cursorClass = onClick ? "cursor-pointer hover:opacity-80" : "";
  const pulseAnimation = pulse ? "animate-pulse" : "";

  return (
    <span
      className={`inline-flex items-center font-medium rounded-full transition-all ${variantClass} ${sizeClass} ${glowEffect} ${cursorClass} ${pulseAnimation} ${className}`}
      onClick={onClick}
    >
      {dot && (
        <span className={`w-1.5 h-1.5 rounded-full ${dotColor} mr-1.5`}></span>
      )}
      {children}
    </span>
  );
};

export default Badge;
