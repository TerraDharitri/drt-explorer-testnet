import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FaChartBar,
  FaChartLine,
  FaChartPie,
  FaInfoCircle,
  FaExchangeAlt,
  FaUsers,
  FaServer,
  FaCoins,
  FaClock,
  FaCubes,
  FaArrowUp,
  FaArrowDown,
} from "react-icons/fa";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Line, Bar, Pie } from "react-chartjs-2";
import {
  formatNumber,
  formatCrypto,
  formatPercent,
} from "../../utils/formatters";

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const Analytics = () => {
  const [statistics, setStatistics] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [chartType, setChartType] = useState("price");
  const [timeframe, setTimeframe] = useState("1w");
  const [selectedMetric, setSelectedMetric] = useState("transactions");

  // Mock data for demonstration
  useEffect(() => {
    const fetchAnalyticsData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        console.log("Fetching analytics data...");
        // Simulate API call
        setTimeout(() => {
          // Helper function to generate history data
          const generateHistoryData = (baseValue, variance, length) => {
            return Array(length)
              .fill(0)
              .map(() => baseValue + Math.random() * variance);
          };

          // Mock statistics data
          const mockStatistics = {
            price: {
              current: 0.25,
              change24h: 5.2,
              high24h: 0.27,
              low24h: 0.23,
              volume24h: 12000000,
              marketCap: 250000000,
              history: {
                "1d": generateHistoryData(0.2, 0.1, 24),
                "1w": generateHistoryData(0.2, 0.1, 7),
                "1m": generateHistoryData(0.15, 0.2, 30),
                "3m": generateHistoryData(0.1, 0.3, 12),
                "1y": generateHistoryData(0.05, 0.4, 12),
              },
            },
            transactions: {
              total: 58654321,
              daily: 125432,
              change24h: 12.5,
              avgFee: 0.00025,
              history: {
                "1d": generateHistoryData(4000, 2000, 24),
                "1w": generateHistoryData(100000, 50000, 7),
                "1m": generateHistoryData(80000, 100000, 30),
                "3m": generateHistoryData(50000, 150000, 12),
                "1y": generateHistoryData(30000, 200000, 12),
              },
            },
            accounts: {
              total: 742935,
              new24h: 1234,
              active24h: 52436,
              change24h: 2.3,
              history: {
                "1d": generateHistoryData(1000, 500, 24),
                "1w": generateHistoryData(5000, 3000, 7),
                "1m": generateHistoryData(4000, 5000, 30),
                "3m": generateHistoryData(3000, 7000, 12),
                "1y": generateHistoryData(2000, 10000, 12),
              },
            },
            staking: {
              totalStaked: 500000000,
              stakingAPR: 12.5,
              activeValidators: 2000,
              history: {
                "1d": generateHistoryData(490000000, 20000000, 24),
                "1w": generateHistoryData(480000000, 40000000, 7),
                "1m": generateHistoryData(470000000, 60000000, 30),
                "3m": generateHistoryData(450000000, 100000000, 12),
                "1y": generateHistoryData(400000000, 200000000, 12),
              },
            },
            shardDistribution: {
              "Shard 0": 35,
              "Shard 1": 30,
              "Shard 2": 25,
              Metachain: 10,
            },
            transactionTypes: {
              Transfer: 60,
              "Smart Contract": 25,
              "NFT Transfer": 10,
              Staking: 5,
            },
          };

          console.log(
            "Mock data prepared with timeframes:",
            Object.keys(mockStatistics.price.history)
          );
          setStatistics(mockStatistics);
          setIsLoading(false);
          console.log("Analytics data loaded successfully");
        }, 1000);
      } catch (err) {
        console.error("Error fetching analytics data:", err);
        setError(
          "Failed to load analytics data. Please try refreshing the page."
        );
        setIsLoading(false);
      }
    };

    fetchAnalyticsData();
  }, []);

  const getChartData = (type, timeframe) => {
    if (!statistics) {
      return {
        labels: [],
        datasets: [
          {
            label: "",
            data: [],
          },
        ],
      };
    }

    // Generate labels based on timeframe
    let labels = [];
    if (timeframe === "1d") {
      labels = Array.from({ length: 24 }, (_, i) => `${i}:00`);
    } else if (timeframe === "1w") {
      labels = Array.from({ length: 7 }, (_, i) => {
        const d = new Date();
        d.setDate(d.getDate() - (6 - i));
        return d.toLocaleDateString("en-US", { weekday: "short" });
      });
    } else if (timeframe === "1m") {
      labels = Array.from({ length: 30 }, (_, i) => {
        const d = new Date();
        d.setDate(d.getDate() - (29 - i));
        return `${d.getDate()}/${d.getMonth() + 1}`;
      });
    } else if (timeframe === "3m") {
      labels = Array.from({ length: 12 }, (_, i) => {
        const d = new Date();
        d.setDate(d.getDate() - (90 - i * 7));
        return `${d.getDate()}/${d.getMonth() + 1}`;
      });
    } else if (timeframe === "1y") {
      labels = Array.from({ length: 12 }, (_, i) => {
        const d = new Date();
        d.setMonth(d.getMonth() - (11 - i));
        return d.toLocaleDateString("en-US", { month: "short" });
      });
    }

    if (type === "price") {
      const data =
        statistics.price.history[timeframe] || Array(labels.length).fill(0);
      return {
        labels,
        datasets: [
          {
            label: "REWA Price (USD)",
            data,
            borderColor: "rgb(22, 163, 74)",
            backgroundColor: "rgba(22, 163, 74, 0.1)",
            fill: true,
            tension: 0.4,
          },
        ],
      };
    } else if (type === "transactions") {
      const data =
        statistics.transactions.history[timeframe] ||
        Array(labels.length).fill(0);
      return {
        labels,
        datasets: [
          {
            label: "Transactions",
            data,
            backgroundColor: "rgb(59, 130, 246)",
            borderRadius: 4,
          },
        ],
      };
    } else if (type === "gas") {
      // For gas data, we'll use a calculated percentage of transaction volume
      const txData =
        statistics.transactions.history[timeframe] ||
        Array(labels.length).fill(0);
      const gasData = txData.map((val) => val * 0.5 + Math.random() * 1000);
      return {
        labels,
        datasets: [
          {
            label: "Gas Used",
            data: gasData,
            borderColor: "rgb(249, 115, 22)",
            backgroundColor: "rgba(249, 115, 22, 0.1)",
            fill: true,
            tension: 0.4,
          },
        ],
      };
    } else if (type === "accounts") {
      const data =
        statistics.accounts.history[timeframe] || Array(labels.length).fill(0);
      return {
        labels,
        datasets: [
          {
            label: "Active Addresses",
            data,
            borderColor: "rgb(139, 92, 246)",
            backgroundColor: "rgba(139, 92, 246, 0.1)",
            fill: true,
            tension: 0.4,
          },
        ],
      };
    }
    return null;
  };

  const getChartOptions = (type) => {
    const baseOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: true,
          position: "top",
          labels: {
            color: document.documentElement.classList.contains("dark")
              ? "#e5e7eb"
              : "#374151",
            font: {
              size: 12,
            },
          },
        },
        tooltip: {
          mode: "index",
          intersect: false,
        },
      },
      scales: {
        x: {
          ticks: {
            color: document.documentElement.classList.contains("dark")
              ? "#9ca3af"
              : "#6b7280",
          },
          grid: {
            display: false,
          },
        },
        y: {
          ticks: {
            color: document.documentElement.classList.contains("dark")
              ? "#9ca3af"
              : "#6b7280",
          },
          grid: {
            color: document.documentElement.classList.contains("dark")
              ? "rgba(107, 114, 128, 0.2)"
              : "rgba(229, 231, 235, 0.8)",
          },
          beginAtZero: true,
        },
      },
    };

    if (type === "price") {
      return {
        ...baseOptions,
        scales: {
          ...baseOptions.scales,
          y: {
            ...baseOptions.scales.y,
            ticks: {
              ...baseOptions.scales.y.ticks,
              callback: (value) => `$${value}`,
            },
          },
        },
      };
    }

    return baseOptions;
  };

  const getPieChartData = (distribution) => {
    const labels = Object.keys(distribution);
    const data = Object.values(distribution);

    const backgroundColors = [
      "rgba(59, 130, 246, 0.8)", // blue
      "rgba(16, 185, 129, 0.8)", // green
      "rgba(249, 115, 22, 0.8)", // orange
      "rgba(139, 92, 246, 0.8)", // purple
      "rgba(239, 68, 68, 0.8)", // red
    ];

    return {
      labels,
      datasets: [
        {
          data,
          backgroundColor: backgroundColors.slice(0, data.length),
          borderColor: "transparent",
        },
      ],
    };
  };

  const getPieChartOptions = () => {
    return {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: "right",
          labels: {
            color: document.documentElement.classList.contains("dark")
              ? "#e5e7eb"
              : "#374151",
            font: {
              size: 12,
            },
          },
        },
        tooltip: {
          callbacks: {
            label: (context) => `${context.label}: ${context.raw}%`,
          },
        },
      },
    };
  };

  const getChartLabel = (type) => {
    switch (type) {
      case "price":
        return "REWA Price (USD)";
      case "transactions":
        return "Transaction Count";
      case "gas":
        return "Gas Used";
      case "accounts":
        return "Active Addresses";
      default:
        return "";
    }
  };

  const getTimeframeButtons = () => {
    // Make sure we only show timeframes that we have data for
    const availableTimeframes = statistics
      ? Object.keys(statistics.price.history)
      : ["1d", "1w", "1m", "3m"];

    const timeframes = [
      { label: "1D", value: "1d" },
      { label: "1W", value: "1w" },
      { label: "1M", value: "1m" },
      { label: "3M", value: "3m" },
    ];

    // Add 1Y option if we have enough data (or just for UI completeness)
    if (statistics && statistics.price.history["1y"]) {
      timeframes.push({ label: "1Y", value: "1y" });
    }

    return (
      <div className="flex space-x-2 mb-4">
        {timeframes
          .filter((tf) => availableTimeframes.includes(tf.value))
          .map((tf) => (
            <button
              key={tf.value}
              onClick={() => setTimeframe(tf.value)}
              className={`px-3 py-1.5 text-sm font-medium rounded ${
                timeframe === tf.value
                  ? "bg-primary text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
              }`}
            >
              {tf.label}
            </button>
          ))}
      </div>
    );
  };

  const getChartTypeButtons = () => {
    const types = [
      {
        label: "Price",
        value: "price",
        icon: <FaChartLine className="mr-1.5" />,
      },
      {
        label: "Transactions",
        value: "transactions",
        icon: <FaExchangeAlt className="mr-1.5" />,
      },
      { label: "Gas", value: "gas", icon: <FaChartBar className="mr-1.5" /> },
      {
        label: "Accounts",
        value: "accounts",
        icon: <FaUsers className="mr-1.5" />,
      },
    ];

    return (
      <div className="flex flex-wrap gap-2 mb-6">
        {types.map((type) => (
          <button
            key={type.value}
            onClick={() => setChartType(type.value)}
            className={`px-4 py-2 text-sm font-medium rounded-lg flex items-center ${
              chartType === type.value
                ? "bg-primary text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
            }`}
          >
            {type.icon} {type.label}
          </button>
        ))}
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Analytics</h1>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Analytics</h1>
        <div className="bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400 p-4 rounded-lg">
          {error}
        </div>
      </div>
    );
  }

  if (!statistics) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Analytics</h1>
        <div className="bg-yellow-100 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-400 p-4 rounded-lg">
          No analytics data available. Please try again later.
        </div>
      </div>
    );
  }

  const getChangeColorClass = (value) => {
    return value >= 0
      ? "text-green-500 dark:text-green-400"
      : "text-red-500 dark:text-red-400";
  };

  const getChangeIcon = (value) => {
    return value >= 0 ? (
      <FaArrowUp className="inline" />
    ) : (
      <FaArrowDown className="inline" />
    );
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <h1 className="text-2xl font-bold mb-6">Dharitri Analytics</h1>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="text-gray-500 dark:text-gray-400">REWA Price</div>
            <div className="bg-blue-100 dark:bg-blue-900/20 p-2 rounded-lg">
              <FaChartLine className="text-blue-500 dark:text-blue-400" />
            </div>
          </div>
          <div className="text-2xl font-bold mb-2">
            ${statistics.price.current.toFixed(2)}
          </div>
          <div
            className={`text-sm ${getChangeColorClass(
              statistics.price.change24h
            )}`}
          >
            {getChangeIcon(statistics.price.change24h)}{" "}
            {formatPercent(Math.abs(statistics.price.change24h))} (24h)
          </div>
          <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
            Market Cap: ${formatNumber(statistics.price.marketCap)}
          </div>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="text-gray-500 dark:text-gray-400">
              Transactions (24h)
            </div>
            <div className="bg-green-100 dark:bg-green-900/20 p-2 rounded-lg">
              <FaExchangeAlt className="text-green-500 dark:text-green-400" />
            </div>
          </div>
          <div className="text-2xl font-bold mb-2">
            {formatNumber(statistics.transactions.count24h)}
          </div>
          <div
            className={`text-sm ${getChangeColorClass(
              statistics.transactions.change24h
            )}`}
          >
            {getChangeIcon(statistics.transactions.change24h)}{" "}
            {formatPercent(Math.abs(statistics.transactions.change24h))} (24h)
          </div>
          <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
            Avg Time: {statistics.transactions.avgTime}s
          </div>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="text-gray-500 dark:text-gray-400">
              Active Accounts (24h)
            </div>
            <div className="bg-purple-100 dark:bg-purple-900/20 p-2 rounded-lg">
              <FaUsers className="text-purple-500 dark:text-purple-400" />
            </div>
          </div>
          <div className="text-2xl font-bold mb-2">
            {formatNumber(statistics.accounts.active24h)}
          </div>
          <div
            className={`text-sm ${getChangeColorClass(
              statistics.accounts.change24h
            )}`}
          >
            {getChangeIcon(statistics.accounts.change24h)}{" "}
            {formatPercent(Math.abs(statistics.accounts.change24h))} (24h)
          </div>
          <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
            New Accounts: {formatNumber(statistics.accounts.newAccounts24h)}
          </div>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="text-gray-500 dark:text-gray-400">
              Total Staked REWA
            </div>
            <div className="bg-orange-100 dark:bg-orange-900/20 p-2 rounded-lg">
              <FaServer className="text-orange-500 dark:text-orange-400" />
            </div>
          </div>
          <div className="text-2xl font-bold mb-2">
            {formatNumber(statistics.staking.totalStaked)} REWA
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Staking APR: {formatPercent(statistics.staking.stakingAPR)}
          </div>
          <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
            Active Validators:{" "}
            {formatNumber(statistics.staking.activeValidators)}
          </div>
        </div>
      </div>

      {/* Chart Section */}
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">
          {getChartLabel(chartType)} Chart
        </h2>
        {getChartTypeButtons()}
        {getTimeframeButtons()}
        <div className="h-96">
          {chartType === "transactions" ? (
            <Bar
              data={getChartData(chartType, timeframe)}
              options={getChartOptions(chartType)}
            />
          ) : (
            <Line
              data={getChartData(chartType, timeframe)}
              options={getChartOptions(chartType)}
            />
          )}
        </div>
      </div>

      {/* Distribution Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Shard Distribution</h2>
          <div className="h-80">
            <Pie
              data={getPieChartData(statistics.shardDistribution)}
              options={getPieChartOptions()}
            />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Transaction Types</h2>
          <div className="h-80">
            <Pie
              data={getPieChartData(statistics.transactionTypes)}
              options={getPieChartOptions()}
            />
          </div>
        </div>
      </div>

      {/* Additional Statistics */}
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Key Metrics</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div>
            <h3 className="text-lg font-medium mb-4">Price & Market</h3>
            <ul className="space-y-3">
              <li className="flex justify-between">
                <span className="text-gray-500 dark:text-gray-400">
                  Current Price
                </span>
                <span className="font-medium">
                  ${statistics.price.current.toFixed(2)}
                </span>
              </li>
              <li className="flex justify-between">
                <span className="text-gray-500 dark:text-gray-400">
                  24h High
                </span>
                <span className="font-medium">
                  ${statistics.price.high24h.toFixed(2)}
                </span>
              </li>
              <li className="flex justify-between">
                <span className="text-gray-500 dark:text-gray-400">
                  24h Low
                </span>
                <span className="font-medium">
                  ${statistics.price.low24h.toFixed(2)}
                </span>
              </li>
              <li className="flex justify-between">
                <span className="text-gray-500 dark:text-gray-400">
                  Market Cap
                </span>
                <span className="font-medium">
                  ${formatNumber(statistics.price.marketCap)}
                </span>
              </li>
              <li className="flex justify-between">
                <span className="text-gray-500 dark:text-gray-400">
                  24h Volume
                </span>
                <span className="font-medium">
                  ${formatNumber(statistics.price.volume24h)}
                </span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-4">Transactions</h3>
            <ul className="space-y-3">
              <li className="flex justify-between">
                <span className="text-gray-500 dark:text-gray-400">
                  Total Transactions
                </span>
                <span className="font-medium">
                  {formatNumber(statistics.transactions.total)}
                </span>
              </li>
              <li className="flex justify-between">
                <span className="text-gray-500 dark:text-gray-400">
                  24h Count
                </span>
                <span className="font-medium">
                  {formatNumber(statistics.transactions.count24h)}
                </span>
              </li>
              <li className="flex justify-between">
                <span className="text-gray-500 dark:text-gray-400">
                  Avg Time
                </span>
                <span className="font-medium">
                  {statistics.transactions.avgTime}s
                </span>
              </li>
              <li className="flex justify-between">
                <span className="text-gray-500 dark:text-gray-400">
                  Success Rate
                </span>
                <span className="font-medium">
                  {statistics.transactions.successRate}%
                </span>
              </li>
              <li className="flex justify-between">
                <span className="text-gray-500 dark:text-gray-400">
                  Avg Fee
                </span>
                <span className="font-medium">
                  {statistics.transactions.avgFee} REWA
                </span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-4">Accounts</h3>
            <ul className="space-y-3">
              <li className="flex justify-between">
                <span className="text-gray-500 dark:text-gray-400">
                  Total Accounts
                </span>
                <span className="font-medium">
                  {formatNumber(statistics.accounts.total)}
                </span>
              </li>
              <li className="flex justify-between">
                <span className="text-gray-500 dark:text-gray-400">
                  Active (24h)
                </span>
                <span className="font-medium">
                  {formatNumber(statistics.accounts.active24h)}
                </span>
              </li>
              <li className="flex justify-between">
                <span className="text-gray-500 dark:text-gray-400">
                  New (24h)
                </span>
                <span className="font-medium">
                  {formatNumber(statistics.accounts.newAccounts24h)}
                </span>
              </li>
              <li className="flex justify-between">
                <span className="text-gray-500 dark:text-gray-400">
                  Smart Contracts
                </span>
                <span className="font-medium">
                  {formatNumber(statistics.accounts.withSmartContracts)}
                </span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-4">Staking</h3>
            <ul className="space-y-3">
              <li className="flex justify-between">
                <span className="text-gray-500 dark:text-gray-400">
                  Total Staked
                </span>
                <span className="font-medium">
                  {formatNumber(statistics.staking.totalStaked)} REWA
                </span>
              </li>
              <li className="flex justify-between">
                <span className="text-gray-500 dark:text-gray-400">
                  Staking APR
                </span>
                <span className="font-medium">
                  {statistics.staking.stakingAPR}%
                </span>
              </li>
              <li className="flex justify-between">
                <span className="text-gray-500 dark:text-gray-400">
                  Active Validators
                </span>
                <span className="font-medium">
                  {formatNumber(statistics.staking.activeValidators)}
                </span>
              </li>
              <li className="flex justify-between">
                <span className="text-gray-500 dark:text-gray-400">
                  Queue Size
                </span>
                <span className="font-medium">
                  {statistics.staking.queueSize}
                </span>
              </li>
              <li className="flex justify-between">
                <span className="text-gray-500 dark:text-gray-400">
                  Next Epoch
                </span>
                <span className="font-medium">
                  {statistics.staking.nextEpoch}
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Info Card */}
      <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6">
        <div className="flex items-center mb-4">
          <FaInfoCircle className="text-primary mr-2" />
          <h2 className="text-lg font-semibold">About Dharitri Analytics</h2>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
          The Analytics page provides insights into the Dharitri blockchain's
          performance, transaction activity, and ecosystem growth. The data is
          updated regularly to give you the most current overview of the
          network's health and activity.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-md font-medium mb-2">Chart Navigation</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Use the chart type buttons to toggle between different metrics
              (Price, Transactions, Gas, Accounts), and the timeframe buttons to
              adjust the time period shown in the chart. This allows you to
              analyze network trends over different time spans.
            </p>
          </div>
          <div>
            <h3 className="text-md font-medium mb-2">Key Metrics Explained</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              The Key Metrics section breaks down essential blockchain
              statistics into categories. Price & Market covers REWA's market
              performance, Transactions shows network activity, Accounts
              displays user metrics, and Staking provides information about the
              network's security and rewards.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
