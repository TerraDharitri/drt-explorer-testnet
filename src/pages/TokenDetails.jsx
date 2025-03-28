import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import {
  FaExternalLinkAlt,
  FaCopy,
  FaCheck,
  FaChartLine,
} from "react-icons/fa";
import apiService from "../utils/api";
import {
  formatNumber,
  formatCurrency,
  formatTimestamp,
  formatAddress,
} from "../utils/formatters";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const TokenDetails = () => {
  const { tokenId } = useParams();
  const [token, setToken] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [copied, setCopied] = useState(false);
  const [timeRange, setTimeRange] = useState("1w"); // 1d, 1w, 1m, 3m, 1y
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const fetchToken = async () => {
      setIsLoading(true);
      setError(null);
      try {
        // Fetch token data
        const tokenResponse = await apiService.getToken(tokenId);
        setToken(tokenResponse);

        // For demo: Create mock chart data
        generateChartData(timeRange);

        // Fetch recent token transactions
        const txResponse = await apiService.getTokenTransactions(tokenId);
        setTransactions(txResponse.data?.slice(0, 10) || []);
      } catch (err) {
        setError("Failed to fetch token data");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchToken();
  }, [tokenId, timeRange]);

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const generateChartData = (range) => {
    let days;
    let label;

    switch (range) {
      case "1d":
        days = 1;
        label = "Last 24 Hours";
        break;
      case "1w":
        days = 7;
        label = "Last 7 Days";
        break;
      case "1m":
        days = 30;
        label = "Last Month";
        break;
      case "3m":
        days = 90;
        label = "Last 3 Months";
        break;
      case "1y":
        days = 365;
        label = "Last Year";
        break;
      default:
        days = 7;
    }

    // Generate dates
    const labels = [];
    const data = [];
    const now = new Date();

    for (let i = days; i >= 0; i--) {
      const date = new Date(now);
      date.setDate(date.getDate() - i);
      labels.push(
        date.toLocaleDateString("en-US", { month: "short", day: "numeric" })
      );

      // Generate random price data with some trend
      const basePrice = 5 + Math.random() * 5;
      const trendFactor = Math.sin((i / days) * Math.PI) * 2;
      const volatility = Math.random() * 0.4 - 0.2;
      data.push((basePrice + trendFactor + volatility).toFixed(2));
    }

    setChartData({
      labels,
      datasets: [
        {
          label: "Price (USD)",
          data,
          fill: false,
          backgroundColor: "#1a4dda",
          borderColor: "#1a4dda",
          tension: 0.4,
        },
      ],
    });
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  if (error || !token) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400 p-4 rounded-lg">
          {error || "Token not found"}
        </div>
      </div>
    );
  }

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        mode: "index",
        intersect: false,
      },
    },
    scales: {
      y: {
        grid: {
          color: "rgba(160, 174, 192, 0.1)",
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
    interaction: {
      mode: "index",
      intersect: false,
    },
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="mb-6">
        <nav className="flex" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1 md:space-x-3">
            <li className="inline-flex items-center">
              <Link
                to="/"
                className="text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-primary"
              >
                Home
              </Link>
            </li>
            <li>
              <div className="flex items-center">
                <span className="mx-2 text-gray-400">/</span>
                <Link
                  to="/tokens"
                  className="text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-primary"
                >
                  Tokens
                </Link>
              </div>
            </li>
            <li aria-current="page">
              <div className="flex items-center">
                <span className="mx-2 text-gray-400">/</span>
                <span className="text-gray-700 dark:text-gray-300">
                  {token.name}
                </span>
              </div>
            </li>
          </ol>
        </nav>
      </div>

      {/* Token Header */}
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-md p-6 mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div className="flex items-center">
            <div className="flex-shrink-0 h-16 w-16 bg-primary/20 rounded-full flex items-center justify-center text-xl font-medium text-primary">
              {token.symbol.substring(0, 2)}
            </div>
            <div className="ml-4">
              <h1 className="text-2xl font-bold">{token.name}</h1>
              <div className="flex items-center mt-1">
                <span className="text-gray-600 dark:text-gray-400">
                  {token.symbol}
                </span>
                <div className="ml-4 flex items-center">
                  <button
                    onClick={() => copyToClipboard(token.id)}
                    className="text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-primary"
                  >
                    {copied ? (
                      <FaCheck className="h-4 w-4" />
                    ) : (
                      <FaCopy className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-4 md:mt-0">
            <div className="text-3xl font-bold">
              {formatCurrency(token.price)}
            </div>
            <div
              className={`text-sm ${
                token.change24h >= 0
                  ? "text-green-600 dark:text-green-400"
                  : "text-red-600 dark:text-red-400"
              }`}
            >
              {token.change24h >= 0 ? "+" : ""}
              {token.change24h.toFixed(2)}% (24h)
            </div>
          </div>
        </div>
      </div>

      {/* Token Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-md p-6">
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Market Cap
          </div>
          <div className="text-xl font-semibold mt-1">
            {formatCurrency(token.marketCap)}
          </div>
        </div>
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-md p-6">
          <div className="text-sm text-gray-500 dark:text-gray-400">
            24h Volume
          </div>
          <div className="text-xl font-semibold mt-1">
            {formatCurrency(token.volume24h)}
          </div>
        </div>
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-md p-6">
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Holders
          </div>
          <div className="text-xl font-semibold mt-1">
            {formatNumber(token.holders)}
          </div>
        </div>
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-md p-6">
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Total Supply
          </div>
          <div className="text-xl font-semibold mt-1">
            {formatNumber(token.totalSupply)}
          </div>
        </div>
      </div>

      {/* Price Chart */}
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-md p-6 mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <FaChartLine /> Price History
          </h2>
          <div className="flex space-x-2 mt-2 md:mt-0">
            {["1d", "1w", "1m", "3m", "1y"].map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`px-3 py-1 rounded-md text-sm ${
                  timeRange === range
                    ? "bg-primary text-white"
                    : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700"
                }`}
              >
                {range.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
        <div className="h-80">
          {chartData && <Line data={chartData} options={chartOptions} />}
        </div>
      </div>

      {/* Token Transactions */}
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-md p-6 mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">Recent Transactions</h2>
          <Link
            to={`/token/${token.id}/transactions`}
            className="text-primary hover:text-primary-600 text-sm flex items-center"
          >
            View all <FaExternalLinkAlt className="ml-1 h-3 w-3" />
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-800">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                >
                  Hash
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                >
                  From
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                >
                  To
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                >
                  Value
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                >
                  Time
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-800">
              {transactions.length > 0 ? (
                transactions.map((tx) => (
                  <tr
                    key={tx.hash}
                    className="hover:bg-gray-50 dark:hover:bg-gray-800/50"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Link
                        to={`/transaction/${tx.hash}`}
                        className="text-primary hover:underline"
                      >
                        {formatAddress(tx.hash, 8)}
                      </Link>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Link
                        to={`/account/${tx.from}`}
                        className="text-primary hover:underline"
                      >
                        {formatAddress(tx.from, 6)}
                      </Link>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Link
                        to={`/account/${tx.to}`}
                        className="text-primary hover:underline"
                      >
                        {formatAddress(tx.to, 6)}
                      </Link>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {formatNumber(tx.value)} {token.symbol}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-500 dark:text-gray-400">
                      {formatTimestamp(tx.timestamp)}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="5"
                    className="px-6 py-4 text-center text-gray-500 dark:text-gray-400"
                  >
                    No transactions found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Token Information */}
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-md p-6">
        <h2 className="text-xl font-bold mb-4">Token Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <div className="mb-4">
              <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                Owner
              </div>
              <Link
                to={`/account/${token.owner}`}
                className="text-primary hover:underline"
              >
                {formatAddress(token.owner, 10)}
              </Link>
            </div>
            <div className="mb-4">
              <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                Token ID
              </div>
              <div className="flex items-center">
                <span className="mr-2">{token.id}</span>
                <button
                  onClick={() => copyToClipboard(token.id)}
                  className="text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-primary"
                >
                  {copied ? (
                    <FaCheck className="h-4 w-4" />
                  ) : (
                    <FaCopy className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>
          </div>
          <div>
            <div className="mb-4">
              <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                Total Transfers
              </div>
              <div>{formatNumber(token.transfers || 0)}</div>
            </div>
            <div className="mb-4">
              <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                Total Accounts
              </div>
              <div>{formatNumber(token.accounts || 0)}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TokenDetails;
