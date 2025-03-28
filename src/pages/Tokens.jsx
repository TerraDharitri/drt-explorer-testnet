import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FaSearch,
  FaSort,
  FaSortUp,
  FaSortDown,
  FaInfoCircle,
} from "react-icons/fa";
import { formatNumber, formatCurrency } from "../utils/formatters";

const Tokens = () => {
  const [tokens, setTokens] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortField, setSortField] = useState("marketCap");
  const [sortDirection, setSortDirection] = useState("desc");
  const pageSize = 10;

  useEffect(() => {
    const fetchTokens = async () => {
      setIsLoading(true);
      setError(null);
      try {
        // In a real app, we would call an API
        // Generating mock data for demonstration

        setTimeout(() => {
          // Generate mock data
          const mockTokens = Array.from({ length: 30 }).map((_, index) => {
            const isREWA = index === 0;
            const name = isREWA ? "Dharitri" : `Token ${index + 1}`;
            const symbol = isREWA ? "REWA" : `TKN${index + 1}`;
            const basePrice = isREWA ? 25.75 : Math.random() * 10;
            const marketCap = isREWA ? 2500000000 : Math.random() * 1000000000;
            const change24h = Math.random() * 20 - 10; // between -10% and +10%

            return {
              id: isREWA ? "rewa" : `token-${index}`,
              name,
              symbol,
              price: basePrice,
              change24h,
              volume24h: Math.random() * 5000000 + 1000000,
              marketCap,
              holders: Math.floor(Math.random() * 50000) + 1000,
              decimals: 18,
              type: isREWA
                ? "native"
                : Math.random() > 0.5
                ? "esdt"
                : "meta-esdt",
              issuer:
                Math.random() > 0.7
                  ? "contract-" + Math.random().toString(36).substring(2, 10)
                  : null,
              supply: isREWA
                ? "23500000000000000000000000"
                : (Math.random() * 100000000000).toFixed(0).toString(),
            };
          });

          // Sort tokens according to current sort criteria
          const sortedTokens = sortTokens(mockTokens, sortField, sortDirection);

          // Paginate data
          const start = (currentPage - 1) * pageSize;
          const end = start + pageSize;
          const paginatedTokens = sortedTokens.slice(start, end);

          setTokens(paginatedTokens);
          setTotalPages(Math.ceil(mockTokens.length / pageSize));
          setIsLoading(false);
        }, 800);
      } catch (err) {
        setError("Failed to fetch tokens");
        console.error(err);
        setIsLoading(false);
      }
    };

    fetchTokens();
  }, [currentPage, sortField, sortDirection]);

  // Helper function to sort tokens
  const sortTokens = (tokensToSort, field, direction) => {
    return [...tokensToSort].sort((a, b) => {
      if (field === "name" || field === "symbol") {
        // Sort strings alphabetically
        return direction === "asc"
          ? a[field].localeCompare(b[field])
          : b[field].localeCompare(a[field]);
      } else {
        // Sort numbers
        return direction === "asc" ? a[field] - b[field] : b[field] - a[field];
      }
    });
  };

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("desc");
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    // Filter tokens by search query
    console.log("Searching for:", searchQuery);
    // In a real app, we would filter tokens or call an API with search parameters
  };

  const renderSortIcon = (field) => {
    if (sortField !== field) return <FaSort className="ml-1 text-gray-400" />;
    if (sortDirection === "asc")
      return <FaSortUp className="ml-1 text-primary" />;
    return <FaSortDown className="ml-1 text-primary" />;
  };

  const renderPagination = () => {
    return (
      <div className="flex items-center justify-center mt-6 space-x-2">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage <= 1}
          className="px-3 py-1 rounded-md bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 disabled:opacity-50"
        >
          Previous
        </button>
        <span className="px-4 py-1 rounded-md bg-primary text-white">
          {currentPage}
        </span>
        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage >= totalPages}
          className="px-3 py-1 rounded-md bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    );
  };

  // Render a badge for token type
  const renderTokenTypeBadge = (type) => {
    let bgClass =
      "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200";

    if (type === "native") {
      bgClass =
        "bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-200";
    } else if (type === "esdt") {
      bgClass =
        "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-200";
    } else if (type === "meta-esdt") {
      bgClass =
        "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-200";
    }

    return (
      <span className={`px-2 py-1 rounded-full text-xs ${bgClass}`}>
        {type === "native" ? "Native" : type === "esdt" ? "ESDT" : "Meta-ESDT"}
      </span>
    );
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Tokens</h1>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Tokens</h1>
        <div className="bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400 p-4 rounded-lg">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <h1 className="text-2xl font-bold">Tokens</h1>
        <form onSubmit={handleSearch} className="mt-4 md:mt-0 relative">
          <input
            type="text"
            placeholder="Search tokens..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-4 py-2 w-full md:w-64 rounded-lg bg-gray-100 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <FaSearch className="absolute left-3 top-3 text-gray-400" />
        </form>
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-md overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-800">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort("name")}
              >
                <div className="flex items-center">
                  Token {renderSortIcon("name")}
                </div>
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort("price")}
              >
                <div className="flex items-center">
                  Price {renderSortIcon("price")}
                </div>
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort("change24h")}
              >
                <div className="flex items-center">
                  24h Change {renderSortIcon("change24h")}
                </div>
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort("volume24h")}
              >
                <div className="flex items-center">
                  24h Volume {renderSortIcon("volume24h")}
                </div>
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort("marketCap")}
              >
                <div className="flex items-center">
                  Market Cap {renderSortIcon("marketCap")}
                </div>
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort("holders")}
              >
                <div className="flex items-center">
                  Holders {renderSortIcon("holders")}
                </div>
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
              >
                Type
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-800">
            {tokens.length === 0 ? (
              <tr>
                <td
                  colSpan="7"
                  className="px-6 py-4 text-center text-gray-500 dark:text-gray-400"
                >
                  No tokens found
                </td>
              </tr>
            ) : (
              tokens.map((token) => (
                <tr
                  key={token.id}
                  className="hover:bg-gray-50 dark:hover:bg-gray-800/50"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center text-sm font-medium">
                        {token.symbol.substring(0, 2)}
                      </div>
                      <div className="ml-4">
                        <Link
                          to={`/token/${token.id}`}
                          className="text-sm font-medium text-primary hover:underline"
                        >
                          {token.name}
                        </Link>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {token.symbol}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    {formatCurrency(token.price)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span
                      className={`${
                        token.change24h >= 0
                          ? "text-green-600 dark:text-green-400"
                          : "text-red-600 dark:text-red-400"
                      }`}
                    >
                      {token.change24h >= 0 ? "+" : ""}
                      {token.change24h.toFixed(2)}%
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                    {formatCurrency(token.volume24h)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                    {formatCurrency(token.marketCap)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                    {formatNumber(token.holders)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    {renderTokenTypeBadge(token.type)}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {renderPagination()}

      {/* Information Card */}
      <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 mt-8">
        <div className="flex items-center mb-4">
          <FaInfoCircle className="text-primary mr-2" />
          <h2 className="text-lg font-semibold">About Dharitri Tokens</h2>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
          The Dharitri blockchain supports several token standards:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <h3 className="text-md font-medium mb-2">REWA (Native Token)</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              REWA is the native token of the Dharitri network. It's used for
              transaction fees, staking, and governance. REWA has 18 decimals
              and a total supply of 23.5 million tokens.
            </p>
          </div>
          <div>
            <h3 className="text-md font-medium mb-2">ESDT Tokens</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Dharitri Standard Digital Tokens (ESDT) are custom tokens that can
              be created by anyone on the Dharitri blockchain. They have similar
              properties to REWA but are managed by smart contracts.
            </p>
          </div>
          <div>
            <h3 className="text-md font-medium mb-2">Meta-ESDTs</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Meta-ESDTs are semi-fungible tokens that combine aspects of
              fungible and non-fungible tokens. They're perfect for representing
              collections of items with both unique and shared properties.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tokens;
