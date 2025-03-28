import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaSearch, FaSort, FaSortUp, FaSortDown } from "react-icons/fa";
import apiService from "../utils/api";
import { formatNumber, formatCurrency } from "../utils/formatters";

const NFTs = () => {
  const [nfts, setNFTs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortField, setSortField] = useState("popularity");
  const [sortDirection, setSortDirection] = useState("desc");
  const pageSize = 12;

  // Mock NFT data
  const mockNFTs = [
    {
      id: "deadrare-dharitri-gorillaz",
      name: "dharitri Gorillaz",
      ticker: "GORILLAZ",
      items: 5000,
      holders: 1520,
      floor: 0.35,
      volume: 125600,
      image: "https://placehold.co/400x400/10b981/ffffff?text=GORILLAZ",
    },
    {
      id: "hape-prime",
      name: "Hape Prime",
      ticker: "HAPE",
      items: 8192,
      holders: 3204,
      floor: 1.2,
      volume: 524800,
      image: "https://placehold.co/400x400/1a4dda/ffffff?text=HAPE",
    },
    {
      id: "cyberpunks",
      name: "CyberPunks",
      ticker: "CYBRP",
      items: 10000,
      holders: 4500,
      floor: 0.85,
      volume: 356200,
      image: "https://placehold.co/400x400/f59e0b/ffffff?text=CYBRP",
    },
    {
      id: "elfin-dragons",
      name: "Elfin Dragons",
      ticker: "DRAGONS",
      items: 3000,
      holders: 1250,
      floor: 2.4,
      volume: 288000,
      image: "https://placehold.co/400x400/8b5cf6/ffffff?text=DRAGONS",
    },
    {
      id: "ape-league",
      name: "Ape League",
      ticker: "APLEAG",
      items: 6000,
      holders: 2100,
      floor: 0.55,
      volume: 210000,
      image: "https://placehold.co/400x400/ef4444/ffffff?text=APLEAG",
    },
    {
      id: "pixel-heroes",
      name: "Pixel Heroes",
      ticker: "HEROES",
      items: 4500,
      holders: 1800,
      floor: 0.28,
      volume: 175000,
      image: "https://placehold.co/400x400/3b82f6/ffffff?text=HEROES",
    },
    {
      id: "crypto-kitties",
      name: "Crypto Kitties",
      ticker: "KITTIES",
      items: 7800,
      holders: 3100,
      floor: 0.18,
      volume: 145000,
      image: "https://placehold.co/400x400/10b981/ffffff?text=KITTIES",
    },
    {
      id: "space-punks",
      name: "Space Punks",
      ticker: "SPUNKS",
      items: 5500,
      holders: 2400,
      floor: 0.65,
      volume: 320000,
      image: "https://placehold.co/400x400/6366f1/ffffff?text=SPUNKS",
    },
    {
      id: "dmt-cities",
      name: "DMT Cities",
      ticker: "CITIES",
      items: 1000,
      holders: 750,
      floor: 3.5,
      volume: 420000,
      image: "https://placehold.co/400x400/14b8a6/ffffff?text=CITIES",
    },
    {
      id: "virtual-lands",
      name: "Virtual Lands",
      ticker: "LANDS",
      items: 12000,
      holders: 5500,
      floor: 0.42,
      volume: 680000,
      image: "https://placehold.co/400x400/f97316/ffffff?text=LANDS",
    },
    {
      id: "meta-avatars",
      name: "Meta Avatars",
      ticker: "AVATARS",
      items: 9500,
      holders: 4200,
      floor: 0.75,
      volume: 520000,
      image: "https://placehold.co/400x400/a855f7/ffffff?text=AVATARS",
    },
    {
      id: "music-nfts",
      name: "Music NFTs",
      ticker: "MUSIC",
      items: 2500,
      holders: 980,
      floor: 1.8,
      volume: 245000,
      image: "https://placehold.co/400x400/ec4899/ffffff?text=MUSIC",
    },
  ];

  useEffect(() => {
    const fetchNFTs = async () => {
      setIsLoading(true);
      setError(null);
      try {
        // In a real app, we'd fetch from API
        // const response = await apiService.getNFTs(currentPage, pageSize, sortField, sortDirection);

        // Using mock data for now
        // Sort the mock data
        const sortedNFTs = [...mockNFTs].sort((a, b) => {
          let valueA, valueB;

          switch (sortField) {
            case "name":
              valueA = a.name;
              valueB = b.name;
              break;
            case "items":
              valueA = a.items;
              valueB = b.items;
              break;
            case "holders":
              valueA = a.holders;
              valueB = b.holders;
              break;
            case "floor":
              valueA = a.floor;
              valueB = b.floor;
              break;
            case "volume":
              valueA = a.volume;
              valueB = b.volume;
              break;
            default:
              valueA = a.volume; // Default to volume for popularity
              valueB = b.volume;
          }

          if (typeof valueA === "string") {
            const compareResult = valueA.localeCompare(valueB);
            return sortDirection === "asc" ? compareResult : -compareResult;
          } else {
            return sortDirection === "asc" ? valueA - valueB : valueB - valueA;
          }
        });

        // Paginate the data
        const start = (currentPage - 1) * pageSize;
        const end = start + pageSize;
        const paginatedNFTs = sortedNFTs.slice(start, end);

        setNFTs(paginatedNFTs);
        setTotalPages(Math.ceil(mockNFTs.length / pageSize));

        // Simulate API delay
        setTimeout(() => {
          setIsLoading(false);
        }, 500);
      } catch (err) {
        setError("Failed to fetch NFT collections");
        console.error(err);
        setIsLoading(false);
      }
    };

    fetchNFTs();
  }, [currentPage, sortField, sortDirection]);

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
    // Implement NFT search functionality
    console.log("Searching for:", searchQuery);
  };

  const renderSortIcon = (field) => {
    if (sortField !== field) return <FaSort className="ml-1 text-gray-400" />;
    if (sortDirection === "asc")
      return <FaSortUp className="ml-1 text-primary" />;
    return <FaSortDown className="ml-1 text-primary" />;
  };

  const renderPagination = () => {
    return (
      <div className="flex items-center justify-center mt-8 space-x-2">
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

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">NFT Collections</h1>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">NFT Collections</h1>
        <div className="bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400 p-4 rounded-lg">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <h1 className="text-2xl font-bold">NFT Collections</h1>
        <form onSubmit={handleSearch} className="mt-4 md:mt-0 relative">
          <input
            type="text"
            placeholder="Search NFT collections..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-4 py-2 w-full md:w-64 rounded-lg bg-gray-100 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <FaSearch className="absolute left-3 top-3 text-gray-400" />
        </form>
      </div>

      {/* Sorting Options */}
      <div className="mb-6 flex flex-wrap gap-2">
        <button
          onClick={() => handleSort("popularity")}
          className={`px-3 py-1 rounded-md text-sm flex items-center ${
            sortField === "popularity"
              ? "bg-primary text-white"
              : "bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700"
          }`}
        >
          Popularity {renderSortIcon("popularity")}
        </button>
        <button
          onClick={() => handleSort("name")}
          className={`px-3 py-1 rounded-md text-sm flex items-center ${
            sortField === "name"
              ? "bg-primary text-white"
              : "bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700"
          }`}
        >
          Name {renderSortIcon("name")}
        </button>
        <button
          onClick={() => handleSort("floor")}
          className={`px-3 py-1 rounded-md text-sm flex items-center ${
            sortField === "floor"
              ? "bg-primary text-white"
              : "bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700"
          }`}
        >
          Floor Price {renderSortIcon("floor")}
        </button>
        <button
          onClick={() => handleSort("volume")}
          className={`px-3 py-1 rounded-md text-sm flex items-center ${
            sortField === "volume"
              ? "bg-primary text-white"
              : "bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700"
          }`}
        >
          Volume {renderSortIcon("volume")}
        </button>
        <button
          onClick={() => handleSort("items")}
          className={`px-3 py-1 rounded-md text-sm flex items-center ${
            sortField === "items"
              ? "bg-primary text-white"
              : "bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700"
          }`}
        >
          Items {renderSortIcon("items")}
        </button>
      </div>

      {/* NFT Collections Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {nfts.map((nft) => (
          <Link
            key={nft.id}
            to={`/nft/${nft.id}`}
            className="bg-white dark:bg-gray-900 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
          >
            <div className="aspect-square overflow-hidden">
              <img
                src={nft.image}
                alt={nft.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold">{nft.name}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                {nft.ticker}
              </p>

              <div className="grid grid-cols-2 gap-x-4 gap-y-2 mt-3 text-sm">
                <div>
                  <p className="text-gray-500 dark:text-gray-400">Floor</p>
                  <p className="font-medium">{nft.floor} REWA</p>
                </div>
                <div>
                  <p className="text-gray-500 dark:text-gray-400">Items</p>
                  <p className="font-medium">{formatNumber(nft.items)}</p>
                </div>
                <div>
                  <p className="text-gray-500 dark:text-gray-400">Holders</p>
                  <p className="font-medium">{formatNumber(nft.holders)}</p>
                </div>
                <div>
                  <p className="text-gray-500 dark:text-gray-400">Volume</p>
                  <p className="font-medium">{formatNumber(nft.volume)} REWA</p>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {renderPagination()}
    </div>
  );
};

export default NFTs;
