import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  FaSearch,
  FaExchangeAlt,
  FaCube,
  FaUser,
  FaCoins,
  FaGlobe,
  FaSadTear,
} from "react-icons/fa";
import {
  shortenAddress,
  formatNumber,
  formatCrypto,
  timeAgo,
} from "../../utils/formatters";

const SearchResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("all");
  const [results, setResults] = useState({
    transactions: [],
    blocks: [],
    accounts: [],
    tokens: [],
    nfts: [],
  });
  const [totalResults, setTotalResults] = useState(0);
  const [newSearchQuery, setNewSearchQuery] = useState("");

  // Extract query parameters
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const query = params.get("q");
    if (query) {
      setSearchQuery(query);
      setNewSearchQuery(query);
      performSearch(query);
    } else {
      setError("No search query provided");
      setIsLoading(false);
    }
  }, [location.search]);

  const performSearch = async (query) => {
    setIsLoading(true);
    setError(null);
    try {
      // In a real app, we'd fetch from APIs
      // const [txResponse, blockResponse, accountResponse, tokenResponse, nftResponse] = await Promise.all([
      //   apiService.searchTransactions(query),
      //   apiService.searchBlocks(query),
      //   apiService.searchAccounts(query),
      //   apiService.searchTokens(query),
      //   apiService.searchNFTs(query),
      // ]);

      // Using mock data for now
      setTimeout(() => {
        let mockResults = {
          transactions: [],
          blocks: [],
          accounts: [],
          tokens: [],
          nfts: [],
        };

        // If the query looks like a hash, return transaction results
        if (query.length > 40) {
          mockResults.transactions = [
            {
              hash: query.padEnd(64, "0").substring(0, 64),
              from: "erd1qyu5wthldzr8wx5c9ucg8kjagg0jfs53s8nr3zpz3hypefsdd8ssycr6th",
              to: "erd18s6a06ktr2v6fvlv5yfxdqnsdmazrvsxwdq7vzxsd7h5pxjkh40qv3xuk5",
              value: "50000000000000000",
              fee: "50000000000",
              timestamp: Date.now() - 1000 * 60 * 30,
              status: "success",
              gasUsed: "50000",
              data: "transfer",
            },
          ];
        }

        // If the query starts with erd1, return account results
        if (query.startsWith("erd1")) {
          mockResults.accounts = [
            {
              address: query,
              balance: "3240000000000000000",
              nonce: 458,
              shard: 0,
              username: query.includes("alice") ? "alice.dharitri" : "",
              isVerified: query.includes("alice"),
              transactions: 1254,
            },
          ];
        }

        // If the query is numeric, return block results
        if (!isNaN(query) && query.length < 10) {
          const blockNumber = parseInt(query);
          mockResults.blocks = [
            {
              nonce: blockNumber,
              hash: `c8e12cfbd10ecadf8b7a9eef670e84f66a95a8efe0f7a88307b31d76${blockNumber}`,
              shard: 0,
              timestamp: Date.now() - 1000 * 60 * blockNumber,
              txCount: 42,
              size: 82451,
              proposer:
                "erd1qqqqqqqqqqqqqpgqp699jngundfqw07d8jzkepucvpzush6k3wvqyc44rx",
            },
          ];
        }

        // For any general query, add some matching tokens
        if (query.length >= 3) {
          // Check if any token name or ticker matches the query
          const tokenMatches = ["REWA", "MEX", "UTK", "RIDE"].filter((t) =>
            t.toLowerCase().includes(query.toLowerCase())
          );

          if (
            tokenMatches.length > 0 ||
            query.toLowerCase().includes("token")
          ) {
            mockResults.tokens = [
              {
                identifier: "REWA-a1a1a1",
                name: "Dharitri REWA",
                ticker: "REWA",
                decimals: 18,
                price: 42.35,
                marketCap: 1235000000,
                supply: 22897654,
                holders: 742935,
              },
              {
                identifier: "MEX-a4cf0e",
                name: "Maiar Exchange Token",
                ticker: "MEX",
                decimals: 18,
                price: 0.00012,
                marketCap: 12500000,
                supply: 104166666666,
                holders: 98435,
              },
            ];
          }

          // Check if any NFT name matches the query
          const nftMatches = ["Gorillaz", "Hape", "Land"].filter((t) =>
            t.toLowerCase().includes(query.toLowerCase())
          );

          if (nftMatches.length > 0 || query.toLowerCase().includes("nft")) {
            mockResults.nfts = [
              {
                identifier: "GORILLAZ-38e92a",
                name: "Dharitri Gorillaz",
                items: 10000,
                floor: 0.45,
                volume: 425000,
                holders: 4875,
                image:
                  "https://placehold.co/400x400/10b981/ffffff?text=GORILLAZ",
              },
              {
                identifier: "HAPE-d4e5f6",
                name: "Hape Prime",
                items: 8192,
                floor: 0.45,
                volume: 184500,
                holders: 3246,
                image: "https://placehold.co/400x400/1a4dda/ffffff?text=HAPE",
              },
            ];
          }
        }

        // Calculate total results
        const total = Object.values(mockResults).reduce(
          (acc, curr) => acc + curr.length,
          0
        );
        setTotalResults(total);

        // If we got no results, set an appropriate error
        if (total === 0) {
          setError(`No results found for "${query}"`);
        }

        // Determine which tab to activate based on results
        if (total > 0) {
          const tabsWithResults = Object.entries(mockResults)
            .filter(([_, results]) => results.length > 0)
            .map(([tab, _]) => tab);

          if (tabsWithResults.length > 0) {
            setActiveTab(tabsWithResults[0]);
          }
        }

        setResults(mockResults);
        setIsLoading(false);
      }, 800);
    } catch (err) {
      setError(`Failed to search for "${query}"`);
      console.error(err);
      setIsLoading(false);
    }
  };

  const handleNewSearch = (e) => {
    e.preventDefault();
    if (newSearchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(newSearchQuery.trim())}`);
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

  const hasResults = (tabName) => {
    if (tabName === "all") {
      return totalResults > 0;
    }
    return results[tabName] && results[tabName].length > 0;
  };

  const getActiveTabContent = () => {
    if (activeTab === "all") {
      // Show a summary of all results
      return (
        <div className="space-y-8">
          {Object.entries(results).map(([category, categoryResults]) => {
            if (categoryResults.length === 0) return null;

            return (
              <div
                key={category}
                className="bg-white dark:bg-gray-900 rounded-xl shadow-md overflow-hidden"
              >
                <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                  <h2 className="text-xl font-bold flex items-center">
                    {getCategoryIcon(category)}
                    <span className="ml-2 capitalize">{category}</span>
                    <span className="ml-2 text-sm font-normal text-gray-500 dark:text-gray-400">
                      ({categoryResults.length} results)
                    </span>
                  </h2>
                </div>
                <div>
                  {renderCategoryResults(category, categoryResults.slice(0, 3))}
                </div>
                {categoryResults.length > 3 && (
                  <div className="p-4 border-t border-gray-200 dark:border-gray-700 text-center">
                    <button
                      onClick={() => setActiveTab(category)}
                      className="text-primary hover:text-primary-dark"
                    >
                      View all {categoryResults.length} {category}
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      );
    }

    // Show specific tab content
    return renderCategoryResults(activeTab, results[activeTab]);
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case "transactions":
        return <FaExchangeAlt className="text-primary" />;
      case "blocks":
        return <FaCube className="text-primary" />;
      case "accounts":
        return <FaUser className="text-primary" />;
      case "tokens":
        return <FaCoins className="text-primary" />;
      case "nfts":
        return <FaGlobe className="text-primary" />;
      default:
        return <FaSearch className="text-primary" />;
    }
  };

  const renderCategoryResults = (category, categoryResults) => {
    switch (category) {
      case "transactions":
        return (
          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {categoryResults.map((tx) => (
              <div
                key={tx.hash}
                className="p-6 hover:bg-gray-50 dark:hover:bg-gray-800"
              >
                <div className="flex justify-between items-center mb-2">
                  <Link
                    to={`/transaction/${tx.hash}`}
                    className="text-primary hover:underline font-mono"
                  >
                    {shortenAddress(tx.hash, 10)}
                  </Link>
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${getStatusClass(
                      tx.status
                    )}`}
                  >
                    {tx.status}
                  </span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm mt-3">
                  <div>
                    <div className="text-gray-500 dark:text-gray-400 mb-1">
                      From
                    </div>
                    <Link
                      to={`/account/${tx.from}`}
                      className="text-primary hover:underline font-mono"
                    >
                      {shortenAddress(tx.from, 8)}
                    </Link>
                  </div>
                  <div>
                    <div className="text-gray-500 dark:text-gray-400 mb-1">
                      To
                    </div>
                    <Link
                      to={`/account/${tx.to}`}
                      className="text-primary hover:underline font-mono"
                    >
                      {shortenAddress(tx.to, 8)}
                    </Link>
                  </div>
                  <div>
                    <div className="text-gray-500 dark:text-gray-400 mb-1">
                      Value
                    </div>
                    <div>{formatCrypto(tx.value)}</div>
                  </div>
                </div>
                <div className="text-right text-xs text-gray-500 dark:text-gray-400 mt-2">
                  {timeAgo(tx.timestamp)}
                </div>
              </div>
            ))}
          </div>
        );

      case "blocks":
        return (
          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {categoryResults.map((block) => (
              <div
                key={block.hash}
                className="p-6 hover:bg-gray-50 dark:hover:bg-gray-800"
              >
                <div className="flex justify-between items-center mb-2">
                  <Link
                    to={`/block/${block.nonce}`}
                    className="text-primary hover:underline flex items-center"
                  >
                    <FaCube className="mr-2" />
                    Block #{block.nonce}
                  </Link>
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${getShardBadgeClass(
                      block.shard
                    )}`}
                  >
                    {block.shard === "metachain"
                      ? "Metachain"
                      : `Shard ${block.shard}`}
                  </span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm mt-3">
                  <div>
                    <div className="text-gray-500 dark:text-gray-400 mb-1">
                      Hash
                    </div>
                    <div className="font-mono text-truncate">
                      {shortenAddress(block.hash, 10)}
                    </div>
                  </div>
                  <div>
                    <div className="text-gray-500 dark:text-gray-400 mb-1">
                      Transactions
                    </div>
                    <div>{block.txCount}</div>
                  </div>
                  <div>
                    <div className="text-gray-500 dark:text-gray-400 mb-1">
                      Size
                    </div>
                    <div>{formatNumber(block.size)} bytes</div>
                  </div>
                </div>
                <div className="text-right text-xs text-gray-500 dark:text-gray-400 mt-2">
                  {timeAgo(block.timestamp)}
                </div>
              </div>
            ))}
          </div>
        );

      case "accounts":
        return (
          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {categoryResults.map((account) => (
              <div
                key={account.address}
                className="p-6 hover:bg-gray-50 dark:hover:bg-gray-800"
              >
                <div className="flex justify-between items-center mb-2">
                  <Link
                    to={`/account/${account.address}`}
                    className="text-primary hover:underline font-mono flex items-center"
                  >
                    <FaUser className="mr-2" />
                    {account.username
                      ? account.username
                      : shortenAddress(account.address, 10)}
                  </Link>
                  {account.isVerified && (
                    <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400">
                      Verified
                    </span>
                  )}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm mt-3">
                  <div>
                    <div className="text-gray-500 dark:text-gray-400 mb-1">
                      Address
                    </div>
                    <div className="font-mono text-truncate">
                      {shortenAddress(account.address, 10)}
                    </div>
                  </div>
                  <div>
                    <div className="text-gray-500 dark:text-gray-400 mb-1">
                      Balance
                    </div>
                    <div>{formatCrypto(account.balance)}</div>
                  </div>
                  <div>
                    <div className="text-gray-500 dark:text-gray-400 mb-1">
                      Transactions
                    </div>
                    <div>{formatNumber(account.transactions)}</div>
                  </div>
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                  Shard {account.shard}
                </div>
              </div>
            ))}
          </div>
        );

      case "tokens":
        return (
          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {categoryResults.map((token) => (
              <div
                key={token.identifier}
                className="p-6 hover:bg-gray-50 dark:hover:bg-gray-800"
              >
                <div className="flex justify-between items-center mb-2">
                  <Link
                    to={`/token/${token.identifier}`}
                    className="text-primary hover:underline flex items-center"
                  >
                    <div className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center mr-3">
                      <span className="font-bold text-xs">
                        {token.ticker.substring(0, 2)}
                      </span>
                    </div>
                    <div>
                      <div className="font-medium">{token.name}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        {token.ticker}
                      </div>
                    </div>
                  </Link>
                  <div className="text-xl font-semibold">
                    ${token.price.toFixed(token.price < 0.01 ? 6 : 2)}
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm mt-3">
                  <div>
                    <div className="text-gray-500 dark:text-gray-400 mb-1">
                      Market Cap
                    </div>
                    <div>${formatNumber(token.marketCap)}</div>
                  </div>
                  <div>
                    <div className="text-gray-500 dark:text-gray-400 mb-1">
                      Supply
                    </div>
                    <div>
                      {formatNumber(token.supply)} {token.ticker}
                    </div>
                  </div>
                  <div>
                    <div className="text-gray-500 dark:text-gray-400 mb-1">
                      Holders
                    </div>
                    <div>{formatNumber(token.holders)}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        );

      case "nfts":
        return (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
            {categoryResults.map((nft) => (
              <div
                key={nft.identifier}
                className="bg-gray-50 dark:bg-gray-800 rounded-lg overflow-hidden"
              >
                <div className="aspect-square overflow-hidden">
                  <img
                    src={nft.image}
                    alt={nft.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <Link
                    to={`/nft/${nft.identifier}`}
                    className="font-medium text-lg hover:text-primary"
                  >
                    {nft.name}
                  </Link>
                  <div className="grid grid-cols-2 gap-2 mt-3 text-sm">
                    <div>
                      <div className="text-gray-500 dark:text-gray-400">
                        Items
                      </div>
                      <div className="font-medium">
                        {formatNumber(nft.items)}
                      </div>
                    </div>
                    <div>
                      <div className="text-gray-500 dark:text-gray-400">
                        Floor
                      </div>
                      <div className="font-medium">{nft.floor} REWA</div>
                    </div>
                    <div>
                      <div className="text-gray-500 dark:text-gray-400">
                        Volume
                      </div>
                      <div className="font-medium">
                        {formatNumber(nft.volume)} REWA
                      </div>
                    </div>
                    <div>
                      <div className="text-gray-500 dark:text-gray-400">
                        Holders
                      </div>
                      <div className="font-medium">
                        {formatNumber(nft.holders)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        );

      default:
        return <div className="p-6">No results found for this category</div>;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <h1 className="text-3xl font-bold mb-6 flex items-center">
        <FaSearch className="mr-2 text-primary" />
        Search Results
      </h1>

      {/* Search form */}
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-md p-6 mb-8">
        <form
          onSubmit={handleNewSearch}
          className="flex flex-col sm:flex-row gap-4"
        >
          <div className="flex-grow relative">
            <input
              type="text"
              className="w-full py-3 pl-10 pr-4 rounded-lg bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="Search by Address / Block / Transaction Hash / Token / NFT"
              value={newSearchQuery}
              onChange={(e) => setNewSearchQuery(e.target.value)}
            />
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400" />
          </div>
          <button
            type="submit"
            className="px-6 py-3 bg-primary text-white font-medium rounded-lg hover:bg-primary-hover transition-colors"
          >
            Search
          </button>
        </form>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-16">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      ) : error ? (
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-md p-8 text-center">
          <FaSadTear className="mx-auto text-4xl text-gray-400 mb-4" />
          <p className="text-xl font-medium text-gray-700 dark:text-gray-300 mb-2">
            {error}
          </p>
          <p className="text-gray-500 dark:text-gray-400 mb-6">
            Try a different search term or check if your input is correct.
          </p>
          <div className="text-gray-600 dark:text-gray-400 text-sm max-w-lg mx-auto">
            <p className="mb-2">You can search for:</p>
            <ul className="list-disc list-inside text-left space-y-1">
              <li>
                Transaction hashes (like
                "a8d53c8d67c168a65a4fecd2d6cdb8c12deac0...")
              </li>
              <li>Account addresses (like "erd1qyu5wth...")</li>
              <li>Block numbers (like "18436782")</li>
              <li>Token tickers or names (like "REWA" or "Dharitri")</li>
              <li>NFT collections</li>
            </ul>
          </div>
        </div>
      ) : (
        <>
          {/* Results summary */}
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-md overflow-hidden mb-8">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <p className="text-lg">
                <span className="font-medium">{totalResults}</span> results for
                <span className="font-medium ml-1">"{searchQuery}"</span>
              </p>
            </div>

            {/* Tabs */}
            <div className="px-6 border-b border-gray-200 dark:border-gray-700 overflow-x-auto scrollbar-hide">
              <div className="flex space-x-4">
                <button
                  onClick={() => setActiveTab("all")}
                  className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors whitespace-nowrap ${
                    activeTab === "all"
                      ? "border-primary text-primary"
                      : "border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                  }`}
                >
                  All Results
                </button>

                {["transactions", "blocks", "accounts", "tokens", "nfts"].map(
                  (tab) =>
                    hasResults(tab) && (
                      <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center transition-colors whitespace-nowrap ${
                          activeTab === tab
                            ? "border-primary text-primary"
                            : "border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                        }`}
                      >
                        {getCategoryIcon(tab)}
                        <span className="ml-2 capitalize">{tab}</span>
                        <span className="ml-1 text-xs text-gray-500 dark:text-gray-400">
                          ({results[tab].length})
                        </span>
                      </button>
                    )
                )}
              </div>
            </div>

            {/* Results content */}
            {getActiveTabContent()}
          </div>
        </>
      )}
    </div>
  );
};

export default SearchResults;
