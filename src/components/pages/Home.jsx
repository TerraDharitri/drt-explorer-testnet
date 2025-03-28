import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FaChartLine,
  FaCubes,
  FaExchangeAlt,
  FaUsers,
  FaSearch,
} from "react-icons/fa";
import apiService from "../../utils/api";
import {
  formatAddress,
  formatTimestamp,
  formatRelativeTime,
  formatTokenAmount,
  formatNumber,
  formatCurrency,
  timeAgo,
} from "../../utils/formatters";
import StatCard from "../common/StatCard";
import Card from "../common/Card";
import HashLink from "../common/HashLink";
import TimeAgo from "../common/TimeAgo";
import Loading from "../common/Loading";
import Table from "../common/Table";

const Home = () => {
  const [stats, setStats] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [blocks, setBlocks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        // Fetch blockchain statistics
        const statsResponse = await apiService.getStats();
        setStats(statsResponse.data);

        // Fetch recent transactions
        const txResponse = await apiService.getTransactions(1, 5);
        setTransactions(txResponse.data.transactions);

        // Fetch recent blocks
        const blocksResponse = await apiService.getBlocks(1, 5);
        setBlocks(blocksResponse.data.blocks);
      } catch (err) {
        setError("Failed to fetch blockchain data");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Transaction table columns
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
      cell: (row) => formatCurrency(row.value),
    },
    {
      header: "Time",
      accessor: "timestamp",
      cell: (row) => <TimeAgo timestamp={row.timestamp} />,
    },
  ];

  // Block table columns
  const blockColumns = [
    {
      header: "Block",
      accessor: "nonce",
      cell: (row) => (
        <Link
          to={`/block/${row.hash}`}
          className="text-primary hover:underline"
        >
          {row.nonce}
        </Link>
      ),
    },
    {
      header: "Hash",
      accessor: "hash",
      cell: (row) => <HashLink hash={row.hash} type="block" length="short" />,
    },
    {
      header: "Size",
      accessor: "size",
      cell: (row) => `${formatNumber(row.size)} bytes`,
    },
    {
      header: "Txns",
      accessor: "txCount",
      cell: (row) => formatNumber(row.txCount, 0),
    },
    {
      header: "Time",
      accessor: "timestamp",
      cell: (row) => <TimeAgo timestamp={row.timestamp} />,
    },
  ];

  if (loading) {
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

  return (
    <div className="container-custom py-8">
      {/* Hero section */}
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">
          Dharitri Explorer
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-3xl mx-auto">
          Explore blocks, transactions, accounts and more on the Dharitri
          blockchain
        </p>

        <div className="max-w-2xl mx-auto">
          <form className="relative">
            <input
              type="text"
              placeholder="Search by Address / Txn Hash / Block"
              className="w-full py-3 pl-5 pr-12 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <button
              type="submit"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400 hover:text-primary"
            >
              <FaSearch size={20} />
            </button>
          </form>
        </div>
      </div>

      {/* Stats section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <StatCard
          title="Price"
          value={formatCurrency(stats?.price, "USD")}
          icon={FaChartLine}
          change="+5.2% (24h)"
          changeType="positive"
        />
        <StatCard
          title="Blocks"
          value={formatNumber(stats?.blocks, 0)}
          icon={FaCubes}
        />
        <StatCard
          title="Transactions"
          value={formatNumber(stats?.transactions, 0)}
          icon={FaExchangeAlt}
        />
        <StatCard
          title="Validators"
          value={formatNumber(stats?.validators, 0)}
          icon={FaUsers}
        />
      </div>

      {/* Latest transactions */}
      <div className="mb-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="section-title">Latest Transactions</h2>
          <Link to="/transactions" className="text-primary hover:underline">
            View all transactions
          </Link>
        </div>

        <Card>
          <Table
            columns={transactionColumns}
            data={transactions}
            isLoading={loading}
          />
        </Card>
      </div>

      {/* Latest blocks */}
      <div className="mb-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="section-title">Latest Blocks</h2>
          <Link to="/blocks" className="text-primary hover:underline">
            View all blocks
          </Link>
        </div>

        <Card>
          <Table columns={blockColumns} data={blocks} isLoading={loading} />
        </Card>
      </div>
    </div>
  );
};

export default Home;
