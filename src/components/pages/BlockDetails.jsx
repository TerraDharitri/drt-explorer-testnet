import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  FaChevronLeft,
  FaChevronRight,
  FaCube,
  FaArrowLeft,
  FaRegCopy,
  FaExchangeAlt,
  FaInfoCircle,
  FaCheck,
} from "react-icons/fa";
import apiService from "../../utils/api";
import {
  formatNumber,
  formatDate,
  timeAgo,
  shortenAddress,
} from "../../utils/formatters";
import Card from "../common/Card";
import Table from "../common/Table";
import HashLink from "../common/HashLink";
import CopyButton from "../common/CopyButton";
import Loading from "../common/Loading";

const BlockDetails = () => {
  const { blockId } = useParams();
  const navigate = useNavigate();
  const [blockData, setBlockData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [copySuccess, setCopySuccess] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [txPerPage] = useState(10);

  useEffect(() => {
    const fetchBlockDetails = async () => {
      setIsLoading(true);
      setError(null);
      try {
        // In a real app, we'd fetch from an API
        // const response = await apiService.getBlockDetails(blockId);

        // Using mock data for now
        setTimeout(() => {
          // Create a mock block based on the provided blockId
          setBlockData({
            hash: "c8e12cfbd10ecadf8b7a9eef670e84f66a95a8efe0f7a88307b31d76191893ef",
            nonce: parseInt(blockId),
            prevBlockHash:
              "b9f85a3f986dbc7bd7e9afd91c030c59682c44242aac0a6b4cf63ce52eccd5d3",
            timestamp: new Date().getTime() - 1000 * 60 * 15, // 15 minutes ago
            round: 18436789,
            epoch: 812,
            shard: 0,
            proposer:
              "erd1qqqqqqqqqqqqqpgqp699jngundfqw07d8jzkepucvpzush6k3wvqyc44rx",
            validators: 400,
            size: 82451,
            gasConsumed: 55732642,
            gasRefunded: 2142860,
            txCount: 32,
            miniBlocks: 4,
            stateRootHash:
              "40b7c1d3c6a9b5c2e3d1f0a8b7c6d5e4f3a2b1c0d9e8f7a6b5c4d3e2f1a0b9c8",
            transactions: Array.from({ length: 32 }).map((_, index) => ({
              hash: `tx${index}_${Math.random().toString(36).substring(2, 15)}`,
              from:
                index % 3 === 0
                  ? "erd1qyu5wthldzr8wx5c9ucg8kjagg0jfs53s8nr3zpz3hypefsdd8ssycr6th"
                  : `erd1${Math.random()
                      .toString(36)
                      .substring(2, 15)}${Math.random()
                      .toString(36)
                      .substring(2, 15)}`,
              to:
                index % 4 === 0
                  ? "erd1qqqqqqqqqqqqqpgqp699jngundfqw07d8jzkepucvpzush6k3wvqyc44rx"
                  : `erd1${Math.random()
                      .toString(36)
                      .substring(2, 15)}${Math.random()
                      .toString(36)
                      .substring(2, 15)}`,
              value: Math.floor(Math.random() * 1000000000000000000).toString(),
              fee: Math.floor(Math.random() * 10000000000000).toString(),
              status: Math.random() > 0.2 ? "success" : "failed",
              timestamp:
                new Date().getTime() -
                1000 * 60 * 15 -
                Math.floor(Math.random() * 100) * 1000,
            })),
          });
          setIsLoading(false);
        }, 800);
      } catch (err) {
        setError("Failed to fetch block details");
        console.error(err);
        setIsLoading(false);
      }
    };

    fetchBlockDetails();
  }, [blockId]);

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };

  const getTransactionStatusClass = (status) => {
    switch (status) {
      case "success":
        return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400";
      case "failed":
        return "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400";
      case "pending":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200";
    }
  };

  // Pagination logic
  const indexOfLastTx = currentPage * txPerPage;
  const indexOfFirstTx = indexOfLastTx - txPerPage;
  const currentTxs =
    blockData?.transactions.slice(indexOfFirstTx, indexOfLastTx) || [];

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const pageNumbers = [];
  if (blockData) {
    for (
      let i = 1;
      i <= Math.ceil(blockData.transactions.length / txPerPage);
      i++
    ) {
      pageNumbers.push(i);
    }
  }

  const handlePreviousBlock = () => {
    if (blockData && blockData.nonce > 1) {
      navigate(`/block/${blockData.nonce - 1}`);
    }
  };

  const handleNextBlock = () => {
    if (blockData) {
      navigate(`/block/${blockData.nonce + 1}`);
    }
  };

  const transactionColumns = [
    {
      header: "Hash",
      accessor: "hash",
      cell: (row) => <HashLink hash={row.hash} type="tx" length="short" />,
    },
    {
      header: "From",
      accessor: "from",
      cell: (row) => <HashLink hash={row.from} type="account" length="short" />,
    },
    {
      header: "To",
      accessor: "to",
      cell: (row) => <HashLink hash={row.to} type="account" length="short" />,
    },
    {
      header: "Value",
      accessor: "value",
      cell: (row) => `${formatNumber(row.value, 4)} DRT`,
    },
  ];

  if (isLoading) {
    return (
      <div className="container-custom py-16">
        <Loading className="my-16" size="lg" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container-custom py-16">
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

  if (!blockData) {
    return (
      <div className="container-custom py-16">
        <div className="text-center">
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Block not found
          </p>
          <Link to="/blocks" className="mt-4 btn-primary inline-block">
            View All Blocks
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container-custom py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Block Details</h1>

        <div className="flex space-x-2">
          <button
            onClick={handlePreviousBlock}
            disabled={blockData.nonce <= 1}
            className="p-2 rounded-md border border-gray-300 dark:border-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
            title="Previous Block"
          >
            <FaChevronLeft className="text-gray-600 dark:text-gray-400" />
          </button>
          <button
            onClick={handleNextBlock}
            className="p-2 rounded-md border border-gray-300 dark:border-gray-600"
            title="Next Block"
          >
            <FaChevronRight className="text-gray-600 dark:text-gray-400" />
          </button>
        </div>
      </div>

      <Card className="mb-8">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <div className="bg-primary bg-opacity-10 p-3 rounded-full mr-4">
              <FaCube className="text-primary h-6 w-6" />
            </div>
            <div>
              <h2 className="text-xl font-semibold">
                Block #{formatNumber(blockData.nonce, 0)}
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {formatDate(blockData.timestamp)} (
                {timeAgo(blockData.timestamp)})
              </p>
            </div>
          </div>
        </div>

        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          <div className="grid grid-cols-1 md:grid-cols-3 py-4 px-6">
            <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Block Hash
            </div>
            <div className="md:col-span-2 mt-1 md:mt-0 flex items-center">
              <span className="font-mono text-sm text-gray-900 dark:text-gray-200 break-all">
                {blockData.hash}
              </span>
              <button
                onClick={() => copyToClipboard(blockData.hash)}
                className="ml-2 text-primary hover:text-primary-dark transition-colors"
                title="Copy to clipboard"
              >
                {copySuccess ? <FaCheck /> : <FaRegCopy />}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 py-4 px-6">
            <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Timestamp
            </div>
            <div className="md:col-span-2 text-sm text-gray-900 dark:text-gray-200 mt-1 md:mt-0">
              {formatDate(blockData.timestamp)} ({timeAgo(blockData.timestamp)})
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 py-4 px-6">
            <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Transactions
            </div>
            <div className="md:col-span-2 text-sm text-gray-900 dark:text-gray-200 mt-1 md:mt-0">
              {formatNumber(blockData.txCount, 0)}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 py-4 px-6">
            <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Size
            </div>
            <div className="md:col-span-2 text-sm text-gray-900 dark:text-gray-200 mt-1 md:mt-0">
              {formatNumber(blockData.size, 0)} bytes
            </div>
          </div>

          {blockData.proposer && (
            <div className="grid grid-cols-1 md:grid-cols-3 py-4 px-6">
              <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Proposer
              </div>
              <div className="md:col-span-2 mt-1 md:mt-0">
                <HashLink
                  hash={blockData.proposer}
                  type="account"
                  length="medium"
                />
              </div>
            </div>
          )}

          {blockData.shard !== undefined && (
            <div className="grid grid-cols-1 md:grid-cols-3 py-4 px-6">
              <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Shard
              </div>
              <div className="md:col-span-2 text-sm text-gray-900 dark:text-gray-200 mt-1 md:mt-0">
                {blockData.shard}
              </div>
            </div>
          )}
        </div>
      </Card>

      {blockData.transactions.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Transactions</h2>
          <Card>
            <Table
              columns={transactionColumns}
              data={currentTxs}
              emptyMessage="No transactions in this block"
            />
          </Card>
        </div>
      )}

      {/* Pagination */}
      {pageNumbers.length > 1 && (
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

            {pageNumbers.map((number) => (
              <button
                key={number}
                onClick={() => paginate(number)}
                className={`px-3 py-1 rounded-md ${
                  currentPage === number
                    ? "bg-primary text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                }`}
              >
                {number}
              </button>
            ))}

            <button
              onClick={() =>
                paginate(
                  currentPage < pageNumbers.length
                    ? currentPage + 1
                    : pageNumbers.length
                )
              }
              disabled={currentPage === pageNumbers.length}
              className={`px-3 py-1 rounded-md ${
                currentPage === pageNumbers.length
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
          Blocks are batches of transactions confirmed and stored on the
          blockchain. Each block contains a reference to the previous block,
          creating a chain of blocks (hence, blockchain). The Dharitri
          blockchain uses a sharded architecture with multiple shard chains
          processing transactions in parallel for high scalability.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-md font-medium mb-2">Key Block Components</h3>
            <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-400 space-y-1">
              <li>
                <span className="font-medium">Hash</span>: A unique identifier
                for the block
              </li>
              <li>
                <span className="font-medium">Nonce</span>: Block number in the
                blockchain
              </li>
              <li>
                <span className="font-medium">Timestamp</span>: When the block
                was created
              </li>
              <li>
                <span className="font-medium">Proposer</span>: Validator that
                proposed the block
              </li>
              <li>
                <span className="font-medium">State Root</span>: Hash
                representing the state of the blockchain
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-md font-medium mb-2">Dharitri Sharding</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Dharitri uses three types of shards: regular shards (0, 1, 2...)
              for processing transactions, a Metachain for notarizing and
              finalizing results, and a special public service shard. The
              sharding model enables the network to process thousands of
              transactions per second with low latency.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlockDetails;
