import React from "react";
import Loading from "./Loading";
import Pagination from "./Pagination";
import { HiChevronUp, HiChevronDown, HiSelector } from "react-icons/hi";

const Table = ({
  columns,
  data,
  isLoading = false,
  pagination = null,
  onPageChange = () => {},
  emptyMessage = "No data available",
  className = "",
  compact = false,
  sortable = false,
  sortColumn = null,
  sortDirection = "asc",
  onSort = () => {},
  highlightOnHover = true,
  striped = false,
  bordered = false,
}) => {
  // Handle column sorting
  const handleSort = (columnKey) => {
    if (!sortable) return;

    const direction =
      sortColumn === columnKey && sortDirection === "asc" ? "desc" : "asc";
    onSort(columnKey, direction);
  };

  // Get sort icon based on current column and sort direction
  const getSortIcon = (column) => {
    if (!sortable) return null;

    if (sortColumn === column.key) {
      return sortDirection === "asc" ? (
        <HiChevronUp className="w-4 h-4" />
      ) : (
        <HiChevronDown className="w-4 h-4" />
      );
    }
    return <HiSelector className="w-4 h-4 text-gray-400" />;
  };

  // Table styles based on props
  const getTableClasses = () => {
    let classes = "min-w-full divide-y divide-gray-200 dark:divide-gray-700 ";

    if (bordered) {
      classes += "border border-gray-200 dark:border-gray-700 ";
    }

    return classes + className;
  };

  // Row hover styles
  const getRowClasses = (index) => {
    let classes = "";

    if (striped && index % 2 === 1) {
      classes += "bg-gray-50 dark:bg-gray-800/50 ";
    } else {
      classes += "bg-white dark:bg-gray-900 ";
    }

    if (highlightOnHover) {
      classes +=
        "hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-150 ";
    }

    return classes;
  };

  if (isLoading && (!data || data.length === 0)) {
    return (
      <div className="overflow-hidden rounded-xl shadow-sm bg-white dark:bg-gray-800">
        <div className="flex justify-center items-center py-12">
          <Loading className="my-8" />
          <span className="ml-3 text-sm text-gray-500 dark:text-gray-400">
            Loading data...
          </span>
        </div>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="overflow-hidden rounded-xl shadow-sm bg-white dark:bg-gray-800">
        <div className="text-center py-12">
          <svg
            className="mx-auto h-12 w-12 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1}
              d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
            />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-gray-100">
            {emptyMessage}
          </h3>
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl shadow-sm bg-white dark:bg-gray-800">
      <div className="overflow-x-auto">
        <table className={getTableClasses()}>
          <thead className="bg-gray-50 dark:bg-gray-800/80">
            <tr>
              {columns.map((column, index) => (
                <th
                  key={column.key || index}
                  scope="col"
                  className={`px-6 py-3.5 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider ${
                    sortable && column.sortable
                      ? "cursor-pointer select-none"
                      : ""
                  }`}
                  style={column.width ? { width: column.width } : {}}
                  onClick={() => column.sortable && handleSort(column.key)}
                >
                  <div className="flex items-center space-x-1">
                    <span>{column.header}</span>
                    {column.sortable && getSortIcon(column)}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-800">
            {data.map((row, rowIndex) => (
              <tr key={rowIndex} className={getRowClasses(rowIndex)}>
                {columns.map((column, colIndex) => (
                  <td
                    key={colIndex}
                    className={`px-6 ${
                      compact ? "py-2" : "py-4"
                    } whitespace-nowrap text-sm text-gray-900 dark:text-gray-200`}
                  >
                    {column.cell ? column.cell(row) : row[column.accessor]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {pagination && (
        <div className="px-6 py-4 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
          <Pagination
            currentPage={pagination.currentPage}
            totalPages={pagination.totalPages}
            onPageChange={onPageChange}
          />
        </div>
      )}
    </div>
  );
};

export default Table;
