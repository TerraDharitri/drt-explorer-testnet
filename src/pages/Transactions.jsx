import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Card from "../components/common/Card";
import Table from "../components/common/Table";
import apiService from "../utils/api";
import {
  formatAddress,
  formatTimestamp,
  formatRelativeTime,
  formatTokenAmount,
  formatCurrency,
  timeAgo,
} from "../utils/formatters";
import Pagination from "../components/common/Pagination";
import Loading from "../components/common/Loading";
import Badge from "../components/common/Badge";
import HashLink from "../components/common/HashLink";
import {
  FaExchangeAlt,
  FaFilter,
  FaClock,
  FaSortAmountDown,
} from "react-icons/fa";

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    itemsPerPage: 25,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [timeRange, setTimeRange] = useState("all");
  const [sortOrder, setSortOrder] = useState("desc");
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTransactions = async () => {
      setIsLoading(true);
      setError(null);

      try {
        // For demo, use a timeout to simulate API call
        setTimeout(() => {
          // Mock transaction data
          const mockTransactions = Array(25)
            .fill()
            .map((_, index) => ({
              hash: `0x${Math.random().toString(16).substr(2, 40)}${index
                .toString(16)
                .padStart(2, "0")}`,
              from: `0x${Math.random().toString(16).substr(2, 40)}`,
              to: `0x${Math.random().toString(16).substr(2, 40)}`,
              value: Math.random() * 1000,
              fee: Math.random() * 0.1,
              timestamp: Date.now() - Math.floor(Math.random() * 1000000),
              status: ["success", "success", "success", "pending", "failed"][
                Math.floor(Math.random() * 5)
              ],
            }));

          setTransactions(mockTransactions);
          setPagination({
            currentPage: 1,
            totalPages: 10,
            totalItems: 234,
            itemsPerPage: 25,
          });
          setIsLoading(false);
        }, 800);
      } catch (err) {
        setError("Failed to fetch transactions");
        console.error(err);
        setIsLoading(false);
      }
    };

    fetchTransactions();
  }, [filter, timeRange, sortOrder]);

  const handlePageChange = (page) => {
    setPagination({ ...pagination, currentPage: page });
    window.scrollTo(0, 0);
  };

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  const handleTimeRangeChange = (newRange) => {
    setTimeRange(newRange);
  };

  const handleSortOrderChange = () => {
    setSortOrder(sortOrder === "desc" ? "asc" : "desc");
  };

  const getStatusBadge = (status) => {
    const statusMap = {
      success: { variant: "success", label: "Success", dot: true },
      pending: { variant: "warning", label: "Pending", dot: true },
      failed: { variant: "danger", label: "Failed", dot: true },
      invalid: { variant: "danger", label: "Invalid", dot: true },
    };

    const { variant, label, dot } = statusMap[status] || {
      variant: "default",
      label: status,
      dot: true,
    };

    return (
      <Badge variant={variant} dot={dot}>
        {label}
      </Badge>
    );
  };

  // Filter options
  const filterOptions = [
    { value: "all", label: "All Transactions" },
    { value: "success", label: "Successful" },
    { value: "pending", label: "Pending" },
    { value: "failed", label: "Failed" },
  ];

  // Time range options
  const timeRangeOptions = [
    { value: "all", label: "All Time" },
    { value: "24h", label: "Last 24 hours" },
    { value: "7d", label: "Last 7 days" },
    { value: "30d", label: "Last 30 days" },
  ];

  // Table columns for transactions
  const txColumns = [
    {
      header: "Tx Hash",
      key: "hash",
      cell: (row) => <HashLink hash={row.hash} type="tx" length="medium" />,
    },
    {
      header: "From",
      key: "from",
      cell: (row) => <HashLink hash={row.from} type="account" length="short" />,
    },
    {
      header: "To",
      key: "to",
      cell: (row) => <HashLink hash={row.to} type="account" length="short" />,
    },
    {
      header: "Value",
      key: "value",
      cell: (row) => formatCurrency(row.value),
    },
    {
      header: "Fee",
      key: "fee",
      cell: (row) => formatCurrency(row.fee),
    },
    {
      header: "Status",
      key: "status",
      cell: (row) => getStatusBadge(row.status),
    },
    {
      header: "Age",
      key: "timestamp",
      cell: (row) => timeAgo(row.timestamp),
    },
  ];

  return (
    <div className="container-custom py-8 pt-24">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Transactions
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Browse and explore transactions on the Dharitri network
          </p>
        </div>
      </div>

      <Card className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between px-6 py-4 border-b border-gray-100 dark:border-gray-700">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4 md:mb-0">
            <FaExchangeAlt className="inline-block mr-2 text-primary" />
            Transaction History
          </h2>

          <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
            {/* Filter dropdown */}
            <div className="relative">
              <div className="flex items-center space-x-2 text-sm text-gray-700 dark:text-gray-300">
                <FaFilter className="text-gray-500" />
                <span>Filter:</span>
                <select
                  value={filter}
                  onChange={(e) => handleFilterChange(e.target.value)}
                  className="bg-gray-100 dark:bg-gray-800 border-0 rounded py-1 px-2 focus:ring-primary focus:border-primary"
                >
                  {filterOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Time range dropdown */}
            <div className="relative">
              <div className="flex items-center space-x-2 text-sm text-gray-700 dark:text-gray-300">
                <FaClock className="text-gray-500" />
                <span>Time:</span>
                <select
                  value={timeRange}
                  onChange={(e) => handleTimeRangeChange(e.target.value)}
                  className="bg-gray-100 dark:bg-gray-800 border-0 rounded py-1 px-2 focus:ring-primary focus:border-primary"
                >
                  {timeRangeOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Sort order button */}
            <button
              onClick={handleSortOrderChange}
              className="flex items-center space-x-2 text-sm text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 rounded py-1 px-3"
            >
              <FaSortAmountDown
                className={`transition-transform ${
                  sortOrder === "asc" ? "rotate-180" : ""
                }`}
              />
              <span>
                {sortOrder === "desc" ? "Newest First" : "Oldest First"}
              </span>
            </button>
          </div>
        </div>

        <Table
          columns={txColumns}
          data={transactions}
          isLoading={isLoading}
          emptyMessage="No transactions found"
          striped={true}
          highlightOnHover={true}
        />

        {transactions.length > 0 && !isLoading && (
          <div className="px-6 py-4 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 md:mb-0">
                Showing{" "}
                {(pagination.currentPage - 1) * pagination.itemsPerPage + 1} to{" "}
                {Math.min(
                  pagination.currentPage * pagination.itemsPerPage,
                  pagination.totalItems
                )}{" "}
                of {pagination.totalItems} transactions
              </p>
              <Pagination
                currentPage={pagination.currentPage}
                totalPages={pagination.totalPages}
                onPageChange={handlePageChange}
              />
            </div>
          </div>
        )}
      </Card>

      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-4 rounded-lg text-center">
          <p>{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-2 px-4 py-2 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded"
          >
            Retry
          </button>
        </div>
      )}
    </div>
  );
};

export default Transactions;
