import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import {
  FaArrowLeft,
  FaExternalLinkAlt,
  FaTwitter,
  FaDiscord,
  FaGlobe,
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

// Mock data for a specific NFT collection
const mockNFTData = {
  "deadrare-dharitri-gorillaz": {
    id: "deadrare-dharitri-gorillaz",
    name: "dharitri Gorillaz",
    ticker: "GORILLAZ",
    description:
      "A collection of 5,000 unique Gorillaz NFTs, meticulously crafted with distinct traits and rarities. Each Gorillaz NFT grants exclusive access to the Gorillaz DAO and future ecosystem benefits.",
    creator: "DeadRare",
    items: 5000,
    holders: 1520,
    floor: 0.35,
    volume: 125600,
    image: "https://placehold.co/800x400/10b981/ffffff?text=GORILLAZ",
    links: {
      website: "https://dharitrigorillaz.io",
      twitter: "https://twitter.com/dharitriGorillaz",
      discord: "https://discord.gg/dharitrigorillaz",
    },
    priceHistory: [
      { date: "2023-06-01", price: 0.28 },
      { date: "2023-07-01", price: 0.32 },
      { date: "2023-08-01", price: 0.3 },
      { date: "2023-09-01", price: 0.26 },
      { date: "2023-10-01", price: 0.31 },
      { date: "2023-11-01", price: 0.33 },
      { date: "2023-12-01", price: 0.35 },
      { date: "2024-01-01", price: 0.38 },
      { date: "2024-02-01", price: 0.36 },
      { date: "2024-03-01", price: 0.3 },
      { date: "2024-04-01", price: 0.32 },
      { date: "2024-05-01", price: 0.35 },
    ],
    nfts: [
      {
        id: "gorillaz-1",
        name: "Gorillaz #1",
        image: "https://placehold.co/400x400/10b981/ffffff?text=G1",
        rarity: "Legendary",
        lastPrice: 2.5,
      },
      {
        id: "gorillaz-42",
        name: "Gorillaz #42",
        image: "https://placehold.co/400x400/10b981/ffffff?text=G42",
        rarity: "Rare",
        lastPrice: 0.75,
      },
      {
        id: "gorillaz-108",
        name: "Gorillaz #108",
        image: "https://placehold.co/400x400/10b981/ffffff?text=G108",
        rarity: "Uncommon",
        lastPrice: 0.42,
      },
      {
        id: "gorillaz-256",
        name: "Gorillaz #256",
        image: "https://placehold.co/400x400/10b981/ffffff?text=G256",
        rarity: "Common",
        lastPrice: 0.35,
      },
      {
        id: "gorillaz-512",
        name: "Gorillaz #512",
        image: "https://placehold.co/400x400/10b981/ffffff?text=G512",
        rarity: "Rare",
        lastPrice: 0.68,
      },
      {
        id: "gorillaz-1024",
        name: "Gorillaz #1024",
        image: "https://placehold.co/400x400/10b981/ffffff?text=G1024",
        rarity: "Epic",
        lastPrice: 1.2,
      },
      {
        id: "gorillaz-2048",
        name: "Gorillaz #2048",
        image: "https://placehold.co/400x400/10b981/ffffff?text=G2048",
        rarity: "Common",
        lastPrice: 0.36,
      },
      {
        id: "gorillaz-3000",
        name: "Gorillaz #3000",
        image: "https://placehold.co/400x400/10b981/ffffff?text=G3000",
        rarity: "Uncommon",
        lastPrice: 0.45,
      },
    ],
  },
  "hape-prime": {
    id: "hape-prime",
    name: "Hape Prime",
    ticker: "HAPE",
    description:
      "HAPE PRIME is a collection of 8,192 next-generation NFTs featuring highly fashionable apes with unique attributes and traits. HAPE holders gain access to exclusive drops, merchandise, and real-world events.",
    creator: "Digimental Studio",
    items: 8192,
    holders: 3204,
    floor: 1.2,
    volume: 524800,
    image: "https://placehold.co/800x400/1a4dda/ffffff?text=HAPE",
    links: {
      website: "https://hapeprime.com",
      twitter: "https://twitter.com/HapePrime",
      discord: "https://discord.gg/hapeprime",
    },
    priceHistory: [
      { date: "2023-06-01", price: 0.95 },
      { date: "2023-07-01", price: 1.1 },
      { date: "2023-08-01", price: 1.3 },
      { date: "2023-09-01", price: 1.5 },
      { date: "2023-10-01", price: 1.35 },
      { date: "2023-11-01", price: 1.25 },
      { date: "2023-12-01", price: 1.15 },
      { date: "2024-01-01", price: 1.0 },
      { date: "2024-02-01", price: 0.9 },
      { date: "2024-03-01", price: 1.05 },
      { date: "2024-04-01", price: 1.15 },
      { date: "2024-05-01", price: 1.2 },
    ],
    nfts: [
      {
        id: "hape-7",
        name: "Hape #7",
        image: "https://placehold.co/400x400/1a4dda/ffffff?text=H7",
        rarity: "Epic",
        lastPrice: 3.2,
      },
      {
        id: "hape-23",
        name: "Hape #23",
        image: "https://placehold.co/400x400/1a4dda/ffffff?text=H23",
        rarity: "Legendary",
        lastPrice: 5.6,
      },
      {
        id: "hape-99",
        name: "Hape #99",
        image: "https://placehold.co/400x400/1a4dda/ffffff?text=H99",
        rarity: "Rare",
        lastPrice: 1.8,
      },
      {
        id: "hape-156",
        name: "Hape #156",
        image: "https://placehold.co/400x400/1a4dda/ffffff?text=H156",
        rarity: "Common",
        lastPrice: 1.2,
      },
      {
        id: "hape-777",
        name: "Hape #777",
        image: "https://placehold.co/400x400/1a4dda/ffffff?text=H777",
        rarity: "Rare",
        lastPrice: 2.4,
      },
      {
        id: "hape-888",
        name: "Hape #888",
        image: "https://placehold.co/400x400/1a4dda/ffffff?text=H888",
        rarity: "Epic",
        lastPrice: 3.8,
      },
      {
        id: "hape-1111",
        name: "Hape #1111",
        image: "https://placehold.co/400x400/1a4dda/ffffff?text=H1111",
        rarity: "Uncommon",
        lastPrice: 1.5,
      },
      {
        id: "hape-4242",
        name: "Hape #4242",
        image: "https://placehold.co/400x400/1a4dda/ffffff?text=H4242",
        rarity: "Common",
        lastPrice: 1.1,
      },
    ],
  },
};

const NFTDetails = () => {
  const { nftId } = useParams();
  const [nftData, setNftData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("items");

  useEffect(() => {
    const fetchNFTDetails = async () => {
      setIsLoading(true);
      setError(null);
      try {
        // In a real app, we'd fetch from API
        // const response = await apiService.getNFTDetails(nftId);

        // Using mock data for now
        if (mockNFTData[nftId]) {
          // Simulate API delay
          setTimeout(() => {
            setNftData(mockNFTData[nftId]);
            setIsLoading(false);
          }, 800);
        } else {
          setError("NFT collection not found");
          setIsLoading(false);
        }
      } catch (err) {
        setError("Failed to fetch NFT details");
        console.error(err);
        setIsLoading(false);
      }
    };

    fetchNFTDetails();
  }, [nftId]);

  const formatNumber = (num) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + "M";
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + "K";
    } else {
      return num.toString();
    }
  };

  // Chart configuration for price history
  const chartData = {
    labels: nftData?.priceHistory?.map((item) => item.date) || [],
    datasets: [
      {
        label: "Floor Price (REWA)",
        data: nftData?.priceHistory?.map((item) => item.price) || [],
        fill: false,
        backgroundColor: "rgba(16, 185, 129, 0.2)",
        borderColor: "rgba(16, 185, 129, 1)",
        tension: 0.4,
        pointRadius: 2,
        pointHoverRadius: 4,
      },
    ],
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
            return `Floor Price: ${context.raw} REWA`;
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: false,
        ticks: {
          callback: function (value) {
            return value + " REWA";
          },
        },
      },
    },
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Link to="/nfts" className="flex items-center text-primary mb-6">
          <FaArrowLeft className="mr-2" /> Back to Collections
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
        <Link to="/nfts" className="flex items-center text-primary mb-6">
          <FaArrowLeft className="mr-2" /> Back to Collections
        </Link>
        <div className="bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400 p-4 rounded-lg">
          {error}
        </div>
      </div>
    );
  }

  if (!nftData) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Link to="/nfts" className="flex items-center text-primary mb-6">
          <FaArrowLeft className="mr-2" /> Back to Collections
        </Link>
        <div className="bg-yellow-100 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-400 p-4 rounded-lg">
          NFT collection not found
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <Link to="/nfts" className="flex items-center text-primary mb-6">
        <FaArrowLeft className="mr-2" /> Back to Collections
      </Link>

      {/* NFT Collection Header */}
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-md overflow-hidden mb-8">
        <div className="w-full h-48 md:h-64 overflow-hidden">
          <img
            src={nftData.image}
            alt={nftData.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold">{nftData.name}</h1>
              <p className="text-gray-500 dark:text-gray-400 text-sm md:text-base mt-1">
                Created by{" "}
                <span className="text-primary">{nftData.creator}</span>
              </p>
            </div>
            <div className="flex space-x-4 mt-4 md:mt-0">
              {nftData.links.website && (
                <a
                  href={nftData.links.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-500 hover:text-primary"
                >
                  <FaGlobe size={20} />
                </a>
              )}
              {nftData.links.twitter && (
                <a
                  href={nftData.links.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-500 hover:text-primary"
                >
                  <FaTwitter size={20} />
                </a>
              )}
              {nftData.links.discord && (
                <a
                  href={nftData.links.discord}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-500 hover:text-primary"
                >
                  <FaDiscord size={20} />
                </a>
              )}
            </div>
          </div>

          <p className="mt-4 text-gray-700 dark:text-gray-300">
            {nftData.description}
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Floor Price
              </p>
              <p className="text-xl font-bold">{nftData.floor} REWA</p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
              <p className="text-xs text-gray-500 dark:text-gray-400">Items</p>
              <p className="text-xl font-bold">{formatNumber(nftData.items)}</p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Holders
              </p>
              <p className="text-xl font-bold">
                {formatNumber(nftData.holders)}
              </p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
              <p className="text-xs text-gray-500 dark:text-gray-400">Volume</p>
              <p className="text-xl font-bold">
                {formatNumber(nftData.volume)} REWA
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mb-6 border-b border-gray-200 dark:border-gray-700">
        <ul className="flex flex-wrap -mb-px">
          <li className="mr-2">
            <button
              onClick={() => setActiveTab("items")}
              className={`inline-block py-4 px-4 text-sm font-medium border-b-2 ${
                activeTab === "items"
                  ? "text-primary border-primary"
                  : "text-gray-500 border-transparent hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300"
              }`}
            >
              Items
            </button>
          </li>
          <li className="mr-2">
            <button
              onClick={() => setActiveTab("analytics")}
              className={`inline-block py-4 px-4 text-sm font-medium border-b-2 ${
                activeTab === "analytics"
                  ? "text-primary border-primary"
                  : "text-gray-500 border-transparent hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300"
              }`}
            >
              Analytics
            </button>
          </li>
          <li className="mr-2">
            <button
              onClick={() => setActiveTab("holders")}
              className={`inline-block py-4 px-4 text-sm font-medium border-b-2 ${
                activeTab === "holders"
                  ? "text-primary border-primary"
                  : "text-gray-500 border-transparent hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300"
              }`}
            >
              Holders
            </button>
          </li>
        </ul>
      </div>

      {/* Tab Content */}
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-md overflow-hidden">
        {activeTab === "items" && (
          <div className="p-6">
            <h2 className="text-xl font-bold mb-4">Collection Items</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {nftData.nfts.map((item) => (
                <div
                  key={item.id}
                  className="bg-gray-50 dark:bg-gray-800 rounded-lg overflow-hidden"
                >
                  <div className="aspect-square overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold">{item.name}</h3>
                    <div className="flex justify-between items-center mt-2">
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${
                          item.rarity === "Legendary"
                            ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-500"
                            : item.rarity === "Epic"
                            ? "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-500"
                            : item.rarity === "Rare"
                            ? "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-500"
                            : item.rarity === "Uncommon"
                            ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-500"
                            : "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
                        }`}
                      >
                        {item.rarity}
                      </span>
                      <span className="text-sm font-medium">
                        {item.lastPrice} REWA
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "analytics" && (
          <div className="p-6">
            <h2 className="text-xl font-bold mb-4">Price History</h2>
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg h-80">
              <Line data={chartData} options={chartOptions} />
            </div>

            <div className="mt-8">
              <h3 className="text-lg font-semibold mb-4">Collection Stats</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-50 dark:bg-gray-800">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                      >
                        Metric
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
                        Change (30d)
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-800">
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        Floor Price
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        {nftData.floor} REWA
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-green-500">
                        +5.2%
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        Volume (24h)
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        245 REWA
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-red-500">
                        -2.8%
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        Sales (24h)
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        18
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-green-500">
                        +12.5%
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        Listings
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        432
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-red-500">
                        -1.4%
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        Average Price
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        0.58 REWA
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-green-500">
                        +3.6%
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === "holders" && (
          <div className="p-6">
            <h2 className="text-xl font-bold mb-4">Top Holders</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-800">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                    >
                      Rank
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                    >
                      Address
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                    >
                      Items
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                    >
                      % of Collection
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-800">
                  {[...Array(10)].map((_, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        {index + 1}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-primary">
                        <Link
                          to={`/account/erd1${"x".repeat(20)}${index}`}
                          className="hover:underline"
                        >
                          erd1{"x".repeat(10)}...{"x".repeat(6)}
                          {index}
                        </Link>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        {Math.floor(Math.random() * 200) + 20}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        {(Math.random() * 4 + 1).toFixed(2)}%
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex justify-center mt-8">
              <button className="px-4 py-2 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-md">
                View More Holders
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NFTDetails;
