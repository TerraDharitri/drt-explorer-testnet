import React from "react";
import { Link } from "react-router-dom";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

const DataTable = ({
  columns,
  data,
  isLoading = false,
  pagination = null,
  onPageChange,
  emptyMessage = "No data available",
}) => {
  // Render loading skeleton
  if (isLoading) {
    return (
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {columns.map((column, index) => (
                <th
                  key={index}
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200 animate-pulse">
            {[...Array(7)].map((_, rowIndex) => (
              <tr key={rowIndex}>
                {columns.map((_, colIndex) => (
                  <td key={colIndex} className="px-6 py-4 whitespace-nowrap">
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  // Empty state
  if (!data || data.length === 0) {
    return (
      <div className="py-12 flex flex-col items-center justify-center bg-white rounded-lg border border-gray-200">
        <svg
          className="w-16 h-16 text-gray-300 mb-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1"
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          ></path>
        </svg>
        <p className="text-gray-600">{emptyMessage}</p>
      </div>
    );
  }

  // Render cell content based on cell type
  const renderCell = (column, item) => {
    const value = column.accessor ? column.accessor(item) : item[column.key];

    if (column.render) {
      return column.render(item);
    }

    switch (column.type) {
      case "link":
        return (
          <Link
            to={column.linkPath(item)}
            className="text-primary-500 hover:text-primary-700"
          >
            {value}
          </Link>
        );
      case "address":
        return (
          <Link
            to={`/accounts/${value}`}
            className="text-primary-500 hover:text-primary-700"
          >
            {value.slice(0, 8)}...{value.slice(-8)}
          </Link>
        );
      case "transaction":
        return (
          <Link
            to={`/transactions/${value}`}
            className="text-primary-500 hover:text-primary-700"
          >
            {value.slice(0, 8)}...{value.slice(-8)}
          </Link>
        );
      case "status":
        const statusClasses = {
          success: "bg-green-100 text-green-800",
          pending: "bg-yellow-100 text-yellow-800",
          failed: "bg-red-100 text-red-800",
          default: "bg-gray-100 text-gray-800",
        };
        const statusClass =
          statusClasses[value.toLowerCase()] || statusClasses.default;
        return (
          <span className={`px-2 py-1 text-xs rounded-full ${statusClass}`}>
            {value}
          </span>
        );
      case "datetime":
        return new Date(value).toLocaleString();
      case "amount":
        return Number(value).toLocaleString(undefined, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 6,
        });
      default:
        return value;
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {columns.map((column, index) => (
              <th
                key={index}
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((item, rowIndex) => (
            <tr
              key={rowIndex}
              className="hover:bg-gray-50 transition-colors duration-150"
            >
              {columns.map((column, colIndex) => (
                <td
                  key={colIndex}
                  className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                >
                  {renderCell(column, item)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination controls */}
      {pagination && (
        <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                Showing{" "}
                <span className="font-medium">{pagination.startItem}</span> to{" "}
                <span className="font-medium">{pagination.endItem}</span> of{" "}
                <span className="font-medium">{pagination.totalItems}</span>{" "}
                results
              </p>
            </div>
            <div>
              <nav
                className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
                aria-label="Pagination"
              >
                <button
                  onClick={() => onPageChange(pagination.currentPage - 1)}
                  disabled={pagination.currentPage === 1}
                  className={`relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium 
                    ${
                      pagination.currentPage === 1
                        ? "text-gray-300 cursor-not-allowed"
                        : "text-gray-500 hover:bg-gray-50 cursor-pointer"
                    }`}
                >
                  <span className="sr-only">Previous</span>
                  <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
                </button>

                {/* Page numbers */}
                {pagination.pageNumbers.map((pageNumber) => (
                  <button
                    key={pageNumber}
                    onClick={() => onPageChange(pageNumber)}
                    className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium
                      ${
                        pagination.currentPage === pageNumber
                          ? "z-10 bg-primary-50 border-primary-500 text-primary-600"
                          : "bg-white border-gray-300 text-gray-500 hover:bg-gray-50"
                      }`}
                  >
                    {pageNumber}
                  </button>
                ))}

                <button
                  onClick={() => onPageChange(pagination.currentPage + 1)}
                  disabled={pagination.currentPage === pagination.totalPages}
                  className={`relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium 
                    ${
                      pagination.currentPage === pagination.totalPages
                        ? "text-gray-300 cursor-not-allowed"
                        : "text-gray-500 hover:bg-gray-50 cursor-pointer"
                    }`}
                >
                  <span className="sr-only">Next</span>
                  <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
                </button>
              </nav>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DataTable;
