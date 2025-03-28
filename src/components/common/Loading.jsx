import React from "react";

const Loading = ({ size = "md", className = "" }) => {
  const sizeClasses = {
    sm: "w-5 h-5 border-2",
    md: "w-8 h-8 border-3",
    lg: "w-12 h-12 border-4",
  };

  const sizeClass = sizeClasses[size] || sizeClasses.md;

  return (
    <div className={`flex justify-center items-center ${className}`}>
      <div
        className={`${sizeClass} border-t-primary border-r-primary border-b-gray-200 border-l-gray-200 rounded-full animate-spin`}
      ></div>
    </div>
  );
};

export default Loading;
