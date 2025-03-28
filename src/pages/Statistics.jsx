import React, { useState, useEffect } from "react";
import {
  FaCube,
  FaExchangeAlt,
  FaUsers,
  FaServer,
  FaClock,
  FaCoins,
  FaChartLine,
  FaInfoCircle,
  FaArrowUp,
  FaArrowDown,
} from "react-icons/fa";
import { formatNumber, formatCrypto, formatPercent } from "../utils/formatters";

const Statistics = () => {
  const [statistics, setStatistics] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Mock data
  const mockStats = {
    network: {
      blockHeight: 18426789,
      epochNumber: 1024,
      roundNumber: 19854237,
      averageBlockTime: 6.2, // seconds
      shardCount: 3,
      nodesCount: 3274,
      uptimePercentage: 99.98,
      version: "v1.4.8",
    },
    transactions: {
      totalCompleted: 148376295,
      count24h: 94853,
      avgTPS: 18.3,
      peakTPS: 42.7,
      avgFee: 0.00022, // REWA
      successRate: 99.7,
      pending: 143,
    },
    accounts: {
      totalAddresses: 1946283,
      activeAddresses24h: 31572,
      smartContracts: 4325,
      newAccounts24h: 872,
      stakingAccounts: 6843,
    },
    economics: {
      totalSupply: 25462713, // REWA
      circulatingSupply: 23845602, // REWA
      staked: 13862418, // REWA
      price: 73.42, // USD
      marketCap: 1750743298, // USD
      fullyDilutedMarketCap: 1869234429, // USD
      volume24h: 156437892, // USD
      stakingAPR: 9.13, // %
      totalValueLocked: 947823654, // USD
    },
    validators: {
      total: 3200,
      active: 2938,
      queue: 217,
      eligibleStake: 12546723, // REWA
      waitingStake: 1315695, // REWA
      topValidator: {
        stake: 2450000, // REWA
        nodes: 32,
      },
      minStakePerNode: 1250, // REWA
    },
    performance: {
      currentEpochFees: 156.84, // REWA
      gasConsumed24h: 4231856492,
      avgGasPrice: 1000000000, // Gas unit price
      avgBlockSize: 47892, // bytes
      avgBlockGasLimit: 1500000000,
    },
  };

  useEffect(() => {
    const fetchStatistics = async () => {
      setIsLoading(true);
      setError(null);
      try {
        // In a real app, we'd fetch from an API
        // const response = await apiService.getStatistics();

        // For demo, use mock data and simulate API delay
        setTimeout(() => {
          setStatistics(mockStats);
          setIsLoading(false);
        }, 800);
      } catch (err) {
        setError("Failed to fetch statistics");
        console.error(err);
        setIsLoading(false);
      }
    };

    fetchStatistics();
  }, []);

  const getChangeColorClass = (value) => {
    return value >= 0
      ? "text-green-500 dark:text-green-400"
      : "text-red-500 dark:text-red-400";
  };

  const getChangeIcon = (value) => {
    return value >= 0 ? (
      <FaArrowUp className="inline mr-1" />
    ) : (
      <FaArrowDown className="inline mr-1" />
    );
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Network Statistics</h1>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Network Statistics</h1>
        <div className="bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400 p-4 rounded-lg">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <h1 className="text-2xl font-bold mb-6">Dharitri Network Statistics</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        {/* Network Stats */}
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-md overflow-hidden">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center">
              <div className="bg-blue-100 dark:bg-blue-900/20 p-3 rounded-lg mr-4">
                <FaCube className="text-blue-500 dark:text-blue-400" />
              </div>
              <h2 className="text-xl font-semibold">Network Status</h2>
            </div>
          </div>
          <div className="p-6">
            <ul className="space-y-4">
              <li className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-400">
                  Block Height
                </span>
                <span className="font-medium">
                  {formatNumber(statistics.network.blockHeight)}
                </span>
              </li>
              <li className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-400">Epoch</span>
                <span className="font-medium">
                  {statistics.network.epochNumber}
                </span>
              </li>
              <li className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-400">Round</span>
                <span className="font-medium">
                  {formatNumber(statistics.network.roundNumber)}
                </span>
              </li>
              <li className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-400">
                  Average Block Time
                </span>
                <span className="font-medium">
                  {statistics.network.averageBlockTime} sec
                </span>
              </li>
              <li className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-400">
                  Shard Count
                </span>
                <span className="font-medium">
                  {statistics.network.shardCount}
                </span>
              </li>
              <li className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-400">Nodes</span>
                <span className="font-medium">
                  {formatNumber(statistics.network.nodesCount)}
                </span>
              </li>
              <li className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-400">Uptime</span>
                <span className="font-medium">
                  {statistics.network.uptimePercentage}%
                </span>
              </li>
              <li className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-400">
                  Version
                </span>
                <span className="font-medium">
                  {statistics.network.version}
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Transaction Stats */}
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-md overflow-hidden">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center">
              <div className="bg-green-100 dark:bg-green-900/20 p-3 rounded-lg mr-4">
                <FaExchangeAlt className="text-green-500 dark:text-green-400" />
              </div>
              <h2 className="text-xl font-semibold">Transactions</h2>
            </div>
          </div>
          <div className="p-6">
            <ul className="space-y-4">
              <li className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-400">
                  Total Completed
                </span>
                <span className="font-medium">
                  {formatNumber(statistics.transactions.totalCompleted)}
                </span>
              </li>
              <li className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-400">
                  24h Count
                </span>
                <span className="font-medium">
                  {formatNumber(statistics.transactions.count24h)}
                </span>
              </li>
              <li className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-400">
                  Average TPS
                </span>
                <span className="font-medium">
                  {statistics.transactions.avgTPS}
                </span>
              </li>
              <li className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-400">
                  Peak TPS
                </span>
                <span className="font-medium">
                  {statistics.transactions.peakTPS}
                </span>
              </li>
              <li className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-400">
                  Average Fee
                </span>
                <span className="font-medium">
                  {statistics.transactions.avgFee} REWA
                </span>
              </li>
              <li className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-400">
                  Success Rate
                </span>
                <span className="font-medium">
                  {statistics.transactions.successRate}%
                </span>
              </li>
              <li className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-400">
                  Pending
                </span>
                <span className="font-medium">
                  {statistics.transactions.pending}
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Account Stats */}
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-md overflow-hidden">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center">
              <div className="bg-purple-100 dark:bg-purple-900/20 p-3 rounded-lg mr-4">
                <FaUsers className="text-purple-500 dark:text-purple-400" />
              </div>
              <h2 className="text-xl font-semibold">Accounts</h2>
            </div>
          </div>
          <div className="p-6">
            <ul className="space-y-4">
              <li className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-400">
                  Total Addresses
                </span>
                <span className="font-medium">
                  {formatNumber(statistics.accounts.totalAddresses)}
                </span>
              </li>
              <li className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-400">
                  Active (24h)
                </span>
                <span className="font-medium">
                  {formatNumber(statistics.accounts.activeAddresses24h)}
                </span>
              </li>
              <li className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-400">
                  Smart Contracts
                </span>
                <span className="font-medium">
                  {formatNumber(statistics.accounts.smartContracts)}
                </span>
              </li>
              <li className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-400">
                  New Accounts (24h)
                </span>
                <span className="font-medium">
                  {formatNumber(statistics.accounts.newAccounts24h)}
                </span>
              </li>
              <li className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-400">
                  Staking Accounts
                </span>
                <span className="font-medium">
                  {formatNumber(statistics.accounts.stakingAccounts)}
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        {/* Economics */}
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-md overflow-hidden">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center">
              <div className="bg-indigo-100 dark:bg-indigo-900/20 p-3 rounded-lg mr-4">
                <FaCoins className="text-indigo-500 dark:text-indigo-400" />
              </div>
              <h2 className="text-xl font-semibold">Economics</h2>
            </div>
          </div>
          <div className="p-6">
            <ul className="space-y-4">
              <li className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-400">
                  REWA Price
                </span>
                <span className="font-medium">
                  ${statistics.economics.price}
                </span>
              </li>
              <li className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-400">
                  Market Cap
                </span>
                <span className="font-medium">
                  ${formatNumber(statistics.economics.marketCap)}
                </span>
              </li>
              <li className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-400">
                  Total Supply
                </span>
                <span className="font-medium">
                  {formatNumber(statistics.economics.totalSupply)} REWA
                </span>
              </li>
              <li className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-400">
                  Circulating Supply
                </span>
                <span className="font-medium">
                  {formatNumber(statistics.economics.circulatingSupply)} REWA
                </span>
              </li>
              <li className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-400">
                  Staked REWA
                </span>
                <span className="font-medium">
                  {formatNumber(statistics.economics.staked)} REWA
                </span>
              </li>
              <li className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-400">
                  24h Volume
                </span>
                <span className="font-medium">
                  ${formatNumber(statistics.economics.volume24h)}
                </span>
              </li>
              <li className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-400">
                  Staking APR
                </span>
                <span className="font-medium">
                  {statistics.economics.stakingAPR}%
                </span>
              </li>
              <li className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-400">
                  Total Value Locked
                </span>
                <span className="font-medium">
                  ${formatNumber(statistics.economics.totalValueLocked)}
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Validators */}
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-md overflow-hidden">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center">
              <div className="bg-orange-100 dark:bg-orange-900/20 p-3 rounded-lg mr-4">
                <FaServer className="text-orange-500 dark:text-orange-400" />
              </div>
              <h2 className="text-xl font-semibold">Validators</h2>
            </div>
          </div>
          <div className="p-6">
            <ul className="space-y-4">
              <li className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-400">
                  Total Validators
                </span>
                <span className="font-medium">
                  {formatNumber(statistics.validators.total)}
                </span>
              </li>
              <li className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-400">
                  Active Validators
                </span>
                <span className="font-medium">
                  {formatNumber(statistics.validators.active)}
                </span>
              </li>
              <li className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-400">
                  Queue Size
                </span>
                <span className="font-medium">
                  {statistics.validators.queue}
                </span>
              </li>
              <li className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-400">
                  Eligible Stake
                </span>
                <span className="font-medium">
                  {formatNumber(statistics.validators.eligibleStake)} REWA
                </span>
              </li>
              <li className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-400">
                  Waiting Stake
                </span>
                <span className="font-medium">
                  {formatNumber(statistics.validators.waitingStake)} REWA
                </span>
              </li>
              <li className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-400">
                  Top Validator Stake
                </span>
                <span className="font-medium">
                  {formatNumber(statistics.validators.topValidator.stake)} REWA
                </span>
              </li>
              <li className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-400">
                  Top Validator Nodes
                </span>
                <span className="font-medium">
                  {statistics.validators.topValidator.nodes}
                </span>
              </li>
              <li className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-400">
                  Min Stake per Node
                </span>
                <span className="font-medium">
                  {formatNumber(statistics.validators.minStakePerNode)} REWA
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Performance */}
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-md overflow-hidden">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center">
              <div className="bg-red-100 dark:bg-red-900/20 p-3 rounded-lg mr-4">
                <FaClock className="text-red-500 dark:text-red-400" />
              </div>
              <h2 className="text-xl font-semibold">Performance</h2>
            </div>
          </div>
          <div className="p-6">
            <ul className="space-y-4">
              <li className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-400">
                  Current Epoch Fees
                </span>
                <span className="font-medium">
                  {statistics.performance.currentEpochFees} REWA
                </span>
              </li>
              <li className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-400">
                  Gas Consumed (24h)
                </span>
                <span className="font-medium">
                  {formatNumber(statistics.performance.gasConsumed24h)}
                </span>
              </li>
              <li className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-400">
                  Average Gas Price
                </span>
                <span className="font-medium">
                  {statistics.performance.avgGasPrice / 1000000000} Gwei
                </span>
              </li>
              <li className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-400">
                  Average Block Size
                </span>
                <span className="font-medium">
                  {statistics.performance.avgBlockSize} bytes
                </span>
              </li>
              <li className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-400">
                  Average Block Gas Limit
                </span>
                <span className="font-medium">
                  {statistics.performance.avgBlockGasLimit / 1000000000} B
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Info Card */}
      <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6">
        <div className="flex items-center mb-4">
          <FaInfoCircle className="text-primary mr-2" />
          <h2 className="text-lg font-semibold">About Dharitri Statistics</h2>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
          The Statistics page provides a comprehensive overview of the Dharitri
          blockchain metrics. These statistics are updated regularly to give you
          the most current view of the network status, transaction activity,
          validator performance, and economic indicators.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-md font-medium mb-2">Network Performance</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Dharitri is designed to be highly scalable with its adaptive state
              sharding architecture. The network can process thousands of
              transactions per second with low latency and minimal fees, making
              it ideal for enterprise-grade applications and high-volume use
              cases.
            </p>
          </div>
          <div>
            <h3 className="text-md font-medium mb-2">Staking & Validators</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Dharitri security is maintained by validators who stake REWA to
              participate in the network. Validators are responsible for
              processing transactions and maintaining the blockchain. The
              staking mechanism ensures network security while providing staking
              rewards to participants.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
