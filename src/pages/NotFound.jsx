import React from "react";
import { Link } from "react-router-dom";
import { FaExclamationTriangle, FaHome } from "react-icons/fa";

const NotFound = () => {
  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl">
      <div className="flex flex-col items-center justify-center text-center">
        <div className="bg-yellow-100 dark:bg-yellow-900/20 p-6 rounded-full mb-4">
          <FaExclamationTriangle className="text-yellow-500 dark:text-yellow-400 text-6xl" />
        </div>
        <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
          The page you are looking for doesn't exist or has been moved.
        </p>
        <Link
          to="/"
          className="flex items-center justify-center px-6 py-3 bg-primary hover:bg-primary-dark text-white rounded-lg transition-colors"
        >
          <FaHome className="mr-2" /> Return Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
