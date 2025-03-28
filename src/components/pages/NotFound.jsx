import { Link } from "react-router-dom";
import { FaExclamationTriangle, FaHome } from "react-icons/fa";

const NotFound = () => {
  return (
    <div className="container-custom py-16">
      <div className="max-w-lg mx-auto text-center">
        <div className="flex justify-center mb-6">
          <FaExclamationTriangle className="text-6xl text-yellow-500" />
        </div>

        <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>

        <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
          The page you are looking for might have been removed, had its name
          changed, or is temporarily unavailable.
        </p>

        <Link to="/" className="btn-primary inline-flex items-center">
          <FaHome className="mr-2" />
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
