import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FaCubes,
  FaCube,
  FaClock,
  FaExchangeAlt,
  FaServer,
  FaSort,
  FaSortUp,
  FaSortDown,
  FaAngleLeft,
  FaAngleRight,
  FaInfoCircle,
} from "react-icons/fa";
import { formatNumber, formatDate, timeAgo } from "../../utils/formatters";

const Blocks = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [blocks, setBlocks] = useState([]);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sortField, setSortField] = useState("nonce");
  const [sortDirection, setSortDirection] = useState("desc");
  const [shardFilter, setShardFilter] = useState("all");

  // Mock data for blocks
  const mockBlocks = Array.from({ length: 100 }).map((_, index) => {
    // Calculate a timestamp that gets older as the index increases
    const currentTime = new Date().getTime();
    const blockTime = new Date(currentTime - index * 60000 * 3); // Each block is ~3 minutes apart

    // Randomize shard number (0, 1, 2, or metachain)
    const shardOptions = [0, 1, 2, "metachain"];
    const shard = shardOptions[Math.floor(Math.random() * shardOptions.length)];

    return {
      hash: `${index}_${Math.random().toString(36).substring(2, 15)}`,
      nonce: 18436782 - index,
      timestamp: blockTime.getTime(),
      shard,
      txCount: Math.floor(Math.random() * 50),
      size: Math.floor(Math.random() * 200000) + 50000,
      gasConsumed: Math.floor(Math.random() * 5000000) + 1000000,
      proposer: `erd1${Math.random()
        .toString(36)
        .substring(2, 15)}${Math.random().toString(36).substring(2, 15)}`,
      round: 18436789 - index,
      epoch: Math.floor((18436782 - index) / 14400),
    };
  });

  const blockPerPage = 25;

  useEffect(() => {
    const fetchBlocks = async () => {
      setIsLoading(true);
      setError(null);
      try {
        // In a real app, we'd fetch from an API
        // const response = await apiService.getBlocks({
        //   page: currentPage,
        //   itemsPerPage: blockPerPage,
        //   sort: sortField,
        //   order: sortDirection,
        //   shard: shardFilter !== 'all' ? shardFilter : undefined
        // });

        // Using mock data for now
        setTimeout(() => {
          // Filter by shard if needed
          let filteredBlocks = [...mockBlocks];
          if (shardFilter !== "all") {
            filteredBlocks = filteredBlocks.filter((block) => {
              if (shardFilter === "metachain" && block.shard === "metachain")
                return true;
              return block.shard === parseInt(shardFilter);
            });
          }

          // Sort the blocks
          filteredBlocks.sort((a, b) => {
            let comparison = 0;

            switch (sortField) {
              case "nonce":
                comparison = a.nonce - b.nonce;
                break;
              case "timestamp":
                comparison = a.timestamp - b.timestamp;
                break;
              case "txCount":
                comparison = a.txCount - b.txCount;
                break;
              case "size":
                comparison = a.size - b.size;
                break;
              default:
                comparison = a.nonce - b.nonce;
            }

            return sortDirection === "asc" ? comparison : -comparison;
          });

          // Calculate total pages
          const totalItems = filteredBlocks.length;
          const calculatedTotalPages = Math.ceil(totalItems / blockPerPage);
          setTotalPages(calculatedTotalPages);

          // Paginate the blocks
          const startIndex = (currentPage - 1) * blockPerPage;
          const paginatedBlocks = filteredBlocks.slice(
            startIndex,
            startIndex + blockPerPage
          );

          setBlocks(paginatedBlocks);
          setIsLoading(false);
        }, 800);
      } catch (err) {
        setError("Failed to fetch blocks");
        console.error(err);
        setIsLoading(false);
      }
    };

    fetchBlocks();
  }, [currentPage, sortField, sortDirection, shardFilter]);

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("desc");
    }
    setCurrentPage(1);
  };

  const renderSortIcon = (field) => {
    if (sortField !== field) return <FaSort className="text-gray-400" />;
    return sortDirection === "asc" ? <FaSortUp /> : <FaSortDown />;
  };

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    window.scrollTo(0, 0);
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

  // Generate pagination items
  const getPaginationItems = () => {
    const items = [];

    const maxPagesDisplay = 7;
    const halfMaxPages = Math.floor(maxPagesDisplay / 2);

    let startPage, endPage;

    if (totalPages <= maxPagesDisplay) {
      // Show all pages if total pages less than max display
      startPage = 1;
      endPage = totalPages;
    } else if (currentPage <= halfMaxPages + 1) {
      // We're at the start
      startPage = 1;
      endPage = maxPagesDisplay - 1;
      items.push(
        <div key="last" className="px-3 py-1">
          ...
        </div>,
        <button
          key={totalPages}
          className="px-3 py-1 rounded-md bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
          onClick={() => handlePageChange(totalPages)}
        >
          {totalPages}
        </button>
      );
    } else if (currentPage >= totalPages - halfMaxPages) {
      // We're at the end
      startPage = totalPages - maxPagesDisplay + 2;
      endPage = totalPages;
      items.push(
        <button
          key={1}
          className="px-3 py-1 rounded-md bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
          onClick={() => handlePageChange(1)}
        >
          1
        </button>,
        <div key="first" className="px-3 py-1">
          ...
        </div>
      );
    } else {
      // We're in the middle
      startPage = currentPage - halfMaxPages + 1;
      endPage = currentPage + halfMaxPages - 1;
      items.push(
        <button
          key={1}
          className="px-3 py-1 rounded-md bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
          onClick={() => handlePageChange(1)}
        >
          1
        </button>,
        <div key="first" className="px-3 py-1">
          ...
        </div>
      );

      if (endPage < totalPages) {
        items.push(
          <div key="last" className="px-3 py-1">
            ...
          </div>,
          <button
            key={totalPages}
            className="px-3 py-1 rounded-md bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
            onClick={() => handlePageChange(totalPages)}
          >
            {totalPages}
          </button>
        );
      }
    }

    // Add the numbered pages
    for (let page = startPage; page <= endPage; page++) {
      items.splice(
        page - startPage,
        0,
        <button
          key={page}
          className={`px-3 py-1 rounded-md ${
            currentPage === page
              ? "bg-primary text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
          }`}
          onClick={() => handlePageChange(page)}
        >
          {page}
        </button>
      );
    }

    return items;
  };

  if (isLoading && blocks.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400 p-4 rounded-lg">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <h1 className="text-3xl font-bold flex items-center mb-4 sm:mb-0">
          <FaCubes className="mr-2 text-primary" />
          Blocks
        </h1>

        <div className="flex flex-wrap gap-2">
          <select
            value={shardFilter}
            onChange={(e) => {
              setShardFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
          >
            <option value="all">All Shards</option>
            <option value="0">Shard 0</option>
            <option value="1">Shard 1</option>
            <option value="2">Shard 2</option>
            <option value="metachain">Metachain</option>
          </select>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-md overflow-hidden mb-8">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-800">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort("nonce")}
                >
                  <div className="flex items-center">
                    <span>Block</span>
                    <span className="ml-1">{renderSortIcon("nonce")}</span>
                  </div>
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort("timestamp")}
                >
                  <div className="flex items-center">
                    <span>Age</span>
                    <span className="ml-1">{renderSortIcon("timestamp")}</span>
                  </div>
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                >
                  Shard
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort("txCount")}
                >
                  <div className="flex items-center">
                    <span>Txns</span>
                    <span className="ml-1">{renderSortIcon("txCount")}</span>
                  </div>
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort("size")}
                >
                  <div className="flex items-center">
                    <span>Size</span>
                    <span className="ml-1">{renderSortIcon("size")}</span>
                  </div>
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                >
                  Proposer
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-800">
              {blocks.map((block) => (
                <tr
                  key={block.hash}
                  className="hover:bg-gray-50 dark:hover:bg-gray-800"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Link
                      to={`/block/${block.nonce}`}
                      className="flex items-center text-primary hover:underline"
                    >
                      <FaCube className="mr-2" />
                      {block.nonce}
                    </Link>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <FaClock className="mr-2 text-gray-500" />
                      <span title={formatDate(block.timestamp, true)}>
                        {timeAgo(block.timestamp)}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${getShardBadgeClass(
                        block.shard
                      )}`}
                    >
                      {block.shard === "metachain"
                        ? "Metachain"
                        : `Shard ${block.shard}`}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <FaExchangeAlt className="mr-2 text-gray-500" />
                      {block.txCount}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {formatNumber(block.size)} bytes
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Link
                      to={`/account/${block.proposer}`}
                      className="flex items-center text-primary hover:underline"
                    >
                      <FaServer className="mr-2" />
                      <span className="font-mono">
                        {block.proposer.substring(0, 6)}...
                        {block.proposer.substring(block.proposer.length - 4)}
                      </span>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-6">
          <nav className="flex items-center space-x-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`flex items-center px-3 py-1 rounded-md ${
                currentPage === 1
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed dark:bg-gray-800"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
              }`}
            >
              <FaAngleLeft className="mr-1" /> Previous
            </button>

            <div className="flex items-center space-x-1">
              {getPaginationItems()}
            </div>

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`flex items-center px-3 py-1 rounded-md ${
                currentPage === totalPages
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed dark:bg-gray-800"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
              }`}
            >
              Next <FaAngleRight className="ml-1" />
            </button>
          </nav>
        </div>
      )}

      {/* Information Card */}
      <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 mt-8">
        <div className="flex items-center mb-4">
          <FaInfoCircle className="text-primary mr-2" />
          <h2 className="text-lg font-semibold">About Blocks</h2>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
          Blocks are the core component of the Dharitri blockchain. Each block
          contains a set of transactions that have been validated and added to
          the network. The Dharitri blockchain uses a sharded architecture, with
          multiple shards processing transactions in parallel for higher
          throughput.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-md font-medium mb-2">Block Creation</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              In Dharitri, blocks are proposed by validators who have been
              selected based on their stake and rating. Once a block is
              proposed, it needs to be validated by other validators in the
              network. This consensus mechanism ensures the integrity and
              security of the blockchain.
            </p>
          </div>
          <div>
            <h3 className="text-md font-medium mb-2">Sharding Architecture</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Dharitri's sharding technology divides the blockchain into smaller
              partitions called shards. This architecture allows Dharitri to
              achieve high throughput (transactions per second) while
              maintaining security and decentralization. Each shard processes
              its own set of transactions in parallel with other shards.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blocks;
