import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="container-custom py-16 flex flex-col items-center">
      <div className="mb-8">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          className="w-24 h-24 text-gray-300"
          strokeWidth="1"
        >
          <circle cx="12" cy="12" r="10" />
          <path d="M15 9l-6 6M9 9l6 6" />
        </svg>
      </div>
      <h1 className="text-4xl font-bold text-gray-800 mb-4">404</h1>
      <h2 className="text-2xl font-semibold text-gray-700 mb-6">
        Page Not Found
      </h2>
      <p className="text-gray-600 text-center max-w-md mb-8">
        The page you are looking for might have been removed, had its name
        changed, or is temporarily unavailable.
      </p>
      <Link
        to="/"
        className="px-6 py-3 bg-primary-500 text-white rounded-md hover:bg-primary-600 transition-colors"
      >
        Back to Home
      </Link>
    </div>
  );
};

export default NotFound;
