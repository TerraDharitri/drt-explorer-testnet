import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import {
  FaArrowLeft,
  FaExternalLinkAlt,
  FaTwitter,
  FaDiscord,
  FaGithub,
  FaGlobe,
  FaUsers,
  FaEthereum,
} from "react-icons/fa";
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

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

// Mock data for apps
const mockAppData = {
  "maiar-exchange": {
    id: "maiar-exchange",
    name: "Maiar Exchange",
    description:
      "A revolutionary decentralized exchange built on dharitri Network, enabling the trading of tokenized assets with near-instant settlements.",
    longDescription:
      "Maiar Exchange is a fully automated liquidity protocol and decentralized exchange. It removes the need for trusted intermediaries, prioritizing decentralization, censorship resistance, and security. Anyone can become a liquidity provider by depositing equivalent values of two tokens, earning fees from trades. The exchange ensures high liquidity and low slippage through an automated market maker model. The MEXT token, native to Maiar Exchange, provides governance rights and entitles holders to a share of protocol fees.",
    category: "defi",
    url: "https://maiar.exchange",
    logo: "https://placehold.co/200x200/1a4dda/ffffff?text=Maiar",
    users: 125000,
    tvl: 352000000,
    volume24h: 5800000,
    popularityScore: 98,
    verified: true,
    launched: "2021-05-12",
    screenshots: [
      "https://placehold.co/800x450/1a4dda/ffffff?text=Screenshot+1",
      "https://placehold.co/800x450/1a4dda/ffffff?text=Screenshot+2",
      "https://placehold.co/800x450/1a4dda/ffffff?text=Screenshot+3",
    ],
    links: {
      website: "https://maiar.exchange",
      twitter: "https://twitter.com/MaiarExchange",
      discord: "https://discord.gg/maiarexchange",
      github: "https://github.com/dharitriNetwork",
    },
    features: [
      "Automated Market Maker (AMM)",
      "Liquidity Pools",
      "Token Swaps",
      "Yield Farming",
      "Governance",
      "Staking",
    ],
    tokens: [
      {
        symbol: "MEXT",
        name: "Maiar Exchange Token",
        price: 0.85,
        change24h: 3.2,
      },
      {
        symbol: "REWA",
        name: "Dharitri REWA",
        price: 52.35,
        change24h: 1.8,
      },
    ],
    stats: {
      dailyActiveUsers: 28500,
      totalTransactions: 14520000,
      averageFee: 0.0012,
      totalVolumeAllTime: 1850000000,
    },
    volumeHistory: [
      { date: "2023-06-01", volume: 4800000 },
      { date: "2023-07-01", volume: 5200000 },
      { date: "2023-08-01", volume: 4900000 },
      { date: "2023-09-01", volume: 5500000 },
      { date: "2023-10-01", volume: 6200000 },
      { date: "2023-11-01", volume: 5800000 },
      { date: "2023-12-01", volume: 5400000 },
      { date: "2024-01-01", volume: 4900000 },
      { date: "2024-02-01", volume: 5100000 },
      { date: "2024-03-01", volume: 5600000 },
      { date: "2024-04-01", volume: 5900000 },
      { date: "2024-05-01", volume: 5800000 },
    ],
    tvlHistory: [
      { date: "2023-06-01", tvl: 280000000 },
      { date: "2023-07-01", tvl: 295000000 },
      { date: "2023-08-01", tvl: 310000000 },
      { date: "2023-09-01", tvl: 305000000 },
      { date: "2023-10-01", tvl: 320000000 },
      { date: "2023-11-01", tvl: 335000000 },
      { date: "2023-12-01", tvl: 348000000 },
      { date: "2024-01-01", tvl: 342000000 },
      { date: "2024-02-01", tvl: 338000000 },
      { date: "2024-03-01", tvl: 345000000 },
      { date: "2024-04-01", tvl: 350000000 },
      { date: "2024-05-01", tvl: 352000000 },
    ],
  },
  deadrare: {
    id: "deadrare",
    name: "DeadRare",
    description:
      "The premier NFT marketplace on dharitri, featuring digital collectibles, art, and gaming assets.",
    longDescription:
      "DeadRare is the leading NFT marketplace on the Dharitri blockchain. It provides a platform for creators, collectors, and traders to discover, buy, sell, and auction unique digital assets. DeadRare supports various NFT categories including art, collectibles, gaming items, virtual real estate, and more.",
    category: "nft",
    url: "https://deadrare.io",
    logo: "https://placehold.co/200x200/10b981/ffffff?text=DeadRare",
    users: 85000,
    tvl: 12500000,
    volume24h: 980000,
    popularityScore: 92,
    verified: true,
    launched: "2021-09-28",
    screenshots: [
      "https://placehold.co/800x450/10b981/ffffff?text=Screenshot+1",
      "https://placehold.co/800x450/10b981/ffffff?text=Screenshot+2",
      "https://placehold.co/800x450/10b981/ffffff?text=Screenshot+3",
    ],
    links: {
      website: "https://deadrare.io",
      twitter: "https://twitter.com/DeadRare",
      discord: "https://discord.gg/deadrare",
      github: "https://github.com/DeadRare",
    },
    features: [
      "NFT Minting",
      "Marketplace",
      "Auctions",
      "Collections",
      "Artist Profiles",
      "Royalties",
    ],
    tokens: [
      { symbol: "DEAD", name: "DeadRare Token", price: 0.12, change24h: -1.2 },
      {
        symbol: "REWA",
        name: "Dharitri REWA",
        price: 52.35,
        change24h: 1.8,
      },
    ],
    stats: {
      dailyActiveUsers: 15200,
      totalTransactions: 2850000,
      averageFee: 0.025,
      totalVolumeAllTime: 85600000,
    },
    volumeHistory: [
      { date: "2023-06-01", volume: 820000 },
      { date: "2023-07-01", volume: 780000 },
      { date: "2023-08-01", volume: 850000 },
      { date: "2023-09-01", volume: 920000 },
      { date: "2023-10-01", volume: 890000 },
      { date: "2023-11-01", volume: 940000 },
      { date: "2023-12-01", volume: 1050000 },
      { date: "2024-01-01", volume: 980000 },
      { date: "2024-02-01", volume: 920000 },
      { date: "2024-03-01", volume: 950000 },
      { date: "2024-04-01", volume: 960000 },
      { date: "2024-05-01", volume: 980000 },
    ],
    tvlHistory: [
      { date: "2023-06-01", tvl: 8500000 },
      { date: "2023-07-01", tvl: 9200000 },
      { date: "2023-08-01", tvl: 9800000 },
      { date: "2023-09-01", tvl: 10500000 },
      { date: "2023-10-01", tvl: 11200000 },
      { date: "2023-11-01", tvl: 11800000 },
      { date: "2023-12-01", tvl: 12300000 },
      { date: "2024-01-01", tvl: 12100000 },
      { date: "2024-02-01", tvl: 11900000 },
      { date: "2024-03-01", tvl: 12200000 },
      { date: "2024-04-01", tvl: 12400000 },
      { date: "2024-05-01", tvl: 12500000 },
    ],
  },
};

const AppDetails = () => {
  const { appId } = useParams();
  const [appData, setAppData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("overview");
  const [activeChart, setActiveChart] = useState("volume");
  const [currentScreenshot, setCurrentScreenshot] = useState(0);

  useEffect(() => {
    const fetchAppDetails = async () => {
      setIsLoading(true);
      setError(null);
      try {
        // In a real app, we'd fetch from API
        // const response = await apiService.getAppDetails(appId);

        // Using mock data for now
        if (mockAppData[appId]) {
          // Simulate API delay
          setTimeout(() => {
            setAppData(mockAppData[appId]);
            setIsLoading(false);
          }, 800);
        } else {
          setError("Application not found");
          setIsLoading(false);
        }
      } catch (err) {
        setError("Failed to fetch application details");
        console.error(err);
        setIsLoading(false);
      }
    };

    fetchAppDetails();
  }, [appId]);

  const formatNumber = (num) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + "M";
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + "K";
    } else {
      return num.toString();
    }
  };

  const formatCurrency = (value) => {
    if (value >= 1000000000) {
      return "$" + (value / 1000000000).toFixed(2) + "B";
    } else if (value >= 1000000) {
      return "$" + (value / 1000000).toFixed(2) + "M";
    } else if (value >= 1000) {
      return "$" + (value / 1000).toFixed(2) + "K";
    } else {
      return "$" + value.toFixed(2);
    }
  };

  // Prepare chart data
  const getChartData = () => {
    if (!appData) return { labels: [], datasets: [] };

    const isVolumeChart = activeChart === "volume";
    const chartData = isVolumeChart
      ? appData.volumeHistory
      : appData.tvlHistory;

    return {
      labels: chartData.map((item) => item.date),
      datasets: [
        {
          label: isVolumeChart ? "Volume (USD)" : "TVL (USD)",
          data: chartData.map((item) =>
            isVolumeChart ? item.volume : item.tvl
          ),
          fill: false,
          backgroundColor: isVolumeChart
            ? "rgba(16, 185, 129, 0.2)"
            : "rgba(59, 130, 246, 0.2)",
          borderColor: isVolumeChart
            ? "rgba(16, 185, 129, 1)"
            : "rgba(59, 130, 246, 1)",
          tension: 0.4,
          pointRadius: 2,
          pointHoverRadius: 4,
        },
      ],
    };
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            return `${
              activeChart === "volume" ? "Volume" : "TVL"
            }: ${formatCurrency(context.raw)}`;
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: false,
        ticks: {
          callback: function (value) {
            return formatCurrency(value);
          },
        },
      },
    },
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Link to="/apps" className="flex items-center text-primary mb-6">
          <FaArrowLeft className="mr-2" /> Back to Applications
        </Link>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Link to="/apps" className="flex items-center text-primary mb-6">
          <FaArrowLeft className="mr-2" /> Back to Applications
        </Link>
        <div className="bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400 p-4 rounded-lg">
          {error}
        </div>
      </div>
    );
  }

  if (!appData) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Link to="/apps" className="flex items-center text-primary mb-6">
          <FaArrowLeft className="mr-2" /> Back to Applications
        </Link>
        <div className="bg-yellow-100 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-400 p-4 rounded-lg">
          Application not found
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <Link to="/apps" className="flex items-center text-primary mb-6">
        <FaArrowLeft className="mr-2" /> Back to Applications
      </Link>

      {/* App Header */}
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-md overflow-hidden mb-8">
        <div className="p-6">
          <div className="flex flex-col md:flex-row items-start gap-6">
            <div className="w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden">
              <img
                src={appData.logo}
                alt={appData.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-grow">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold">
                    {appData.name}
                  </h1>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    <span className="inline-block px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded-full capitalize">
                      {appData.category}
                    </span>
                    <span className="ml-2">Launched {appData.launched}</span>
                  </p>
                </div>
                <div className="flex space-x-4 mt-4 md:mt-0">
                  {appData.links.website && (
                    <a
                      href={appData.links.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-500 hover:text-primary"
                    >
                      <FaGlobe size={20} />
                    </a>
                  )}
                  {appData.links.twitter && (
                    <a
                      href={appData.links.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-500 hover:text-primary"
                    >
                      <FaTwitter size={20} />
                    </a>
                  )}
                  {appData.links.discord && (
                    <a
                      href={appData.links.discord}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-500 hover:text-primary"
                    >
                      <FaDiscord size={20} />
                    </a>
                  )}
                  {appData.links.github && (
                    <a
                      href={appData.links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-500 hover:text-primary"
                    >
                      <FaGithub size={20} />
                    </a>
                  )}
                </div>
              </div>

              <p className="mt-4 text-gray-700 dark:text-gray-300">
                {appData.description}
              </p>

              <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Users
                  </p>
                  <p className="text-xl font-bold">
                    {formatNumber(appData.users)}
                  </p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    TVL
                  </p>
                  <p className="text-xl font-bold">
                    {formatCurrency(appData.tvl)}
                  </p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Volume (24h)
                  </p>
                  <p className="text-xl font-bold">
                    {formatCurrency(appData.volume24h)}
                  </p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Popularity Score
                  </p>
                  <p className="text-xl font-bold">
                    {appData.popularityScore}/100
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mb-6 border-b border-gray-200 dark:border-gray-700">
        <ul className="flex flex-wrap -mb-px">
          <li className="mr-2">
            <button
              onClick={() => setActiveTab("overview")}
              className={`inline-block py-4 px-4 text-sm font-medium border-b-2 ${
                activeTab === "overview"
                  ? "text-primary border-primary"
                  : "text-gray-500 border-transparent hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300"
              }`}
            >
              Overview
            </button>
          </li>
          <li className="mr-2">
            <button
              onClick={() => setActiveTab("statistics")}
              className={`inline-block py-4 px-4 text-sm font-medium border-b-2 ${
                activeTab === "statistics"
                  ? "text-primary border-primary"
                  : "text-gray-500 border-transparent hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300"
              }`}
            >
              Statistics
            </button>
          </li>
          <li className="mr-2">
            <button
              onClick={() => setActiveTab("tokens")}
              className={`inline-block py-4 px-4 text-sm font-medium border-b-2 ${
                activeTab === "tokens"
                  ? "text-primary border-primary"
                  : "text-gray-500 border-transparent hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300"
              }`}
            >
              Tokens
            </button>
          </li>
        </ul>
      </div>

      {/* Tab Content */}
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-md overflow-hidden">
        {activeTab === "overview" && (
          <div className="p-6">
            <h2 className="text-xl font-bold mb-6">About {appData.name}</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-8">
              {appData.longDescription}
            </p>

            {/* Features */}
            <h3 className="text-lg font-semibold mb-4">Features</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
              {appData.features.map((feature, index) => (
                <div
                  key={index}
                  className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 flex items-center"
                >
                  <span className="w-2 h-2 bg-primary rounded-full mr-2"></span>
                  <span>{feature}</span>
                </div>
              ))}
            </div>

            {/* Screenshots */}
            <h3 className="text-lg font-semibold mb-4">Screenshots</h3>
            <div className="mb-8">
              <div className="relative">
                <img
                  src={appData.screenshots[currentScreenshot]}
                  alt={`${appData.name} screenshot ${currentScreenshot + 1}`}
                  className="w-full h-auto rounded-lg"
                />

                {/* Navigation buttons */}
                {appData.screenshots.length > 1 && (
                  <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
                    {appData.screenshots.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentScreenshot(index)}
                        className={`w-3 h-3 rounded-full ${
                          currentScreenshot === index
                            ? "bg-primary"
                            : "bg-gray-300 dark:bg-gray-600"
                        }`}
                        aria-label={`View screenshot ${index + 1}`}
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* Thumbnail navigation */}
              {appData.screenshots.length > 1 && (
                <div className="mt-4 flex space-x-2 overflow-x-auto pb-2">
                  {appData.screenshots.map((screenshot, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentScreenshot(index)}
                      className={`flex-shrink-0 w-24 h-16 rounded-md overflow-hidden ${
                        currentScreenshot === index
                          ? "ring-2 ring-primary"
                          : "opacity-70"
                      }`}
                    >
                      <img
                        src={screenshot}
                        alt={`Thumbnail ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Visit App Button */}
            <div className="flex justify-center mt-8">
              <a
                href={appData.url}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-primary text-white rounded-lg flex items-center"
              >
                Visit {appData.name}{" "}
                <FaExternalLinkAlt className="ml-2" size={14} />
              </a>
            </div>
          </div>
        )}

        {activeTab === "statistics" && (
          <div className="p-6">
            <h2 className="text-xl font-bold mb-6">Statistics</h2>

            {/* Chart Type Selection */}
            <div className="mb-6 flex space-x-2">
              <button
                onClick={() => setActiveChart("volume")}
                className={`px-4 py-2 rounded-md text-sm ${
                  activeChart === "volume"
                    ? "bg-primary text-white"
                    : "bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700"
                }`}
              >
                Volume
              </button>
              <button
                onClick={() => setActiveChart("tvl")}
                className={`px-4 py-2 rounded-md text-sm ${
                  activeChart === "tvl"
                    ? "bg-primary text-white"
                    : "bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700"
                }`}
              >
                TVL
              </button>
            </div>

            {/* Chart */}
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg h-80 mb-8">
              <Line data={getChartData()} options={chartOptions} />
            </div>

            {/* Key Metrics */}
            <h3 className="text-lg font-semibold mb-4">Key Metrics</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-5">
                <div className="flex items-center mb-4">
                  <FaUsers className="text-primary mr-2" size={20} />
                  <h4 className="text-md font-semibold">User Statistics</h4>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-500 dark:text-gray-400">
                      Total Users
                    </span>
                    <span className="font-medium">
                      {formatNumber(appData.users)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500 dark:text-gray-400">
                      Daily Active Users
                    </span>
                    <span className="font-medium">
                      {formatNumber(appData.stats.dailyActiveUsers)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500 dark:text-gray-400">
                      User Growth (30d)
                    </span>
                    <span className="font-medium text-green-500">+8.2%</span>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-5">
                <div className="flex items-center mb-4">
                  <FaEthereum className="text-primary mr-2" size={20} />
                  <h4 className="text-md font-semibold">
                    Transaction Statistics
                  </h4>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-500 dark:text-gray-400">
                      Total Transactions
                    </span>
                    <span className="font-medium">
                      {formatNumber(appData.stats.totalTransactions)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500 dark:text-gray-400">
                      Average Fee
                    </span>
                    <span className="font-medium">
                      {appData.stats.averageFee} REWA
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500 dark:text-gray-400">
                      Total Volume (All Time)
                    </span>
                    <span className="font-medium">
                      {formatCurrency(appData.stats.totalVolumeAllTime)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "tokens" && (
          <div className="p-6">
            <h2 className="text-xl font-bold mb-6">Related Tokens</h2>

            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-800">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                    >
                      Token
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                    >
                      Price
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                    >
                      24h Change
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                    >
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-800">
                  {appData.tokens.map((token, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center mr-3">
                            <span className="font-bold text-xs">
                              {token.symbol.substring(0, 2)}
                            </span>
                          </div>
                          <div>
                            <div className="font-medium">{token.name}</div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">
                              {token.symbol}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="font-medium">
                          ${token.price.toFixed(2)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div
                          className={
                            token.change24h >= 0
                              ? "text-green-500"
                              : "text-red-500"
                          }
                        >
                          {token.change24h >= 0 ? "+" : ""}
                          {token.change24h.toFixed(2)}%
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Link
                          to={`/token/${token.symbol.toLowerCase()}`}
                          className="text-primary hover:underline"
                        >
                          View Details
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AppDetails;
