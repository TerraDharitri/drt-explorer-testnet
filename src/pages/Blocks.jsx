import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FaCube,
  FaChevronDown,
  FaChevronUp,
  FaSearch,
  FaInfoCircle,
} from "react-icons/fa";
import {
  formatNumber,
  formatDate,
  timeAgo,
  shortenAddress,
} from "../utils/formatters";

const Blocks = () => {
  const [blocks, setBlocks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortConfig, setSortConfig] = useState({
    key: "nonce",
    direction: "desc",
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [blocksPerPage] = useState(15);
  const [stats, setStats] = useState({
    totalBlocks: 0,
    averageBlockTime: 0,
    averageBlockSize: 0,
    totalTransactions: 0,
  });

  // Get mock data for blocks
  useEffect(() => {
    const fetchBlocks = async () => {
      setIsLoading(true);
      setError(null);
      try {
        // In a real app, we'd fetch from an API
        // const response = await apiService.getBlocks();

        // Mock data
        setTimeout(() => {
          const mockBlocks = Array.from({ length: 100 }).map((_, index) => {
            const timestamp = new Date().getTime() - index * 6000;
            const shard = Math.floor(Math.random() * 3);
            const txCount = Math.floor(Math.random() * 50);

            return {
              nonce: 8547690 - index,
              hash: `${Math.random()
                .toString(36)
                .substring(2, 15)}${Math.random()
                .toString(36)
                .substring(2, 15)}`,
              timestamp,
              shard,
              txCount,
              size: Math.floor(50000 + Math.random() * 150000),
              gasConsumed: Math.floor(5000000 + Math.random() * 15000000),
              proposer: `erd1${Math.random()
                .toString(36)
                .substring(2, 15)}${Math.random()
                .toString(36)
                .substring(2, 15)}`,
            };
          });

          // Calculate statistics
          const totalTx = mockBlocks.reduce(
            (sum, block) => sum + block.txCount,
            0
          );
          const avgBlockSize =
            mockBlocks.reduce((sum, block) => sum + block.size, 0) /
            mockBlocks.length;
          const avgBlockTime = 6; // seconds between blocks

          setStats({
            totalBlocks: 8547690,
            averageBlockTime: avgBlockTime,
            averageBlockSize: avgBlockSize,
            totalTransactions: totalTx,
          });

          setBlocks(mockBlocks);
          setIsLoading(false);
        }, 800);
      } catch (err) {
        setError("Failed to fetch blocks");
        console.error(err);
        setIsLoading(false);
      }
    };

    fetchBlocks();
  }, []);

  // Sorting Logic
  const sortedBlocks = React.useMemo(() => {
    let sortableBlocks = [...blocks];
    if (sortConfig !== null) {
      sortableBlocks.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "asc" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "asc" ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableBlocks;
  }, [blocks, sortConfig]);

  // Filtering Logic
  const filteredBlocks = React.useMemo(() => {
    if (!searchTerm) return sortedBlocks;

    const term = searchTerm.toLowerCase();
    return sortedBlocks.filter(
      (block) =>
        block.hash.toLowerCase().includes(term) ||
        block.nonce.toString().includes(term) ||
        block.proposer.toLowerCase().includes(term) ||
        block.shard.toString() === term
    );
  }, [sortedBlocks, searchTerm]);

  // Pagination Logic
  const indexOfLastBlock = currentPage * blocksPerPage;
  const indexOfFirstBlock = indexOfLastBlock - blocksPerPage;
  const currentBlocks = filteredBlocks.slice(
    indexOfFirstBlock,
    indexOfLastBlock
  );
  const totalPages = Math.ceil(filteredBlocks.length / blocksPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const requestSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const renderSortIcon = (columnName) => {
    if (sortConfig.key === columnName) {
      return sortConfig.direction === "asc" ? (
        <FaChevronUp className="inline-block ml-1" />
      ) : (
        <FaChevronDown className="inline-block ml-1" />
      );
    }
    return <FaChevronDown className="inline-block ml-1 opacity-30" />;
  };

  const getShardClass = (shard) => {
    const colors = ["blue", "green", "purple"];
    return `bg-${colors[shard]}-100 text-${colors[shard]}-800 dark:bg-${colors[shard]}-900/20 dark:text-${colors[shard]}-400`;
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to first page when searching
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

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center text-red-500">
          <p>{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 btn-primary"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Blocks</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-md p-4">
          <p className="text-gray-500 dark:text-gray-400 text-sm mb-1">
            Total Blocks
          </p>
          <p className="text-2xl font-semibold">
            {formatNumber(stats.totalBlocks, 0)}
          </p>
        </div>
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-md p-4">
          <p className="text-gray-500 dark:text-gray-400 text-sm mb-1">
            Average Block Time
          </p>
          <p className="text-2xl font-semibold">{stats.averageBlockTime} sec</p>
        </div>
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-md p-4">
          <p className="text-gray-500 dark:text-gray-400 text-sm mb-1">
            Average Block Size
          </p>
          <p className="text-2xl font-semibold">
            {formatNumber(stats.averageBlockSize, 0)} bytes
          </p>
        </div>
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-md p-4">
          <p className="text-gray-500 dark:text-gray-400 text-sm mb-1">
            Total Transactions
          </p>
          <p className="text-2xl font-semibold">
            {formatNumber(stats.totalTransactions, 0)}
          </p>
        </div>
      </div>

      {/* Search */}
      <div className="flex justify-between items-center mb-6">
        <div className="relative w-full sm:w-64 md:w-96">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FaSearch className="text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search by block hash, nonce, proposer..."
            value={searchTerm}
            onChange={handleSearch}
            className="pl-10 pr-4 py-2 w-full rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>
      </div>

      {/* Blocks Table */}
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-md overflow-hidden mb-8">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-800">
              <tr>
                <th
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer"
                  onClick={() => requestSort("nonce")}
                >
                  Block {renderSortIcon("nonce")}
                </th>
                <th
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer"
                  onClick={() => requestSort("hash")}
                >
                  Hash {renderSortIcon("hash")}
                </th>
                <th
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer"
                  onClick={() => requestSort("shard")}
                >
                  Shard {renderSortIcon("shard")}
                </th>
                <th
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer"
                  onClick={() => requestSort("timestamp")}
                >
                  Age {renderSortIcon("timestamp")}
                </th>
                <th
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer"
                  onClick={() => requestSort("txCount")}
                >
                  Transactions {renderSortIcon("txCount")}
                </th>
                <th
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer"
                  onClick={() => requestSort("size")}
                >
                  Size {renderSortIcon("size")}
                </th>
                <th
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer"
                  onClick={() => requestSort("gasConsumed")}
                >
                  Gas Used {renderSortIcon("gasConsumed")}
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
              {currentBlocks.length === 0 ? (
                <tr>
                  <td
                    colSpan="7"
                    className="px-6 py-4 text-center text-sm text-gray-500 dark:text-gray-400"
                  >
                    No blocks found matching your criteria
                  </td>
                </tr>
              ) : (
                currentBlocks.map((block, index) => (
                  <tr
                    key={index}
                    className="hover:bg-gray-50 dark:hover:bg-gray-800"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="bg-primary bg-opacity-10 p-2 rounded-full mr-3">
                          <FaCube className="text-primary h-4 w-4" />
                        </div>
                        <Link
                          to={`/block/${block.nonce}`}
                          className="text-primary hover:underline"
                        >
                          {formatNumber(block.nonce, 0)}
                        </Link>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap font-mono text-sm">
                      <Link
                        to={`/block/${block.nonce}`}
                        className="text-primary hover:underline"
                      >
                        {shortenAddress(block.hash, 10)}
                      </Link>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400`}
                      >
                        {block.shard}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {timeAgo(block.timestamp)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {formatNumber(block.txCount, 0)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {formatNumber(block.size, 0)} bytes
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {formatNumber(block.gasConsumed, 0)}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-6">
          <nav className="flex items-center space-x-2">
            <button
              onClick={() => paginate(currentPage > 1 ? currentPage - 1 : 1)}
              disabled={currentPage === 1}
              className={`px-3 py-1 rounded-md ${
                currentPage === 1
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed dark:bg-gray-800"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
              }`}
            >
              Previous
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1)
              .filter(
                (page) =>
                  page === 1 ||
                  page === totalPages ||
                  (page >= currentPage - 1 && page <= currentPage + 1)
              )
              .map((page, index, array) => {
                // Show ellipsis between non-consecutive pages
                if (index > 0 && array[index - 1] !== page - 1) {
                  return (
                    <React.Fragment key={`ellipsis-${page}`}>
                      <span className="px-3 py-1">...</span>
                      <button
                        onClick={() => paginate(page)}
                        className={`px-3 py-1 rounded-md ${
                          currentPage === page
                            ? "bg-primary text-white"
                            : "bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                        }`}
                      >
                        {page}
                      </button>
                    </React.Fragment>
                  );
                }
                return (
                  <button
                    key={page}
                    onClick={() => paginate(page)}
                    className={`px-3 py-1 rounded-md ${
                      currentPage === page
                        ? "bg-primary text-white"
                        : "bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                    }`}
                  >
                    {page}
                  </button>
                );
              })}

            <button
              onClick={() =>
                paginate(
                  currentPage < totalPages ? currentPage + 1 : totalPages
                )
              }
              disabled={currentPage === totalPages}
              className={`px-3 py-1 rounded-md ${
                currentPage === totalPages
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed dark:bg-gray-800"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
              }`}
            >
              Next
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
          Blocks are batches of transactions with a hash of the previous block
          in the chain. This forms a chronological sequence of connected blocks,
          creating a chain of blocks (hence, blockchain). The Dharitri
          blockchain uses adaptive state sharding for high scalability.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-md font-medium mb-2">Block Creation</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              In Dharitri, blocks are created approximately every 6 seconds.
              Validators take turns proposing new blocks, which must be
              validated by other validators in the network before being added to
              the blockchain.
            </p>
          </div>
          <div>
            <h3 className="text-md font-medium mb-2">Block Structure</h3>
            <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-400 space-y-1">
              <li>Block hash: unique identifier</li>
              <li>Nonce: block height in the chain</li>
              <li>Timestamp: when the block was created</li>
              <li>Transactions: list of transactions in the block</li>
              <li>Validator: node that proposed the block</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blocks;
