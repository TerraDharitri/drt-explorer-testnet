import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FaSearch,
  FaFilter,
  FaStar,
  FaUsers,
  FaEthereum,
  FaArrowUp,
  FaArrowDown,
} from "react-icons/fa";
import apiService from "../utils/api";

const Apps = () => {
  const [apps, setApps] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("popularity");
  const [sortOrder, setSortOrder] = useState("desc");
  const [showFilters, setShowFilters] = useState(false);

  // Categories
  const categories = [
    { id: "all", name: "All dApps" },
    { id: "defi", name: "DeFi" },
    { id: "nft", name: "NFT" },
    { id: "games", name: "Games" },
    { id: "social", name: "Social" },
    { id: "dao", name: "DAO" },
    { id: "utility", name: "Utility" },
  ];

  // Mock dApps data
  const mockApps = [
    {
      id: "dharitri-exchange",
      name: "Dharitri Exchange",
      description:
        "A revolutionary decentralized exchange built on Dharitri Network, enabling the trading of tokenized assets with near-instant settlements.",
      category: "defi",
      url: "https://dharitri.exchange",
      logo: "https://placehold.co/200x200/1a4dda/ffffff?text=DSwap",
      users: 125000,
      tvl: 352000000,
      volume24h: 5800000,
      popularityScore: 98,
      verified: true,
    },
    {
      id: "dreamrare",
      name: "DreamRare",
      description:
        "The premier NFT marketplace on Dharitri, featuring digital collectibles, art, and gaming assets.",
      category: "nft",
      url: "https://dreamrare.io",
      logo: "https://placehold.co/200x200/10b981/ffffff?text=DreamRare",
      users: 85000,
      tvl: 12500000,
      volume24h: 980000,
      popularityScore: 92,
      verified: true,
    },
    {
      id: "dharitri-knights",
      name: "dharitri Knights",
      description:
        "Play-to-earn RPG game where players can earn tokens and NFTs by completing quests and battling other players.",
      category: "games",
      url: "https://dharitriknights.com",
      logo: "https://placehold.co/200x200/f59e0b/ffffff?text=Knights",
      users: 42000,
      tvl: 8500000,
      volume24h: 650000,
      popularityScore: 85,
      verified: true,
    },
    {
      id: "growth-defi",
      name: "Growth DeFi",
      description:
        "Advanced yield farming protocol that maximizes returns through automated strategies and compounding.",
      category: "defi",
      url: "https://growthdefi.io",
      logo: "https://placehold.co/200x200/8b5cf6/ffffff?text=Growth",
      users: 28000,
      tvl: 42000000,
      volume24h: 3200000,
      popularityScore: 83,
      verified: true,
    },
    {
      id: "dharitri-social",
      name: "Dharitri Social",
      description:
        "Decentralized social network where users own their data and earn rewards for content creation and engagement.",
      category: "social",
      url: "https://dhasocial.network",
      logo: "https://placehold.co/200x200/ef4444/ffffff?text=DSocial",
      users: 68000,
      tvl: 5800000,
      volume24h: 240000,
      popularityScore: 79,
      verified: true,
    },
    {
      id: "chain-vault",
      name: "Chain Vault",
      description:
        "Secure multi-signature wallet and treasury management system for organizations and DAOs.",
      category: "utility",
      url: "https://chainvault.finance",
      logo: "https://placehold.co/200x200/3b82f6/ffffff?text=Vault",
      users: 12500,
      tvl: 78000000,
      volume24h: 420000,
      popularityScore: 76,
      verified: true,
    },
    {
      id: "dharitri-dao",
      name: "Dharitri DAO",
      description:
        "Decentralized autonomous organization focused on funding and supporting Dharitri ecosystem projects.",
      category: "dao",
      url: "https://dharitriao.org",
      logo: "https://placehold.co/200x200/a855f7/ffffff?text=DAO",
      users: 9200,
      tvl: 24000000,
      volume24h: 180000,
      popularityScore: 74,
      verified: true,
    },
    {
      id: "nftify",
      name: "NFTify",
      description:
        "Platform for creating, managing, and selling NFTs without technical knowledge.",
      category: "nft",
      url: "https://nftify.io",
      logo: "https://placehold.co/200x200/ec4899/ffffff?text=NFTify",
      users: 32000,
      tvl: 4800000,
      volume24h: 560000,
      popularityScore: 72,
      verified: true,
    },
    {
      id: "dharitri-worlds",
      name: "Dharitri Worlds",
      description:
        "Metaverse game where players can own virtual land, build experiences, and socialize in a 3D environment.",
      category: "games",
      url: "https://dharitriworlds.game",
      logo: "https://placehold.co/200x200/14b8a6/ffffff?text=DWorlds",
      users: 38000,
      tvl: 7200000,
      volume24h: 420000,
      popularityScore: 70,
      verified: true,
    },
    {
      id: "identity-dao",
      name: "Identity DAO",
      description:
        "Decentralized identity verification and authentication system built on blockchain.",
      category: "utility",
      url: "https://identitydao.io",
      logo: "https://placehold.co/200x200/f97316/ffffff?text=Identity",
      users: 16500,
      tvl: 3800000,
      volume24h: 85000,
      popularityScore: 65,
      verified: false,
    },
    {
      id: "defi-lend",
      name: "DeFi Lend",
      description:
        "Decentralized lending and borrowing platform with competitive interest rates.",
      category: "defi",
      url: "https://defilend.finance",
      logo: "https://placehold.co/200x200/06b6d4/ffffff?text=Lend",
      users: 24000,
      tvl: 18000000,
      volume24h: 1200000,
      popularityScore: 68,
      verified: true,
    },
    {
      id: "social-chain",
      name: "Social Chain",
      description:
        "Blockchain-based messaging and social media platform with built-in rewards.",
      category: "social",
      url: "https://socialchain.app",
      logo: "https://placehold.co/200x200/d946ef/ffffff?text=Social",
      users: 45000,
      tvl: 2400000,
      volume24h: 120000,
      popularityScore: 66,
      verified: false,
    },
  ];

  useEffect(() => {
    const fetchApps = async () => {
      setIsLoading(true);
      setError(null);
      try {
        // In a real app, we'd fetch from API
        // const response = await apiService.getApps(activeCategory, sortBy, sortOrder);

        // Using mock data for now
        // Filter by category
        let filteredApps =
          activeCategory === "all"
            ? [...mockApps]
            : mockApps.filter((app) => app.category === activeCategory);

        // Apply search filter if present
        if (searchQuery.trim() !== "") {
          const query = searchQuery.toLowerCase();
          filteredApps = filteredApps.filter(
            (app) =>
              app.name.toLowerCase().includes(query) ||
              app.description.toLowerCase().includes(query)
          );
        }

        // Sort data
        filteredApps.sort((a, b) => {
          let valueA, valueB;

          switch (sortBy) {
            case "name":
              valueA = a.name;
              valueB = b.name;
              break;
            case "users":
              valueA = a.users;
              valueB = b.users;
              break;
            case "tvl":
              valueA = a.tvl;
              valueB = b.tvl;
              break;
            case "volume":
              valueA = a.volume24h;
              valueB = b.volume24h;
              break;
            default:
              valueA = a.popularityScore;
              valueB = b.popularityScore;
          }

          if (typeof valueA === "string") {
            const compareResult = valueA.localeCompare(valueB);
            return sortOrder === "asc" ? compareResult : -compareResult;
          } else {
            return sortOrder === "asc" ? valueA - valueB : valueB - valueA;
          }
        });

        // Simulate API delay
        setTimeout(() => {
          setApps(filteredApps);
          setIsLoading(false);
        }, 600);
      } catch (err) {
        setError("Failed to fetch dApps");
        console.error(err);
        setIsLoading(false);
      }
    };

    fetchApps();
  }, [activeCategory, searchQuery, sortBy, sortOrder]);

  const handleSearch = (e) => {
    e.preventDefault();
    // Search is already handled in the useEffect
  };

  const toggleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortOrder("desc");
    }
  };

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

  const renderSortIcon = (field) => {
    if (sortBy !== field) return null;
    return sortOrder === "asc" ? (
      <FaArrowUp className="ml-1" />
    ) : (
      <FaArrowDown className="ml-1" />
    );
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Decentralized Applications</h1>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Decentralized Applications</h1>
        <div className="bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400 p-4 rounded-lg">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <h1 className="text-2xl font-bold">Decentralized Applications</h1>

        <div className="flex items-center mt-4 md:mt-0 space-x-2">
          <form onSubmit={handleSearch} className="relative">
            <input
              type="text"
              placeholder="Search dApps..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 w-full rounded-lg bg-gray-100 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <FaSearch className="absolute left-3 top-3 text-gray-400" />
          </form>

          <button
            onClick={() => setShowFilters(!showFilters)}
            className="p-2 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            <FaFilter
              className={showFilters ? "text-primary" : "text-gray-500"}
            />
          </button>
        </div>
      </div>

      {/* Categories */}
      <div className="mb-6 flex flex-wrap gap-2">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setActiveCategory(category.id)}
            className={`px-3 py-1 rounded-md text-sm ${
              activeCategory === category.id
                ? "bg-primary text-white"
                : "bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700"
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>

      {/* Filters */}
      {showFilters && (
        <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <h3 className="font-semibold mb-3">Sort by</h3>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => toggleSort("popularity")}
              className={`px-3 py-1 rounded-md text-sm flex items-center ${
                sortBy === "popularity"
                  ? "bg-primary text-white"
                  : "bg-white dark:bg-gray-700"
              }`}
            >
              Popularity {renderSortIcon("popularity")}
            </button>
            <button
              onClick={() => toggleSort("name")}
              className={`px-3 py-1 rounded-md text-sm flex items-center ${
                sortBy === "name"
                  ? "bg-primary text-white"
                  : "bg-white dark:bg-gray-700"
              }`}
            >
              Name {renderSortIcon("name")}
            </button>
            <button
              onClick={() => toggleSort("users")}
              className={`px-3 py-1 rounded-md text-sm flex items-center ${
                sortBy === "users"
                  ? "bg-primary text-white"
                  : "bg-white dark:bg-gray-700"
              }`}
            >
              Users {renderSortIcon("users")}
            </button>
            <button
              onClick={() => toggleSort("tvl")}
              className={`px-3 py-1 rounded-md text-sm flex items-center ${
                sortBy === "tvl"
                  ? "bg-primary text-white"
                  : "bg-white dark:bg-gray-700"
              }`}
            >
              TVL {renderSortIcon("tvl")}
            </button>
            <button
              onClick={() => toggleSort("volume")}
              className={`px-3 py-1 rounded-md text-sm flex items-center ${
                sortBy === "volume"
                  ? "bg-primary text-white"
                  : "bg-white dark:bg-gray-700"
              }`}
            >
              Volume {renderSortIcon("volume")}
            </button>
          </div>
        </div>
      )}

      {/* Results Count */}
      <p className="mb-6 text-gray-500 dark:text-gray-400">
        Showing {apps.length}{" "}
        {apps.length === 1 ? "application" : "applications"}
      </p>

      {/* Apps List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {apps.map((app) => (
          <Link
            key={app.id}
            to={`/app/${app.id}`}
            className="bg-white dark:bg-gray-900 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
          >
            <div className="p-6">
              <div className="flex items-start">
                <div className="w-16 h-16 mr-4 flex-shrink-0 overflow-hidden rounded-lg">
                  <img
                    src={app.logo}
                    alt={app.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <div className="flex items-center">
                    <h3 className="text-lg font-semibold">{app.name}</h3>
                    {app.verified && (
                      <span className="ml-2 text-primary" title="Verified dApp">
                        <FaStar size={12} />
                      </span>
                    )}
                  </div>
                  <span className="inline-block px-2 py-1 text-xs bg-gray-100 dark:bg-gray-800 rounded-full mt-1 capitalize">
                    {app.category}
                  </span>
                </div>
              </div>

              <p className="mt-4 text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                {app.description}
              </p>

              <div className="mt-4 grid grid-cols-3 gap-2">
                <div className="text-center">
                  <div className="flex items-center justify-center text-gray-500 mb-1">
                    <FaUsers size={12} className="mr-1" />
                    <span className="text-xs">Users</span>
                  </div>
                  <p className="font-medium text-sm">
                    {formatNumber(app.users)}
                  </p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center text-gray-500 mb-1">
                    <FaEthereum size={12} className="mr-1" />
                    <span className="text-xs">TVL</span>
                  </div>
                  <p className="font-medium text-sm">
                    {formatCurrency(app.tvl)}
                  </p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center text-gray-500 mb-1">
                    <span className="text-xs">Volume 24h</span>
                  </div>
                  <p className="font-medium text-sm">
                    {formatCurrency(app.volume24h)}
                  </p>
                </div>
              </div>

              <div className="mt-4 text-xs text-gray-500 truncate">
                <span className="hover:text-primary">{app.url}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {apps.length === 0 && (
        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 text-center">
          <p className="text-gray-500 dark:text-gray-400">
            No dApps found matching your criteria.
          </p>
          <button
            onClick={() => {
              setSearchQuery("");
              setActiveCategory("all");
            }}
            className="mt-2 text-primary hover:underline"
          >
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
};

export default Apps;
