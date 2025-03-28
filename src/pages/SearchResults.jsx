import React, { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
  FaSearch,
  FaCubes,
  FaExchangeAlt,
  FaUser,
  FaCoins,
} from "react-icons/fa";
import apiService from "../utils/api";
import {
  formatNumber,
  formatAddress,
  formatTimestamp,
} from "../utils/formatters";

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [results, setResults] = useState(null);
  const [activeTab, setActiveTab] = useState("all");

  useEffect(() => {
    const searchData = async () => {
      if (!query) {
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        const response = await apiService.search(query);
        setResults(response);

        // Set the active tab based on the results
        if (response.type) {
          setActiveTab(response.type);
        }
      } catch (err) {
        setError("Failed to perform search");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    searchData();
  }, [query]);

  const renderResultsByType = (type) => {
    if (!results || !results.data) return null;

    switch (type) {
      case "transaction":
        return (
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-md overflow-x-auto p-6">
            <h3 className="text-lg font-semibold mb-4">Transaction Details</h3>
            <Link
              to={`/transaction/${results.data.hash}`}
              className="block hover:bg-gray-50 dark:hover:bg-gray-800/50 p-4 rounded-lg border border-gray-200 dark:border-gray-700 mb-4"
            >
              <div className="flex flex-col md:flex-row md:justify-between mb-2">
                <div className="font-medium text-primary">Transaction Hash</div>
                <div className="font-mono text-sm">{results.data.hash}</div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    From
                  </div>
                  <div className="font-mono text-sm mt-1">
                    {formatAddress(results.data.from, 12)}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    To
                  </div>
                  <div className="font-mono text-sm mt-1">
                    {formatAddress(results.data.to, 12)}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    Status
                  </div>
                  <div
                    className={`text-sm mt-1 ${
                      results.data.status === "success"
                        ? "text-green-600 dark:text-green-400"
                        : results.data.status === "pending"
                        ? "text-yellow-600 dark:text-yellow-400"
                        : "text-red-600 dark:text-red-400"
                    }`}
                  >
                    {results.data.status.charAt(0).toUpperCase() +
                      results.data.status.slice(1)}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    Time
                  </div>
                  <div className="text-sm mt-1">
                    {formatTimestamp(results.data.timestamp)}
                  </div>
                </div>
              </div>
            </Link>
            <div className="flex justify-center">
              <Link
                to={`/transaction/${results.data.hash}`}
                className="inline-flex items-center px-4 py-2 bg-primary hover:bg-primary-700 text-white rounded-md"
              >
                View Full Transaction Details
              </Link>
            </div>
          </div>
        );

      case "block":
        return (
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-md overflow-x-auto p-6">
            <h3 className="text-lg font-semibold mb-4">Block Details</h3>
            <Link
              to={`/block/${results.data.number}`}
              className="block hover:bg-gray-50 dark:hover:bg-gray-800/50 p-4 rounded-lg border border-gray-200 dark:border-gray-700 mb-4"
            >
              <div className="flex flex-col md:flex-row md:justify-between mb-2">
                <div className="font-medium text-primary">
                  Block #{results.data.number}
                </div>
                <div className="font-mono text-sm">
                  {formatAddress(results.data.hash, 16)}
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    Transactions
                  </div>
                  <div className="text-sm mt-1">
                    {results.data.transactions}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    Validator
                  </div>
                  <div className="font-mono text-sm mt-1">
                    {formatAddress(results.data.validator, 8)}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    Size
                  </div>
                  <div className="text-sm mt-1">
                    {formatNumber(results.data.gasUsed)} bytes
                  </div>
                </div>
                <div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    Time
                  </div>
                  <div className="text-sm mt-1">
                    {formatTimestamp(results.data.timestamp)}
                  </div>
                </div>
              </div>
            </Link>
            <div className="flex justify-center">
              <Link
                to={`/block/${results.data.number}`}
                className="inline-flex items-center px-4 py-2 bg-primary hover:bg-primary-700 text-white rounded-md"
              >
                View Full Block Details
              </Link>
            </div>
          </div>
        );

      case "account":
        return (
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-md overflow-x-auto p-6">
            <h3 className="text-lg font-semibold mb-4">Account Details</h3>
            <Link
              to={`/account/${results.data.address}`}
              className="block hover:bg-gray-50 dark:hover:bg-gray-800/50 p-4 rounded-lg border border-gray-200 dark:border-gray-700 mb-4"
            >
              <div className="flex flex-col mb-2">
                <div className="font-medium text-primary">Address</div>
                <div className="font-mono text-sm break-all">
                  {results.data.address}
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                <div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    Balance
                  </div>
                  <div className="text-sm mt-1">
                    {formatNumber(results.data.balance)} DRT
                  </div>
                </div>
                <div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    Transactions
                  </div>
                  <div className="text-sm mt-1">
                    {formatNumber(results.data.txCount)}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    Type
                  </div>
                  <div className="text-sm mt-1">
                    {results.data.isSmartContract ? "Smart Contract" : "Wallet"}
                  </div>
                </div>
              </div>
            </Link>
            <div className="flex justify-center">
              <Link
                to={`/account/${results.data.address}`}
                className="inline-flex items-center px-4 py-2 bg-primary hover:bg-primary-700 text-white rounded-md"
              >
                View Full Account Details
              </Link>
            </div>
          </div>
        );

      case "token":
        return (
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-md overflow-x-auto p-6">
            <h3 className="text-lg font-semibold mb-4">Token Details</h3>
            <Link
              to={`/token/${results.data.id}`}
              className="block hover:bg-gray-50 dark:hover:bg-gray-800/50 p-4 rounded-lg border border-gray-200 dark:border-gray-700 mb-4"
            >
              <div className="flex items-center mb-2">
                <div className="flex-shrink-0 h-10 w-10 bg-primary/20 rounded-full flex items-center justify-center text-sm font-medium text-primary">
                  {results.data.symbol.substring(0, 2)}
                </div>
                <div className="ml-4">
                  <div className="font-medium text-primary">
                    {results.data.name}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {results.data.symbol}
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                <div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    Price
                  </div>
                  <div className="text-sm mt-1">
                    ${results.data.price.toFixed(4)}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    Market Cap
                  </div>
                  <div className="text-sm mt-1">
                    ${formatNumber(results.data.marketCap)}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    Holders
                  </div>
                  <div className="text-sm mt-1">
                    {formatNumber(results.data.holders)}
                  </div>
                </div>
              </div>
            </Link>
            <div className="flex justify-center">
              <Link
                to={`/token/${results.data.id}`}
                className="inline-flex items-center px-4 py-2 bg-primary hover:bg-primary-700 text-white rounded-md"
              >
                View Full Token Details
              </Link>
            </div>
          </div>
        );

      default:
        return (
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-md p-6">
            <div className="text-center text-gray-500 dark:text-gray-400">
              No matching results found for "{query}"
            </div>
          </div>
        );
    }
  };

  const renderNoResults = () => (
    <div className="bg-white dark:bg-gray-900 rounded-xl shadow-md p-8 text-center">
      <FaSearch className="h-16 w-16 mx-auto text-gray-300 dark:text-gray-600 mb-4" />
      <h3 className="text-xl font-semibold mb-2">No results found</h3>
      <p className="text-gray-500 dark:text-gray-400 mb-6">
        No items match your search query: "{query}"
      </p>
      <div className="text-sm text-gray-500 dark:text-gray-400">
        <p className="mb-2">Try searching for:</p>
        <ul className="list-disc list-inside text-left max-w-md mx-auto">
          <li>Transaction hash (e.g., 0x...)</li>
          <li>Block number (e.g., 12345)</li>
          <li>Account address (e.g., 0x...)</li>
          <li>Token name or symbol</li>
        </ul>
      </div>
    </div>
  );

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Search Results: {query}</h1>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Search Results: {query}</h1>
        <div className="bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400 p-4 rounded-lg">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <h1 className="text-2xl font-bold mb-6">Search Results: {query}</h1>

      {results && results.type ? (
        <div className="mb-6">
          <div className="border-b border-gray-200 dark:border-gray-700">
            <nav className="flex -mb-px">
              {["all", "transaction", "block", "account", "token"].map(
                (tab) => (
                  <button
                    key={tab}
                    className={`mr-2 px-4 py-2 font-medium text-sm border-b-2 ${
                      activeTab === tab || (tab === "all" && !activeTab)
                        ? "border-primary text-primary"
                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300 dark:hover:border-gray-600"
                    }`}
                    onClick={() => setActiveTab(tab)}
                  >
                    <span className="flex items-center">
                      {tab === "all" && <FaSearch className="mr-2 h-4 w-4" />}
                      {tab === "transaction" && (
                        <FaExchangeAlt className="mr-2 h-4 w-4" />
                      )}
                      {tab === "block" && <FaCubes className="mr-2 h-4 w-4" />}
                      {tab === "account" && <FaUser className="mr-2 h-4 w-4" />}
                      {tab === "token" && <FaCoins className="mr-2 h-4 w-4" />}
                      {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </span>
                  </button>
                )
              )}
            </nav>
          </div>

          <div className="mt-6">
            {activeTab === "all" || activeTab === results.type
              ? renderResultsByType(results.type)
              : renderNoResults()}
          </div>
        </div>
      ) : (
        renderNoResults()
      )}
    </div>
  );
};

export default SearchResults;
