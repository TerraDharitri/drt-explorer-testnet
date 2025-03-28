import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import {
  FaRegCopy,
  FaCheck,
  FaExternalLinkAlt,
  FaInfoCircle,
  FaExchangeAlt,
  FaArrowUp,
  FaArrowDown,
  FaUserCircle,
  FaCodeBranch,
  FaKey,
  FaShieldAlt,
} from "react-icons/fa";
import {
  formatNumber,
  formatCrypto,
  shortenAddress,
  formatDate,
  timeAgo,
  formatPercent,
  getStatusClass,
} from "../../utils/formatters";

const AccountDetails = () => {
  const { address } = useParams();
  const [accountData, setAccountData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("transactions");
  const [copySuccess, setCopySuccess] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [assets, setAssets] = useState([]);
  const [delegations, setDelegations] = useState([]);
  const [nfts, setNfts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  // Fetch account details
  useEffect(() => {
    const fetchAccountDetails = async () => {
      setIsLoading(true);
      setError(null);
      try {
        // In a real app, we'd fetch from an API
        // const response = await apiService.getAccountDetails(address);
        // setAccountData(response.data);

        // For demo, simulate API delay and use mock data
        setTimeout(() => {
          // Check if the address is a smart contract
          const isSmartContract = address.startsWith("erd1qqqqq");
          const isVerified =
            address.includes("dharitri") || Math.random() > 0.7;

          // Mock data for the account
          setAccountData({
            address,
            balance: Math.floor(Math.random() * 100000000000000000000),
            nonce: Math.floor(Math.random() * 1000),
            shard: Math.floor(Math.random() * 3),
            type: isSmartContract ? "Smart Contract" : "Wallet",
            username: isVerified
              ? isSmartContract
                ? "exchange.dharitri.org"
                : "alice.dharitri"
              : "",
            isVerified,
            txCount: Math.floor(Math.random() * 1000) + 10,
            createdAt:
              new Date().getTime() - Math.floor(Math.random() * 10000000000),
            lastActive:
              new Date().getTime() - Math.floor(Math.random() * 100000000),
            developerReward: isSmartContract ? "5%" : null,
            code: isSmartContract ? "0x608060405234801561001..." : null,
            assets: [
              {
                identifier: "REWA-0000001",
                name: "REWA",
                token: "REWA",
                balance: (Math.random() * 1000).toFixed(4),
                usdValue: (Math.random() * 10000).toFixed(2),
                decimals: 18,
                change24h: (Math.random() * 10 - 5).toFixed(2),
              },
              {
                token: "MEX",
                balance: Math.floor(Math.random() * 10000000000000000000000),
                value: Math.floor(Math.random() * 100000) / 100,
                decimals: 18,
                price: Math.floor(Math.random() * 100) / 100,
              },
              {
                token: "USDC",
                balance: Math.floor(Math.random() * 1000000000),
                value: Math.floor(Math.random() * 10000) / 100,
                decimals: 6,
                price: 1,
              },
            ],
            stats: {
              totalValue: Math.floor(Math.random() * 10000000) / 100,
              valueChange24h: Math.random() * 20 - 10,
              successRate: Math.floor(Math.random() * 100),
              firstTx:
                new Date().getTime() - Math.floor(Math.random() * 10000000000),
              avgTxValue: Math.floor(Math.random() * 10000000000000000000),
            },
          });

          // Generate mock transactions
          const mockTransactions = Array.from({ length: 50 }, (_, index) => ({
            hash: `tx${index}_${Math.random().toString(36).substring(2, 15)}`,
            from:
              index % 3 === 0
                ? address
                : `erd1${Math.random()
                    .toString(36)
                    .substring(2, 15)}${Math.random()
                    .toString(36)
                    .substring(2, 15)}`,
            to:
              index % 4 === 0
                ? `erd1${Math.random()
                    .toString(36)
                    .substring(2, 15)}${Math.random()
                    .toString(36)
                    .substring(2, 15)}`
                : address,
            value: Math.floor(Math.random() * 1000000000000000000),
            fee: Math.floor(Math.random() * 1000000000000),
            status: Math.random() > 0.1 ? "success" : "failed",
            timestamp:
              new Date().getTime() - Math.floor(Math.random() * 10000000),
            type: ["transfer", "smart contract", "delegate", "claim rewards"][
              Math.floor(Math.random() * 4)
            ],
          }));
          setTransactions(mockTransactions);

          // Generate mock NFTs
          if (Math.random() > 0.3) {
            const mockNfts = Array.from(
              { length: Math.floor(Math.random() * 12) + 1 },
              (_, index) => ({
                identifier: `NFT-${Math.random().toString(36).substring(2, 6)}`,
                name: `Dharitri NFT #${Math.floor(Math.random() * 10000)}`,
                collection: "BAYC-38e92a",
                collectionName:
                  Math.random() > 0.5 ? "Bored Apes" : "Knights of Dharitri",
                value: (Math.random() * 10).toFixed(2),
                thumbnailUrl: "https://placehold.co/400x400?text=NFT",
              })
            );
            setNfts(mockNfts);
          }

          // Generate mock delegations if wallet
          if (!isSmartContract && Math.random() > 0.5) {
            const mockDelegations = Array.from(
              { length: Math.floor(Math.random() * 3) + 1 },
              () => ({
                provider: "DharitriStake",
                amount: (Math.random() * 5000).toFixed(2),
                rewards: (Math.random() * 500).toFixed(2),
              })
            );
            setDelegations(mockDelegations);
          }

          setAssets(accountData?.assets || []);
          setIsLoading(false);
        }, 800);
      } catch (err) {
        setError("Failed to fetch account details");
        console.error(err);
        setIsLoading(false);
      }
    };

    fetchAccountDetails();
  }, [address]);

  // Copy to clipboard function
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };

  // Calculate total value in USD
  const getTotalValueUsd = () => {
    if (!accountData?.assets) return 0;
    return accountData.assets.reduce((sum, asset) => sum + asset.value, 0);
  };

  // Get icon for transaction type
  const getTransactionTypeIcon = (type) => {
    switch (type.toLowerCase()) {
      case "transfer":
        return <FaExchangeAlt className="text-blue-500" />;
      case "smart contract":
        return <FaCodeBranch className="text-purple-500" />;
      case "delegate":
        return <FaKey className="text-green-500" />;
      case "claim rewards":
        return <FaShieldAlt className="text-yellow-500" />;
      default:
        return <FaExchangeAlt className="text-gray-500" />;
    }
  };

  // Get CSS class for transaction status
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
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentTransactions = transactions.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPages = Math.ceil(transactions.length / itemsPerPage);

  const renderPagination = () => {
    return (
      <div className="flex items-center justify-center mt-6 space-x-2">
        <button
          onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
          disabled={currentPage <= 1}
          className="px-4 py-2 rounded-md bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 disabled:opacity-50"
        >
          Previous
        </button>
        <div className="flex items-center space-x-1">
          {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
            let pageNumber;
            if (totalPages <= 5) {
              pageNumber = i + 1;
            } else if (currentPage <= 3) {
              pageNumber = i + 1;
            } else if (currentPage >= totalPages - 2) {
              pageNumber = totalPages - 4 + i;
            } else {
              pageNumber = currentPage - 2 + i;
            }

            return (
              <button
                key={i}
                onClick={() => setCurrentPage(pageNumber)}
                className={`w-10 h-10 rounded-md ${
                  currentPage === pageNumber
                    ? "bg-primary text-white"
                    : "bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700"
                }`}
              >
                {pageNumber}
              </button>
            );
          })}
        </div>
        <button
          onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
          disabled={currentPage >= totalPages}
          className="px-4 py-2 rounded-md bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Account Details</h1>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Account Details</h1>
        <div className="bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400 p-4 rounded-lg">
          {error}
        </div>
      </div>
    );
  }

  if (!accountData) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Account Details</h1>
        <div className="bg-yellow-100 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-400 p-4 rounded-lg">
          Account not found
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-md overflow-hidden mb-6">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
            <div>
              <h1 className="text-2xl font-bold">Account Details</h1>
              <div className="flex items-center mt-2">
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {accountData.type}
                </span>
                {accountData.isVerified && (
                  <span className="ml-2 px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400">
                    Verified
                  </span>
                )}
              </div>
            </div>
            <div className="flex flex-col items-start md:items-end">
              <div className="flex items-center">
                <span className="text-xl font-medium">
                  {formatCrypto(accountData.balance)}
                </span>
                <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">
                  (${getTotalValueUsd().toLocaleString()})
                </span>
              </div>
              <div className="flex items-center mt-1">
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {accountData.txCount} transactions
                </span>
                <span className="mx-2 text-gray-300 dark:text-gray-600">•</span>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  Shard {accountData.shard}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="mb-6">
            <div className="flex items-center mb-2">
              <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Address
              </div>
            </div>
            <div className="flex items-center bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
              <div className="font-mono text-sm break-all">
                {accountData.address}
              </div>
              <button
                onClick={() => copyToClipboard(accountData.address)}
                className="ml-2 text-primary hover:text-primary-dark"
              >
                {copySuccess ? <FaCheck /> : <FaRegCopy />}
              </button>
            </div>
          </div>

          {accountData.username && (
            <div className="mb-6">
              <div className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                Username
              </div>
              <div className="text-md">{accountData.username}</div>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
              <div className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                Balance
              </div>
              <div className="text-lg font-medium">
                {formatCrypto(accountData.balance)}
              </div>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
              <div className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                Transactions
              </div>
              <div className="text-lg font-medium">
                {formatNumber(accountData.txCount)}
              </div>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
              <div className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                Created
              </div>
              <div className="text-lg font-medium">
                {timeAgo(accountData.createdAt)}
              </div>
            </div>
          </div>

          {/* Assets Section */}
          {accountData.assets && accountData.assets.length > 0 && (
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-4">Assets</h2>
              <div className="bg-white dark:bg-gray-900 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
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
                          Balance
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                        >
                          Value
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-800">
                      {accountData.assets.map((asset, index) => (
                        <tr
                          key={index}
                          className="hover:bg-gray-50 dark:hover:bg-gray-800"
                        >
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="bg-gray-100 dark:bg-gray-700 w-8 h-8 rounded-full flex items-center justify-center mr-3">
                                {asset.token.charAt(0)}
                              </div>
                              <div>
                                <div className="font-medium">{asset.token}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm">
                              {formatCrypto(
                                asset.balance,
                                asset.decimals,
                                asset.token
                              )}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm">
                              ${asset.value.toLocaleString()}
                            </div>
                            <div className="text-xs text-gray-500 dark:text-gray-400">
                              ${asset.price} per {asset.token}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Tabs for transactions, NFTs, and delegations */}
      <div className="mb-6">
        <div className="border-b border-gray-200 dark:border-gray-700">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab("transactions")}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === "transactions"
                  ? "border-primary text-primary"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300 dark:hover:border-gray-600"
              }`}
            >
              Transactions
            </button>
            {nfts.length > 0 && (
              <button
                onClick={() => setActiveTab("nfts")}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === "nfts"
                    ? "border-primary text-primary"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300 dark:hover:border-gray-600"
                }`}
              >
                NFTs
              </button>
            )}
            {delegations.length > 0 && (
              <button
                onClick={() => setActiveTab("delegations")}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === "delegations"
                    ? "border-primary text-primary"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300 dark:hover:border-gray-600"
                }`}
              >
                Delegations
              </button>
            )}
          </nav>
        </div>

        {/* Tab content */}
        {activeTab === "transactions" && (
          <div className="mt-6">
            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-md overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-50 dark:bg-gray-800">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                      >
                        Tx Hash
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                      >
                        Type
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                      >
                        From / To
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
                        Status
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                      >
                        Age
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-800">
                    {currentTransactions.map((tx, index) => (
                      <tr
                        key={index}
                        className="hover:bg-gray-50 dark:hover:bg-gray-800"
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <Link
                            to={`/transaction/${tx.hash}`}
                            className="text-primary hover:underline"
                          >
                            {shortenAddress(tx.hash, 8)}
                          </Link>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <span className="mr-2">
                              {getTransactionTypeIcon(tx.type)}
                            </span>
                            <span className="capitalize">{tx.type}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex flex-col">
                            <div className="flex items-center">
                              {tx.from === address ? (
                                <FaArrowUp className="text-red-500 mr-2" />
                              ) : (
                                <FaArrowDown className="text-green-500 mr-2" />
                              )}
                              <Link
                                to={`/account/${
                                  tx.from === address ? tx.to : tx.from
                                }`}
                                className="text-primary hover:underline"
                              >
                                {shortenAddress(
                                  tx.from === address ? tx.to : tx.from,
                                  8
                                )}
                              </Link>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {formatCrypto(tx.value)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getTransactionStatusClass(
                              tx.status
                            )}`}
                          >
                            {tx.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                          {timeAgo(tx.timestamp)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            {renderPagination()}
          </div>
        )}

        {activeTab === "nfts" && (
          <div className="mt-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {nfts.map((nft, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-gray-900 rounded-xl shadow-md overflow-hidden"
                >
                  <img
                    src={nft.thumbnailUrl}
                    alt={nft.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="text-lg font-medium mb-1">{nft.name}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                      {nft.collectionName}
                    </p>
                    <div className="flex justify-between items-center">
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${
                          nft.collectionName === "Bored Apes"
                            ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400"
                            : "bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400"
                        }`}
                      >
                        {nft.collectionName}
                      </span>
                      <span className="text-sm font-medium">
                        {nft.value} REWA
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "delegations" && (
          <div className="mt-6">
            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-md overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-50 dark:bg-gray-800">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                      >
                        Provider
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                      >
                        Amount
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                      >
                        Rewards
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                      >
                        APR
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                      >
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-800">
                    {delegations.map((delegation, index) => (
                      <tr
                        key={index}
                        className="hover:bg-gray-50 dark:hover:bg-gray-800"
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="bg-gray-100 dark:bg-gray-700 w-8 h-8 rounded-full flex items-center justify-center mr-3">
                              <FaUserCircle className="text-gray-500" />
                            </div>
                            <div>
                              <div className="font-medium">
                                {delegation.providerName}
                              </div>
                              <div className="text-sm text-gray-500 dark:text-gray-400">
                                {shortenAddress(delegation.provider, 8)}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {formatCrypto(delegation.amount)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {formatCrypto(delegation.rewards)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {formatPercent(delegation.apr)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              delegation.unbound
                                ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400"
                                : "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
                            }`}
                          >
                            {delegation.unbound ? "Unbonding" : "Active"}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Information Card */}
      <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6">
        <div className="flex items-center mb-4">
          <FaInfoCircle className="text-primary mr-2" />
          <h2 className="text-lg font-semibold">
            About{" "}
            {accountData.type === "Smart Contract"
              ? "Smart Contracts"
              : "Accounts"}
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-md font-medium mb-2">
              {accountData.type === "Smart Contract"
                ? "Smart Contracts"
                : "Wallets"}{" "}
              on Dharitri
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {accountData.type === "Smart Contract"
                ? "Smart contracts are programs deployed on the Dharitri blockchain that execute automatically when predetermined conditions are met. They can define rules for token distribution, decentralized applications, and more."
                : "Dharitri accounts are secure digital identities on the blockchain, capable of holding REWA and other tokens, sending transactions, and interacting with smart contracts. Each account has a unique address and is secured by cryptographic keys."}
            </p>
          </div>
          <div>
            <h3 className="text-md font-medium mb-2">Key Features</h3>
            <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-400 space-y-1">
              {accountData.type === "Smart Contract" ? (
                <>
                  <li>Deployed with WebAssembly (WASM)</li>
                  <li>Gas-efficient execution</li>
                  <li>Upgradable design</li>
                  <li>Support for multiple tokens</li>
                  <li>Predictable execution</li>
                </>
              ) : (
                <>
                  <li>Secured by Schnorr signatures</li>
                  <li>Human-readable herotag support</li>
                  <li>Low transaction fees</li>
                  <li>Support for NFTs and tokens</li>
                  <li>Staking capabilities</li>
                </>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountDetails;
