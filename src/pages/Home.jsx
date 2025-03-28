import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaSearch,
  FaChartLine,
  FaServer,
  FaExchangeAlt,
  FaUsers,
  FaCoins,
  FaCubes,
  FaCube,
  FaNetworkWired,
  FaChartPie,
  FaArrowRight,
  FaAngleRight,
  FaGlobe,
  FaImage,
  FaTicketAlt,
  FaClock,
  FaChartBar,
  FaCode,
} from "react-icons/fa";
import Card from "../components/common/Card";
import StatCard from "../components/common/StatCard";
import Table from "../components/common/Table";
import HashLink from "../components/common/HashLink";
import Badge from "../components/common/Badge";
import Loading from "../components/common/Loading";
import {
  formatNumber,
  formatCurrency,
  timeAgo,
  shortenAddress,
  formatCrypto,
} from "../utils/formatters";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Line } from "react-chartjs-2";

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Filler
);

// Utility function to format large numbers with commas
const formatLargeNumber = (num) => {
  if (num === undefined || num === null) return "0";
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const Home = () => {
  const [stats, setStats] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [blocks, setBlocks] = useState([]);
  const [mostTransactedTokens, setMostTransactedTokens] = useState([]);
  const [mostTransactedNFTs, setMostTransactedNFTs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  // Analytics dashboard state
  const [blockHeight, setBlockHeight] = useState(14753000);
  const [totalTransactions, setTotalTransactions] = useState(504128649);
  const [dailyTransactions, setDailyTransactions] = useState(125000);
  const [accountsTotal, setAccountsTotal] = useState(1250000);
  const [activeAccounts, setActiveAccounts] = useState(45000);
  const [validatorsCount, setValidatorsCount] = useState(3200);
  const [validatorRegions, setValidatorRegions] = useState({
    northAmerica: 1250,
    percentage: 39,
  });
  const [epochData, setEpochData] = useState({
    current: 125,
    roundTime: 6,
    roundsLeft: 4320,
  });
  const [priceData, setPriceData] = useState({
    current: 38.42,
    change: 3.5,
    marketCap: 854000000,
    volume24h: 12500000,
    history: [
      32, 33, 32.5, 33.5, 34, 33.8, 34.2, 35, 34.8, 35.5, 36, 35.8, 36.5, 37,
      36.8, 37.2, 37.5, 37.3, 37.8, 38, 37.9, 38.2, 38.1, 38.3, 38.5, 38.4,
      38.6, 38.5, 38.7, 38.9,
    ],
  });
  const [stakingData, setStakingData] = useState({
    total: 12500000,
    percentage: 62.5,
    circulatingSupply: 20000000,
    usersStaking: 8520,
    apr: 9.8,
    history: [
      11000000, 11100000, 11200000, 11250000, 11300000, 11350000, 11400000,
      11450000, 11500000, 11550000, 11600000, 11650000, 11700000, 11750000,
      11800000, 11850000, 11900000, 11950000, 12000000, 12050000, 12100000,
      12150000, 12200000, 12250000, 12300000, 12350000, 12400000, 12450000,
      12500000, 12550000,
    ],
  });
  const [developerData, setDeveloperData] = useState({
    rewards: 350000,
    feesCaptured: 180000,
    appsDeployed: 820,
  });
  const [transactionChartData, setTransactionChartData] = useState({
    total: 54328761,
    applications: 41328761,
    standard: 13000000,
    history: {
      labels: Array(30)
        .fill("")
        .map((_, i) => `Day ${i + 1}`),
      datasets: [
        {
          label: "Applications",
          data: [
            380000, 390000, 385000, 400000, 410000, 405000, 415000, 420000,
            430000, 425000, 435000, 440000, 445000, 450000, 445000, 460000,
            465000, 470000, 475000, 480000, 485000, 490000, 500000, 505000,
            510000, 515000, 520000, 525000, 530000, 540000,
          ],
          borderColor: "#2dd4bf",
          backgroundColor: "rgba(45, 212, 191, 0.4)",
          fill: true,
          borderWidth: 2,
          tension: 0.4,
        },
        {
          label: "Standard",
          data: [
            150000, 155000, 152000, 158000, 160000, 162000, 165000, 168000,
            170000, 172000, 175000, 178000, 180000, 182000, 185000, 188000,
            190000, 192000, 195000, 198000, 200000, 202000, 205000, 208000,
            210000, 212000, 215000, 218000, 220000, 225000,
          ],
          borderColor: "#818cf8",
          backgroundColor: "rgba(129, 140, 248, 0.4)",
          fill: true,
          borderWidth: 2,
          tension: 0.4,
        },
      ],
    },
  });
  const [timeRange, setTimeRange] = useState("30d");

  // Update chart data when time range changes
  useEffect(() => {
    // This would typically fetch data from API based on timeRange
    // For now, we're just using our mock data
    console.log(`Time range changed to ${timeRange}`);
    // Here you would fetch new data and update transactionChartData
  }, [timeRange]);

  useEffect(() => {
    // In a real app, we'd fetch this data from API
    // For demo purposes, using mock data
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      console.log("Fetching dashboard data...");

      try {
        // Simulating API call delay
        await new Promise((resolve) => {
          setTimeout(() => {
            console.log("Creating mock data for dashboard...");

            // Mock transactions data
            const mockTransactions = Array(20)
              .fill(0)
              .map((_, i) => ({
                hash: `0x${Math.random().toString(16).substring(2, 64)}`,
                from: `erd1${Math.random().toString(16).substring(2, 40)}`,
                to: `erd1${Math.random().toString(16).substring(2, 40)}`,
                value: Math.random() * 1000,
                fee: Math.random() * 0.01,
                timestamp: Math.floor(Date.now() / 1000) - i * 60,
                status:
                  Math.random() > 0.1
                    ? "success"
                    : Math.random() > 0.5
                    ? "pending"
                    : "failed",
              }));

            // Mock blocks data
            const mockBlocks = [
              {
                hash:
                  "0xc23c7f8cf972c" +
                  Math.random().toString(16).substring(2, 44),
                nonce: 5000000,
                shard: 0,
                txCount: 45,
                size: 970000,
                timestamp: Math.floor(Date.now() / 1000) - 3600,
              },
              {
                hash:
                  "0xcb42bba8a410e" +
                  Math.random().toString(16).substring(2, 43),
                nonce: 5000000,
                shard: 1,
                txCount: 34,
                size: 633000,
                timestamp: Math.floor(Date.now() / 1000) - 7200,
              },
              {
                hash:
                  "0x6d08a4a18b257" +
                  Math.random().toString(16).substring(2, 43),
                nonce: 5000000,
                shard: 2,
                txCount: 6,
                size: 558000,
                timestamp: Math.floor(Date.now() / 1000) - 10800,
              },
              {
                hash:
                  "0x3beb5b637a2b6" +
                  Math.random().toString(16).substring(2, 43),
                nonce: 5000000,
                shard: 0,
                txCount: 47,
                size: 442000,
                timestamp: Math.floor(Date.now() / 1000) - 14400,
              },
              {
                hash:
                  "0x70a9a9c75df5d" +
                  Math.random().toString(16).substring(2, 43),
                nonce: 5000000,
                shard: 1,
                txCount: 14,
                size: 117000,
                timestamp: Math.floor(Date.now() / 1000) - 18000,
              },
              // Add more blocks to fill the space
              {
                hash:
                  "0x92a6b3c4d5e6f" +
                  Math.random().toString(16).substring(2, 43),
                nonce: 5000000,
                shard: 0,
                txCount: 38,
                size: 784000,
                timestamp: Math.floor(Date.now() / 1000) - 21600,
              },
              {
                hash:
                  "0x1a2b3c4d5e6f7" +
                  Math.random().toString(16).substring(2, 43),
                nonce: 5000000,
                shard: 2,
                txCount: 29,
                size: 512000,
                timestamp: Math.floor(Date.now() / 1000) - 25200,
              },
            ];

            // Mock most transacted tokens data
            const mockMostTransactedTokens = [
              {
                rank: 1,
                symbol: "REWA",
                name: "Reward Token",
                icon: "🪙",
                totalTxns: 18834,
              },
              {
                rank: 2,
                symbol: "USDC",
                name: "USD Coin",
                icon: "💵",
                totalTxns: 5614,
              },
              {
                rank: 3,
                symbol: "BNB",
                name: "Binance Coin",
                icon: "🪙",
                totalTxns: 4775,
              },
              {
                rank: 4,
                symbol: "REWA",
                name: "Dharitri REWA",
                icon: "💎",
                totalTxns: 2461,
              },
              {
                rank: 5,
                symbol: "MEX",
                name: "Maiar Exchange Token",
                icon: "🔄",
                totalTxns: 1488,
              },
              {
                rank: 6,
                symbol: "ESDT",
                name: "dharitri Standard Token",
                icon: "🪙",
                totalTxns: 1425,
              },
              {
                rank: 7,
                symbol: "HTM",
                name: "Hatom Protocol",
                icon: "🔶",
                totalTxns: 1378,
              },
              {
                rank: 8,
                symbol: "ASH",
                name: "Ashswap Token",
                icon: "🔥",
                totalTxns: 1353,
              },
              {
                rank: 9,
                symbol: "LPAD",
                name: "Launchpad Token",
                icon: "🚀",
                totalTxns: 1317,
              },
              {
                rank: 10,
                symbol: "RIDE",
                name: "Holoride Token",
                icon: "🚗",
                totalTxns: 1134,
              },
            ];

            // Mock most transacted NFTs data
            const mockMostTransactedNFTs = [
              {
                rank: 1,
                name: "DragonRealm Items",
                icon: "🎮",
                items: 225702,
                holders: 7855,
                totalTxns: 761,
              },
              {
                rank: 2,
                name: "Dharitri Gateways",
                icon: "🌀",
                items: 17,
                holders: 36537,
                totalTxns: 435,
              },
              {
                rank: 3,
                name: "Gateway Badges",
                icon: "🏆",
                items: 15,
                holders: 169889,
                totalTxns: 409,
              },
              {
                rank: 4,
                name: "Wood",
                icon: "🪵",
                items: 1,
                holders: 376,
                totalTxns: 122,
              },
              {
                rank: 5,
                name: "Stone",
                icon: "🪨",
                items: 1,
                holders: 219,
                totalTxns: 122,
              },
              {
                rank: 6,
                name: "Wheat",
                icon: "🌾",
                items: 1,
                holders: 284,
                totalTxns: 118,
              },
              {
                rank: 7,
                name: "DHARITRI MONKEYS",
                icon: "🐵",
                items: 10000,
                holders: 1119,
                totalTxns: 63,
              },
              {
                rank: 8,
                name: "Dharitri Airdrop",
                icon: "🪂",
                items: 1,
                holders: 10713,
                totalTxns: 61,
              },
              {
                rank: 9,
                name: "DFortress",
                icon: "🏰",
                items: 67,
                holders: 407,
                totalTxns: 48,
              },
              {
                rank: 10,
                name: "MYSTERYBOX",
                icon: "📦",
                items: 5,
                holders: 7752,
                totalTxns: 48,
              },
            ];

            // Mock stats data
            const mockStats = {
              price: 52.35,
              priceChange: -2.1,
              marketCap: 1235000000,
              totalTransactions: 124578962,
              blockHeight: 18436782,
              activeValidators: 3200,
              stakedValue: 231678234567890,
              stakedPercent: 56.2,
              tps: 1287,
              accounts: 2184673,
              activeAccounts24h: 47825,
              apy: 12.45,
              epochLength: "6d 2h 15m",
              circulatingSupply: 24567890,
              nfts: 123456,
              smartContracts: 5487,
            };

            // Set state with mock data
            setStats(mockStats);
            setBlocks(mockBlocks);
            setTransactions(mockTransactions);
            setMostTransactedTokens(mockMostTransactedTokens);
            setMostTransactedNFTs(mockMostTransactedNFTs);
            console.log("Dashboard data loaded successfully");

            resolve();
          }, 800);
        });
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
        setError(
          "Failed to load dashboard data. Please try refreshing the page."
        );

        // Set default values in case of error
        setStats({
          price: 0,
          priceChange: 0,
          marketCap: 0,
          totalTransactions: 0,
          blockHeight: 0,
          activeValidators: 0,
          stakedValue: 0,
          stakedPercent: 0,
          tps: 0,
          accounts: 0,
          activeAccounts24h: 0,
          apy: 0,
          epochLength: "0d 0h 0m",
          circulatingSupply: 0,
          nfts: 0,
          smartContracts: 0,
        });
        setTransactions([]);
        setBlocks([]);
        setMostTransactedTokens([]);
        setMostTransactedNFTs([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    const query = searchQuery.trim();

    // Handle different search types based on query format
    if (query.startsWith("erd1") && query.length > 40) {
      // Account address
      navigate(`/account/${query}`);
    } else if (query.startsWith("0x") || query.length >= 64) {
      // Transaction hash
      navigate(`/transaction/${query}`);
    } else if (!isNaN(query)) {
      // Block number
      navigate(`/block/${query}`);
    } else {
      // Token name or other search
      navigate(`/search?q=${encodeURIComponent(query)}`);
    }
  };

  const getStatusClass = (status) => {
    const statusMap = {
      success:
        "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400",
      pending:
        "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400",
      failed: "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400",
    };

    return (
      statusMap[status] ||
      "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200"
    );
  };

  const getShardBadgeClass = (shard) => {
    if (shard === "metachain")
      return "bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400";

    const shardColors = {
      0: "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400",
      1: "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400",
      2: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400",
    };

    return (
      shardColors[shard] ||
      "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400"
    );
  };

  const getTrendClass = (value) => {
    if (value > 0) return "text-green-600 dark:text-green-400";
    if (value < 0) return "text-red-600 dark:text-red-400";
    return "";
  };

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
      cell: (row) => formatCrypto(row.value, 18, "REWA"),
    },
    {
      header: "Status",
      key: "status",
      cell: (row) => (
        <Badge variant={getStatusClass(row.status)}>{row.status}</Badge>
      ),
    },
    {
      header: "Age",
      key: "timestamp",
      cell: (row) => timeAgo(row.timestamp),
    },
  ];

  // Table columns for blocks
  const blockColumns = [
    {
      header: "Height",
      key: "nonce",
      cell: (row) => (
        <Link
          to={`/block/${row.nonce}`}
          className="text-primary hover:underline"
        >
          {formatNumber(row.nonce)}
        </Link>
      ),
    },
    {
      header: "Hash",
      key: "hash",
      cell: (row) => <HashLink hash={row.hash} type="block" length="medium" />,
    },
    {
      header: "Shard",
      key: "shard",
      cell: (row) => (
        <Badge variant={getShardBadgeClass(row.shard)}>
          {row.shard === "metachain" ? "Metachain" : `Shard ${row.shard}`}
        </Badge>
      ),
    },
    {
      header: "Txns",
      key: "txCount",
      cell: (row) => formatNumber(row.txCount),
    },
    {
      header: "Size",
      key: "size",
      cell: (row) => `${formatNumber(row.size, 0)} B`,
    },
    {
      header: "Age",
      key: "timestamp",
      cell: (row) => timeAgo(row.timestamp),
    },
  ];

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Loading className="h-16 w-16 mx-auto my-20" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400 p-4 rounded-lg mb-8">
          {error}
          <button
            onClick={() => window.location.reload()}
            className="ml-4 text-primary hover:underline"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-yellow-100 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-400 p-4 rounded-lg mb-8">
          No dashboard data available. Please try again later.
          <button
            onClick={() => window.location.reload()}
            className="ml-4 text-primary hover:underline"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container-custom py-8">
      {/* Search hero */}
      <div className="relative mb-10">
        <div className="bg-gradient-to-r from-blue-500 to-teal-400 dark:from-blue-700 dark:to-teal-600 rounded-xl p-8 text-white">
          <h1 className="text-3xl font-bold mb-4">
            Dharitri Blockchain Explorer
          </h1>
          <p className="text-lg mb-6 max-w-2xl">
            Explore transactions, blocks, accounts and smart contracts on the
            Dharitri blockchain.
          </p>
          <form onSubmit={handleSearch} className="relative max-w-3xl">
            <input
              type="text"
              placeholder="Search by Address / Transaction / Block / Token"
              className="w-full py-3 pl-12 pr-4 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button
              type="submit"
              className="absolute inset-y-0 left-0 pl-3 flex items-center"
            >
              <FaSearch className="h-6 w-6 text-white/70" />
            </button>
          </form>
        </div>
      </div>

      <div className="container mx-auto px-4">
        {isLoading ? (
          <div className="flex justify-center py-16">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : (
          <>
            {/* Analytics Dashboard - Top Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {/* Block Height Card */}
              <div className="bg-white dark:bg-gray-900 rounded-xl shadow-md p-6">
                <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
                  Block Height
                </h3>
                <div className="text-3xl font-bold text-gray-800 dark:text-teal-400">
                  {formatLargeNumber(blockHeight)}
                </div>
              </div>

              {/* Total Transactions Card */}
              <div className="bg-white dark:bg-gray-900 rounded-xl shadow-md p-6">
                <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
                  Total Transactions
                </h3>
                <div className="text-3xl font-bold text-gray-800 dark:text-teal-400">
                  {formatLargeNumber(totalTransactions)}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                  <span className="flex items-center gap-1">
                    <span className="h-2 w-2 bg-green-400 rounded-full"></span>
                    {formatLargeNumber(dailyTransactions)} today
                  </span>
                </div>
              </div>

              {/* Total Accounts Card */}
              <div className="bg-white dark:bg-gray-900 rounded-xl shadow-md p-6">
                <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
                  Total Accounts
                </h3>
                <div className="text-3xl font-bold text-gray-800 dark:text-teal-400">
                  {formatLargeNumber(accountsTotal)}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                  <span className="flex items-center gap-1">
                    <span className="h-2 w-2 bg-green-400 rounded-full"></span>
                    {formatLargeNumber(activeAccounts)} active today
                    <span className="ml-1 text-xs bg-teal-400 text-white rounded px-0.5">
                      1
                    </span>
                  </span>
                </div>
              </div>

              {/* Validators Card */}
              <div className="bg-white dark:bg-gray-900 rounded-xl shadow-md p-6">
                <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
                  Validators
                </h3>
                <div className="text-3xl font-bold text-gray-800 dark:text-teal-400">
                  {formatLargeNumber(validatorsCount)}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                  <span className="flex items-center gap-1">
                    <span>
                      North America {validatorRegions.northAmerica} nodes (
                      {validatorRegions.percentage}%)
                    </span>
                  </span>
                </div>
              </div>
            </div>

            {/* Analytics Dashboard - Financial Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {/* Price Card */}
              <div className="bg-white dark:bg-gray-900 rounded-xl shadow-md p-6 relative overflow-hidden">
                <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
                  Current Price
                </h3>
                <div className="flex items-center gap-2">
                  <span className="text-3xl font-bold text-gray-800 dark:text-white">
                    ${priceData.current}
                  </span>
                  <span
                    className={`text-sm ${
                      priceData.change >= 0 ? "text-green-500" : "text-red-500"
                    }`}
                  >
                    {priceData.change}% today
                  </span>
                </div>

                <div className="h-24 mt-4 mb-2">
                  <Line
                    data={{
                      labels: Array(30).fill(""),
                      datasets: [
                        {
                          data: priceData.history,
                          borderColor: "#10b981",
                          backgroundColor: "rgba(16, 185, 129, 0.1)",
                          borderWidth: 2,
                          tension: 0.4,
                          fill: true,
                          pointRadius: 0,
                        },
                      ],
                    }}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      plugins: {
                        legend: {
                          display: false,
                        },
                        tooltip: {
                          enabled: false,
                        },
                      },
                      scales: {
                        x: {
                          display: false,
                        },
                        y: {
                          display: false,
                        },
                      },
                    }}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      Market Cap
                    </div>
                    <div className="text-sm text-gray-800 dark:text-white font-medium">
                      ${formatLargeNumber(priceData.marketCap)}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      24h Volume
                    </div>
                    <div className="text-sm text-gray-800 dark:text-white font-medium">
                      ${formatLargeNumber(priceData.volume24h)}
                    </div>
                  </div>
                </div>
              </div>

              {/* Staking Card */}
              <div className="bg-white dark:bg-gray-900 rounded-xl shadow-md p-6 relative overflow-hidden">
                <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
                  Total Staked
                </h3>
                <div className="flex items-center gap-2">
                  <span className="text-3xl font-bold text-primary dark:text-teal-400">
                    {formatLargeNumber(stakingData.total)} REWA
                  </span>
                  <span className="text-sm text-primary dark:text-teal-400">
                    ({stakingData.percentage}%)
                  </span>
                </div>

                <div className="h-24 mt-4 mb-2">
                  <Line
                    data={{
                      labels: Array(30).fill(""),
                      datasets: [
                        {
                          data: stakingData.history,
                          borderColor: "#2dd4bf",
                          backgroundColor: "rgba(45, 212, 191, 0.1)",
                          borderWidth: 2,
                          tension: 0.4,
                          fill: true,
                          pointRadius: 0,
                        },
                      ],
                    }}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      plugins: {
                        legend: {
                          display: false,
                        },
                        tooltip: {
                          enabled: false,
                        },
                      },
                      scales: {
                        x: {
                          display: false,
                        },
                        y: {
                          display: false,
                        },
                      },
                    }}
                  />
                </div>

                <div className="grid grid-cols-3 gap-4 mt-4">
                  <div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      Circulating Supply
                    </div>
                    <div className="text-sm text-gray-800 dark:text-white font-medium">
                      {formatLargeNumber(stakingData.circulatingSupply)}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      Users Staking
                    </div>
                    <div className="text-sm text-gray-800 dark:text-white font-medium">
                      {formatLargeNumber(stakingData.usersStaking)}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      Average APR
                    </div>
                    <div className="text-sm text-gray-800 dark:text-white font-medium">
                      {stakingData.apr}%
                    </div>
                  </div>
                </div>
              </div>

              {/* Developer Rewards Card */}
              <div className="bg-white dark:bg-gray-900 rounded-xl shadow-md p-6">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                      Developer Rewards
                    </h3>
                    <div className="text-xl font-bold text-gray-800 dark:text-white">
                      {formatLargeNumber(developerData.rewards)} REWA
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                      Fees Captured
                    </h3>
                    <div className="text-xl font-bold text-gray-800 dark:text-white">
                      {formatLargeNumber(developerData.feesCaptured)} REWA
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                      Applications Deployed
                    </h3>
                    <div className="text-xl font-bold text-gray-800 dark:text-white">
                      {formatLargeNumber(developerData.appsDeployed)}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Analytics Dashboard - Transaction Chart */}
            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-md p-6 mb-10">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                <div>
                  <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                    Total Transactions
                  </h3>
                  <div className="text-2xl font-bold text-gray-800 dark:text-teal-400">
                    {formatLargeNumber(transactionChartData.total)}
                  </div>
                </div>

                <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-1 mt-4 md:mt-0 inline-flex">
                  <button
                    className={`px-3 py-1 text-sm rounded-md ${
                      timeRange === "30d" ? "bg-white dark:bg-gray-700" : ""
                    }`}
                    onClick={() => setTimeRange("30d")}
                  >
                    30d
                  </button>
                  <button
                    className={`px-3 py-1 text-sm rounded-md ${
                      timeRange === "60d" ? "bg-white dark:bg-gray-700" : ""
                    }`}
                    onClick={() => setTimeRange("60d")}
                  >
                    60d
                  </button>
                  <button
                    className={`px-3 py-1 text-sm rounded-md ${
                      timeRange === "90d" ? "bg-white dark:bg-gray-700" : ""
                    }`}
                    onClick={() => setTimeRange("90d")}
                  >
                    90d
                  </button>
                </div>
              </div>

              <div className="space-y-4 mb-6">
                <div>
                  <h4 className="text-sm text-gray-500 dark:text-gray-400">
                    Applications
                  </h4>
                  <div className="text-xl font-bold text-gray-800 dark:text-teal-400">
                    {formatLargeNumber(transactionChartData.applications)}
                  </div>
                </div>

                <div>
                  <h4 className="text-sm text-gray-500 dark:text-gray-400">
                    Standard
                  </h4>
                  <div className="text-xl font-bold text-gray-800 dark:text-indigo-400">
                    {formatLargeNumber(transactionChartData.standard)}
                  </div>
                </div>
              </div>

              <div className="h-64">
                <Line
                  data={transactionChartData.history}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: {
                        display: false,
                      },
                      tooltip: {
                        mode: "index",
                        intersect: false,
                      },
                    },
                    hover: {
                      mode: "nearest",
                      intersect: false,
                    },
                    scales: {
                      x: {
                        display: false,
                      },
                      y: {
                        display: false,
                        suggestedMin: 0,
                      },
                    },
                  }}
                />
              </div>
            </div>

            {/* Most Used Applications Section */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-black rounded-xl shadow-lg p-6 mb-10 overflow-hidden transition-all duration-300 border border-gray-100 dark:border-gray-800">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white group flex items-center">
                  Most Used Applications{" "}
                  <span className="text-gray-500 dark:text-gray-400 text-sm ml-2">
                    (daily)
                  </span>
                  <span className="w-2 h-2 bg-teal-400 rounded-full ml-3 animate-pulse"></span>
                </h2>
                <Link
                  to="/dashboard"
                  className="bg-white dark:bg-gray-800 hover:bg-blue-50 dark:hover:bg-gray-700 text-gray-800 dark:text-white px-4 py-2 rounded-md text-sm shadow-sm transition-all duration-200 hover:shadow-md flex items-center group"
                >
                  Dashboard
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </Link>
              </div>

              <div className="flex space-x-4 overflow-x-auto pb-4 scrollbar-hide -mx-1 px-1">
                {/* App Card 1 */}
                <div className="flex-shrink-0 w-56 bg-white dark:bg-gray-800 hover:dark:bg-gray-750 rounded-lg overflow-hidden shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300">
                  <div className="p-4">
                    <div className="flex justify-between items-start mb-4">
                      <span className="text-4xl font-bold text-gray-900 dark:text-white">
                        1
                      </span>
                      <span className="text-teal-500 dark:text-teal-400 text-sm font-medium">
                        15,482 Txn
                      </span>
                    </div>
                    <div className="flex flex-col items-center mt-4">
                      <div className="w-24 h-24 bg-blue-400 dark:bg-blue-700 rounded-full flex items-center justify-center mb-3 shadow-inner">
                        <span className="text-4xl">🌊</span>
                      </div>
                      <h3 className="text-gray-900 dark:text-white font-medium text-center group-hover:text-primary">
                        DWave: Quests
                      </h3>
                    </div>
                  </div>
                </div>

                {/* App Card 2 */}
                <div className="flex-shrink-0 w-56 bg-white dark:bg-gray-800 hover:dark:bg-gray-750 rounded-lg overflow-hidden shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300">
                  <div className="p-4">
                    <div className="flex justify-between items-start mb-4">
                      <span className="text-4xl font-bold text-gray-900 dark:text-white">
                        2
                      </span>
                      <span className="text-teal-500 dark:text-teal-400 text-sm font-medium">
                        14,643 Txn
                      </span>
                    </div>
                    <div className="flex flex-col items-center mt-4">
                      <div className="w-24 h-24 bg-orange-400 rounded-full flex items-center justify-center mb-3 shadow-lg">
                        <span className="text-4xl">🐦</span>
                      </div>
                      <h3 className="text-gray-900 dark:text-white font-medium text-center">
                        Dharitri Bird
                      </h3>
                    </div>
                  </div>
                </div>

                {/* App Card 3 */}
                <div className="flex-shrink-0 w-56 bg-white dark:bg-gray-800 hover:dark:bg-gray-750 rounded-lg overflow-hidden shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300">
                  <div className="p-4">
                    <div className="flex justify-between items-start mb-4">
                      <span className="text-4xl font-bold text-gray-900 dark:text-white">
                        3
                      </span>
                      <span className="text-teal-500 dark:text-teal-400 text-sm font-medium">
                        6,806 Txn
                      </span>
                    </div>
                    <div className="flex flex-col items-center mt-4">
                      <div className="w-24 h-24 bg-purple-400 dark:bg-purple-700 rounded-full flex items-center justify-center mb-3 shadow-inner">
                        <span className="text-4xl">🎮</span>
                      </div>
                      <h3 className="text-gray-900 dark:text-white font-medium text-center">
                        DPortal: Reward Claim
                      </h3>
                    </div>
                  </div>
                </div>

                {/* App Card 4 */}
                <div className="flex-shrink-0 w-56 bg-white dark:bg-gray-800 hover:dark:bg-gray-750 rounded-lg overflow-hidden shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300">
                  <div className="p-4">
                    <div className="flex justify-between items-start mb-4">
                      <span className="text-4xl font-bold text-gray-900 dark:text-white">
                        4
                      </span>
                      <span className="text-teal-500 dark:text-teal-400 text-sm font-medium">
                        5,017 Txn
                      </span>
                    </div>
                    <div className="flex flex-col items-center mt-4">
                      <div className="w-24 h-24 bg-indigo-400 dark:bg-indigo-700 rounded-full flex items-center justify-center mb-3 shadow-inner">
                        <span className="text-4xl">💱</span>
                      </div>
                      <h3 className="text-gray-900 dark:text-white font-medium text-center">
                        DSwap: Fees Collector
                      </h3>
                    </div>
                  </div>
                </div>

                {/* App Card 5 */}
                <div className="flex-shrink-0 w-56 bg-white dark:bg-gray-800 hover:dark:bg-gray-750 rounded-lg overflow-hidden shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300">
                  <div className="p-4">
                    <div className="flex justify-between items-start mb-4">
                      <span className="text-4xl font-bold text-gray-900 dark:text-white">
                        5
                      </span>
                      <span className="text-teal-500 dark:text-teal-400 text-sm font-medium">
                        4,890 Txn
                      </span>
                    </div>
                    <div className="flex flex-col items-center mt-4">
                      <div className="w-24 h-24 bg-teal-400 rounded-full flex items-center justify-center mb-3 shadow-lg">
                        <span className="text-4xl">🦫</span>
                      </div>
                      <h3 className="text-gray-900 dark:text-white font-medium text-center">
                        Dharitri Flip
                      </h3>
                    </div>
                  </div>
                </div>

                {/* App Card 6 */}
                <div className="flex-shrink-0 w-56 bg-white dark:bg-gray-800 hover:dark:bg-gray-750 rounded-lg overflow-hidden shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300">
                  <div className="p-4">
                    <div className="flex justify-between items-start mb-4">
                      <span className="text-4xl font-bold text-gray-900 dark:text-white">
                        6
                      </span>
                      <span className="text-teal-500 dark:text-teal-400 text-sm font-medium">
                        4,725 Txn
                      </span>
                    </div>
                    <div className="flex flex-col items-center mt-4">
                      <div className="w-24 h-24 bg-green-400 dark:bg-green-700 rounded-full flex items-center justify-center mb-3 shadow-inner">
                        <span className="text-4xl">💰</span>
                      </div>
                      <h3 className="text-gray-900 dark:text-white font-medium text-center">
                        DSwap: REWA Liquidity
                      </h3>
                    </div>
                  </div>
                </div>
              </div>

              {/* Navigation Arrows - Optional */}
              <div className="flex justify-end mt-4">
                <button className="w-8 h-8 flex items-center justify-center rounded-full bg-white dark:bg-gray-800 shadow-md mr-2 hover:bg-blue-50 dark:hover:bg-gray-700 transition-colors">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-gray-800 dark:text-gray-200"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </button>
                <button className="w-8 h-8 flex items-center justify-center rounded-full bg-white dark:bg-gray-800 shadow-md hover:bg-blue-50 dark:hover:bg-gray-700 transition-colors">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-gray-800 dark:text-gray-200"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </div>
            </div>

            {/* Most Transacted Sections - Two-column layout */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
              {/* Most Transacted NFTs Section */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-black rounded-xl shadow-lg overflow-hidden transition-all duration-300 border border-gray-100 dark:border-gray-800">
                <div className="flex justify-between items-center p-6 border-b border-gray-200 dark:border-gray-800">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white group flex items-center">
                    Most Transacted NFTs{" "}
                    <span className="text-gray-500 dark:text-gray-400 text-sm ml-2">
                      (Daily)
                    </span>
                  </h2>
                  <Link
                    to="/dashboard/nfts"
                    className="bg-white dark:bg-gray-800 hover:bg-blue-50 dark:hover:bg-gray-700 text-gray-800 dark:text-white px-4 py-2 rounded-md text-sm shadow-sm transition-all duration-200 hover:shadow-md flex items-center group"
                  >
                    View Dashboard
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </Link>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-gray-50 dark:bg-gray-800 text-left">
                        <th className="py-3 px-6 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider w-16">
                          Rank
                        </th>
                        <th className="py-3 px-6 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Collection
                        </th>
                        <th className="py-3 px-6 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider text-right">
                          Items
                        </th>
                        <th className="py-3 px-6 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider text-right">
                          Holders
                        </th>
                        <th className="py-3 px-6 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider text-right">
                          Total Txn
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                      {/* NFT Row 1 */}
                      <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/60 transition-colors">
                        <td className="px-6 py-4 text-center font-bold text-gray-900 dark:text-white">
                          1
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-8 w-8 rounded-full bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center mr-3">
                              <span className="text-lg">🎮</span>
                            </div>
                            <div className="font-medium text-gray-900 dark:text-white">
                              DragonRealm Items{" "}
                              <span className="inline-flex ml-2 items-center px-2 py-0.5 rounded-full text-xs font-medium bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300">
                                <span className="h-1.5 w-1.5 rounded-full bg-yellow-400 mr-1"></span>
                                Verified
                              </span>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-right text-sm text-gray-700 dark:text-gray-300">
                          225,826
                        </td>
                        <td className="px-6 py-4 text-right text-sm text-gray-700 dark:text-gray-300">
                          7,868
                        </td>
                        <td className="px-6 py-4 text-right text-sm font-medium text-teal-500 dark:text-teal-400">
                          986
                        </td>
                      </tr>

                      {/* NFT Rows 2-5 */}
                      <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/60 transition-colors">
                        <td className="px-6 py-4 text-center font-bold text-gray-900 dark:text-white">
                          2
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mr-3">
                              <span className="text-lg">🌀</span>
                            </div>
                            <div className="font-medium text-gray-900 dark:text-white">
                              Dharitri Gateways{" "}
                              <span className="inline-flex ml-2 items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300">
                                <span className="h-1.5 w-1.5 rounded-full bg-blue-400 mr-1"></span>
                                Verified
                              </span>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-right text-sm text-gray-700 dark:text-gray-300">
                          17
                        </td>
                        <td className="px-6 py-4 text-right text-sm text-gray-700 dark:text-gray-300">
                          36,537
                        </td>
                        <td className="px-6 py-4 text-right text-sm font-medium text-teal-500 dark:text-teal-400">
                          435
                        </td>
                      </tr>

                      <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/60 transition-colors">
                        <td className="px-6 py-4 text-center font-bold text-gray-900 dark:text-white">
                          3
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-8 w-8 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mr-3">
                              <span className="text-lg">🏆</span>
                            </div>
                            <div className="font-medium text-gray-900 dark:text-white">
                              Gateway Badges
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-right text-sm text-gray-700 dark:text-gray-300">
                          15
                        </td>
                        <td className="px-6 py-4 text-right text-sm text-gray-700 dark:text-gray-300">
                          169,889
                        </td>
                        <td className="px-6 py-4 text-right text-sm font-medium text-teal-500 dark:text-teal-400">
                          409
                        </td>
                      </tr>

                      <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/60 transition-colors">
                        <td className="px-6 py-4 text-center font-bold text-gray-900 dark:text-white">
                          4
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-8 w-8 rounded-full bg-brown-100 dark:bg-yellow-900/30 flex items-center justify-center mr-3">
                              <span className="text-lg">🪵</span>
                            </div>
                            <div className="font-medium text-gray-900 dark:text-white">
                              Wood
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-right text-sm text-gray-700 dark:text-gray-300">
                          1
                        </td>
                        <td className="px-6 py-4 text-right text-sm text-gray-700 dark:text-gray-300">
                          376
                        </td>
                        <td className="px-6 py-4 text-right text-sm font-medium text-teal-500 dark:text-teal-400">
                          122
                        </td>
                      </tr>

                      <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/60 transition-colors">
                        <td className="px-6 py-4 text-center font-bold text-gray-900 dark:text-white">
                          5
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-8 w-8 rounded-full bg-gray-100 dark:bg-gray-900/30 flex items-center justify-center mr-3">
                              <span className="text-lg">🪨</span>
                            </div>
                            <div className="font-medium text-gray-900 dark:text-white">
                              Stone
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-right text-sm text-gray-700 dark:text-gray-300">
                          1
                        </td>
                        <td className="px-6 py-4 text-right text-sm text-gray-700 dark:text-gray-300">
                          219
                        </td>
                        <td className="px-6 py-4 text-right text-sm font-medium text-teal-500 dark:text-teal-400">
                          122
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="bg-gray-50 dark:bg-gray-800/30 py-3 px-6 border-t border-gray-200 dark:border-gray-700">
                  <Link
                    to="/nfts"
                    className="text-primary hover:text-primary-dark text-sm font-medium flex items-center"
                  >
                    View All NFTs
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 ml-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </Link>
                </div>
              </div>

              {/* Most Transacted Tokens Section */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-black rounded-xl shadow-lg overflow-hidden transition-all duration-300 border border-gray-100 dark:border-gray-800">
                <div className="flex justify-between items-center p-6 border-b border-gray-200 dark:border-gray-800">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white group flex items-center">
                    Most Transacted Tokens{" "}
                    <span className="text-gray-500 dark:text-gray-400 text-sm ml-2">
                      (Daily)
                    </span>
                  </h2>
                  <Link
                    to="/dashboard/tokens"
                    className="bg-white dark:bg-gray-800 hover:bg-blue-50 dark:hover:bg-gray-700 text-gray-800 dark:text-white px-4 py-2 rounded-md text-sm shadow-sm transition-all duration-200 hover:shadow-md flex items-center group"
                  >
                    Dashboard
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </Link>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-gray-50 dark:bg-gray-800 text-left">
                        <th className="py-3 px-6 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider w-16">
                          Rank
                        </th>
                        <th className="py-3 px-6 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Token
                        </th>
                        <th className="py-3 px-6 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider text-right">
                          Symbol
                        </th>
                        <th className="py-3 px-6 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider text-right">
                          Holders
                        </th>
                        <th className="py-3 px-6 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider text-right">
                          Total Txn
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                      {/* Token Rows 1-5 */}
                      <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/60 transition-colors">
                        <td className="px-6 py-4 text-center font-bold text-gray-900 dark:text-white">
                          1
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mr-3">
                              <span className="text-lg">🪙</span>
                            </div>
                            <div className="font-medium text-gray-900 dark:text-white">
                              Reward Token{" "}
                              <span className="inline-flex ml-2 items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300">
                                <span className="h-1.5 w-1.5 rounded-full bg-blue-400 mr-1"></span>
                                Verified
                              </span>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-right text-sm text-gray-700 dark:text-gray-300">
                          REWA
                        </td>
                        <td className="px-6 py-4 text-right text-sm text-gray-700 dark:text-gray-300">
                          124,587
                        </td>
                        <td className="px-6 py-4 text-right text-sm font-medium text-teal-500 dark:text-teal-400">
                          18,834
                        </td>
                      </tr>

                      <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/60 transition-colors">
                        <td className="px-6 py-4 text-center font-bold text-gray-900 dark:text-white">
                          2
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-8 w-8 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mr-3">
                              <span className="text-lg">💵</span>
                            </div>
                            <div className="font-medium text-gray-900 dark:text-white">
                              USD Coin{" "}
                              <span className="inline-flex ml-2 items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300">
                                <span className="h-1.5 w-1.5 rounded-full bg-green-400 mr-1"></span>
                                Verified
                              </span>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-right text-sm text-gray-700 dark:text-gray-300">
                          USDC
                        </td>
                        <td className="px-6 py-4 text-right text-sm text-gray-700 dark:text-gray-300">
                          78,962
                        </td>
                        <td className="px-6 py-4 text-right text-sm font-medium text-teal-500 dark:text-teal-400">
                          5,614
                        </td>
                      </tr>

                      <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/60 transition-colors">
                        <td className="px-6 py-4 text-center font-bold text-gray-900 dark:text-white">
                          3
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-8 w-8 rounded-full bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center mr-3">
                              <span className="text-lg">🪙</span>
                            </div>
                            <div className="font-medium text-gray-900 dark:text-white">
                              Binance Coin
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-right text-sm text-gray-700 dark:text-gray-300">
                          BNB
                        </td>
                        <td className="px-6 py-4 text-right text-sm text-gray-700 dark:text-gray-300">
                          54,321
                        </td>
                        <td className="px-6 py-4 text-right text-sm font-medium text-teal-500 dark:text-teal-400">
                          4,775
                        </td>
                      </tr>

                      <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/60 transition-colors">
                        <td className="px-6 py-4 text-center font-bold text-gray-900 dark:text-white">
                          4
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-8 w-8 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center mr-3">
                              <span className="text-lg">💎</span>
                            </div>
                            <div className="font-medium text-gray-900 dark:text-white">
                              Dharitri REWA{" "}
                              <span className="inline-flex ml-2 items-center px-2 py-0.5 rounded-full text-xs font-medium bg-indigo-100 dark:bg-indigo-900/30 text-indigo-800 dark:text-indigo-300">
                                <span className="h-1.5 w-1.5 rounded-full bg-indigo-400 mr-1"></span>
                                Verified
                              </span>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-right text-sm text-gray-700 dark:text-gray-300">
                          REWA
                        </td>
                        <td className="px-6 py-4 text-right text-sm text-gray-700 dark:text-gray-300">
                          25,874
                        </td>
                        <td className="px-6 py-4 text-right text-sm font-medium text-teal-500 dark:text-teal-400">
                          2,461
                        </td>
                      </tr>

                      <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/60 transition-colors">
                        <td className="px-6 py-4 text-center font-bold text-gray-900 dark:text-white">
                          5
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-8 w-8 rounded-full bg-teal-100 dark:bg-teal-900/30 flex items-center justify-center mr-3">
                              <span className="text-lg">🔄</span>
                            </div>
                            <div className="font-medium text-gray-900 dark:text-white">
                              Maiar Exchange Token
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-right text-sm text-gray-700 dark:text-gray-300">
                          MEX
                        </td>
                        <td className="px-6 py-4 text-right text-sm text-gray-700 dark:text-gray-300">
                          18,935
                        </td>
                        <td className="px-6 py-4 text-right text-sm font-medium text-teal-500 dark:text-teal-400">
                          1,488
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="bg-gray-50 dark:bg-gray-800/30 py-3 px-6 border-t border-gray-200 dark:border-gray-700">
                  <Link
                    to="/tokens"
                    className="text-primary hover:text-primary-dark text-sm font-medium flex items-center"
                  >
                    View All Tokens
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 ml-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>

            {/* Recent Blocks and Transactions - Two-column layout */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
              {/* Recent Blocks Section */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-black rounded-xl shadow-lg overflow-hidden transition-all duration-300 border border-gray-100 dark:border-gray-800">
                <div className="flex justify-between items-center p-6 border-b border-gray-200 dark:border-gray-800">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white group flex items-center">
                    <FaCubes className="mr-3 text-blue-500 dark:text-blue-400" />
                    Latest Blocks
                    <span className="w-2 h-2 bg-blue-400 rounded-full ml-3 animate-pulse"></span>
                  </h2>
                  <Link
                    to="/blocks"
                    className="bg-white dark:bg-gray-800 hover:bg-blue-50 dark:hover:bg-gray-700 text-gray-800 dark:text-white px-4 py-2 rounded-md text-sm shadow-sm transition-all duration-200 hover:shadow-md flex items-center group"
                  >
                    View All
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </Link>
                </div>

                <div className="overflow-x-auto">
                  <div className="divide-y divide-gray-200 dark:divide-gray-700">
                    {blocks.slice(0, 7).map((block, index) => (
                      <div
                        key={block.hash}
                        className="p-4 hover:bg-gray-50 dark:hover:bg-gray-800/60 transition-colors"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mr-4 shadow-sm">
                              <FaCube className="text-blue-500 dark:text-blue-400" />
                            </div>
                            <div>
                              <Link
                                to={`/block/${block.nonce}`}
                                className="text-lg font-medium text-gray-900 dark:text-white hover:text-primary dark:hover:text-primary-light transition-colors"
                              >
                                #
                                {block.nonce >= 5000000
                                  ? "5.0M"
                                  : formatNumber(block.nonce)}
                              </Link>
                              <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mt-1">
                                <div className="font-mono">
                                  {block.hash.substring(0, 16)}
                                </div>
                                <span
                                  className={`ml-2 px-2 py-0.5 text-xs rounded-full ${
                                    block.shard === 0
                                      ? "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400"
                                      : block.shard === 1
                                      ? "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
                                      : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400"
                                  }`}
                                >
                                  Shard {block.shard}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-sm font-medium text-teal-500 dark:text-teal-400">
                              {block.txCount} txns
                            </div>
                            <div className="flex items-center justify-end mt-1">
                              <span className="bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded text-xs text-gray-600 dark:text-gray-400">
                                {(block.size / 1000).toFixed(1)}K B
                              </span>
                            </div>
                            <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                              55 years ago
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-gray-50 dark:bg-gray-800/30 py-3 px-6 border-t border-gray-200 dark:border-gray-700">
                  <Link
                    to="/blocks"
                    className="text-primary hover:text-primary-dark text-sm font-medium flex items-center"
                  >
                    View All Blocks
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 ml-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </Link>
                </div>

                {/* This is added to fill the remaining space */}
                <div className="bg-transparent h-20"></div>
              </div>

              {/* Recent Transactions Section */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-black rounded-xl shadow-lg overflow-hidden transition-all duration-300 border border-gray-100 dark:border-gray-800">
                <div className="flex justify-between items-center p-6 border-b border-gray-200 dark:border-gray-800">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white group flex items-center">
                    <FaExchangeAlt className="mr-3 text-green-500 dark:text-green-400" />
                    Latest Transactions
                    <span className="w-2 h-2 bg-green-400 rounded-full ml-3 animate-pulse"></span>
                  </h2>
                  <Link
                    to="/transactions"
                    className="bg-white dark:bg-gray-800 hover:bg-blue-50 dark:hover:bg-gray-700 text-gray-800 dark:text-white px-4 py-2 rounded-md text-sm shadow-sm transition-all duration-200 hover:shadow-md flex items-center group"
                  >
                    View All
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </Link>
                </div>

                <div className="overflow-x-auto">
                  <div className="divide-y divide-gray-200 dark:divide-gray-700">
                    {transactions.slice(0, 5).map((tx) => (
                      <div
                        key={tx.hash}
                        className="p-4 hover:bg-gray-50 dark:hover:bg-gray-800/60 transition-colors"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <Link
                            to={`/transaction/${tx.hash}`}
                            className="flex items-center font-medium text-gray-900 dark:text-white hover:text-primary dark:hover:text-primary-light transition-colors"
                          >
                            <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mr-4 shadow-sm">
                              <FaExchangeAlt className="text-green-500 dark:text-green-400" />
                            </div>
                            <div className="font-mono">
                              {shortenAddress(tx.hash, 10)}
                            </div>
                          </Link>
                          <span
                            className={`px-2 py-0.5 text-xs rounded-full ${getStatusClass(
                              tx.status
                            )}`}
                          >
                            {tx.status}
                          </span>
                        </div>

                        <div className="grid grid-cols-3 gap-2 text-sm pl-14">
                          <div>
                            <div className="text-gray-500 dark:text-gray-400 text-xs">
                              From
                            </div>
                            <Link
                              to={`/account/${tx.from}`}
                              className="font-mono text-primary hover:underline truncate block"
                            >
                              {shortenAddress(tx.from, 8)}
                            </Link>
                          </div>
                          <div>
                            <div className="text-gray-500 dark:text-gray-400 text-xs">
                              To
                            </div>
                            <Link
                              to={`/account/${tx.to}`}
                              className="font-mono text-primary hover:underline truncate block"
                            >
                              {shortenAddress(tx.to, 8)}
                            </Link>
                          </div>
                          <div className="text-right">
                            <div className="text-gray-500 dark:text-gray-400 text-xs">
                              Value
                            </div>
                            <div className="font-medium text-teal-500 dark:text-teal-400">
                              {formatCrypto(tx.value)}
                            </div>
                            <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                              {timeAgo(tx.timestamp)}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-gray-50 dark:bg-gray-800/30 py-3 px-6 border-t border-gray-200 dark:border-gray-700">
                  <Link
                    to="/transactions"
                    className="text-primary hover:text-primary-dark text-sm font-medium flex items-center"
                  >
                    View All Transactions
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 ml-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>

            {/* Featured Sections */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white dark:bg-gray-900 rounded-xl shadow-md p-6">
                <div className="flex items-center mb-4">
                  <FaChartLine className="text-primary mr-2 text-xl" />
                  <h2 className="text-lg font-semibold">
                    Statistics & Analytics
                  </h2>
                </div>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Explore detailed network statistics, charts, and analytics
                  about the Dharitri ecosystem.
                </p>
                <Link
                  to="/analytics"
                  className="inline-flex items-center text-primary hover:text-primary-dark"
                >
                  View Analytics <FaArrowRight className="ml-2" />
                </Link>
              </div>

              <div className="bg-white dark:bg-gray-900 rounded-xl shadow-md p-6">
                <div className="flex items-center mb-4">
                  <FaCoins className="text-primary mr-2 text-xl" />
                  <h2 className="text-lg font-semibold">Tokens & NFTs</h2>
                </div>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Browse and search all tokens and NFT collections on the
                  Dharitri blockchain.
                </p>
                <div className="flex space-x-4">
                  <Link
                    to="/tokens"
                    className="inline-flex items-center text-primary hover:text-primary-dark"
                  >
                    View Tokens <FaArrowRight className="ml-2" />
                  </Link>
                  <Link
                    to="/nfts"
                    className="inline-flex items-center text-primary hover:text-primary-dark"
                  >
                    View NFTs <FaArrowRight className="ml-2" />
                  </Link>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-900 rounded-xl shadow-md p-6">
                <div className="flex items-center mb-4">
                  <FaServer className="text-primary mr-2 text-xl" />
                  <h2 className="text-lg font-semibold">
                    Validators & Staking
                  </h2>
                </div>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Explore validators securing the Dharitri network and staking
                  statistics.
                </p>
                <Link
                  to="/validators"
                  className="inline-flex items-center text-primary hover:text-primary-dark"
                >
                  View Validators <FaArrowRight className="ml-2" />
                </Link>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Footer Information Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12 mb-8">
        <div>
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <FaGlobe className="mr-2 text-primary" />
            Explorer Resources
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            The Explorer is your window into the Dharitri blockchain. Use it to
            track transactions, view blocks, and learn more about the Dharitri
            ecosystem.
          </p>
          <Link
            to="/statistics"
            className="text-primary hover:underline text-sm flex items-center"
          >
            View Network Statistics
            <FaArrowRight className="ml-1 text-xs" />
          </Link>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <FaCubes className="mr-2 text-primary" />
            About Blocks
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            Blocks are the fundamental units that make up the Dharitri
            blockchain.
          </p>
          <Link
            to="/blocks"
            className="text-primary hover:underline text-sm flex items-center"
          >
            Explore Blocks
            <FaArrowRight className="ml-1 text-xs" />
          </Link>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <FaExchangeAlt className="mr-2 text-primary" />
            About Transactions
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            Transactions record transfers of REWA and other tokens, smart
            contract interactions, and other operations.
          </p>
          <Link
            to="/transactions"
            className="text-primary hover:underline text-sm flex items-center"
          >
            Explore Transactions
            <FaArrowRight className="ml-1 text-xs" />
          </Link>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <FaServer className="mr-2 text-primary" />
            About Validators
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            Explore validators securing the Dharitri network and staking
            statistics.
          </p>
          <Link
            to="/validators"
            className="text-primary hover:underline text-sm flex items-center"
          >
            View Validators
            <FaArrowRight className="ml-1 text-xs" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
