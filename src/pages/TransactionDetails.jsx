import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import {
  FaCheckCircle,
  FaTimesCircle,
  FaHourglassHalf,
  FaExclamationTriangle,
  FaExchangeAlt,
  FaGasPump,
  FaCodeBranch,
  FaRegClock,
  FaServer,
  FaFileContract,
  FaCode,
  FaArrowCircleRight,
} from "react-icons/fa";
import apiService from "../utils/api";
import {
  formatCurrency,
  formatDate,
  timeAgo,
  formatNumber,
} from "../utils/formatters";
import Card from "../components/common/Card";
import HashLink from "../components/common/HashLink";
import CopyButton from "../components/common/CopyButton";
import Badge from "../components/common/Badge";
import Loading from "../components/common/Loading";

const TransactionDetails = () => {
  const { txHash } = useParams();
  const [transaction, setTransaction] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showRawData, setShowRawData] = useState(false);

  useEffect(() => {
    const fetchTransaction = async () => {
      if (!txHash) return;

      setLoading(true);
      setError(null);

      try {
        const response = await apiService.getTransaction(txHash);
        // Convert timestamp from seconds to milliseconds for date formatting
        const txData = {
          ...response.data,
          timestamp: response.data.timestamp * 1000,
        };
        setTransaction(txData);
      } catch (err) {
        setError("Failed to fetch transaction details");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTransaction();
  }, [txHash]);

  const getStatusInfo = (status) => {
    const statusMap = {
      success: {
        icon: FaCheckCircle,
        label: "Success",
        color: "text-green-500",
        variant: "success",
        description: "Transaction was successfully executed",
      },
      pending: {
        icon: FaHourglassHalf,
        label: "Pending",
        color: "text-yellow-500",
        variant: "warning",
        description: "Transaction is pending confirmation",
      },
      failed: {
        icon: FaTimesCircle,
        label: "Failed",
        color: "text-red-500",
        variant: "danger",
        description: "Transaction failed to execute",
      },
      invalid: {
        icon: FaExclamationTriangle,
        label: "Invalid",
        color: "text-red-500",
        variant: "danger",
        description: "Transaction is invalid",
      },
    };

    return (
      statusMap[status] || {
        icon: FaExclamationTriangle,
        label: status,
        color: "text-gray-500",
        variant: "default",
        description: "Unknown status",
      }
    );
  };

  const getTransactionTypeInfo = (type) => {
    const types = {
      transfer: {
        icon: FaExchangeAlt,
        label: "Transfer",
        description: "Token transfer between accounts",
      },
      smartContract: {
        icon: FaFileContract,
        label: "Smart Contract",
        description: "Smart contract interaction",
      },
      staking: {
        icon: FaServer,
        label: "Staking",
        description: "Validator staking transaction",
      },
      // You can add more types here
      default: {
        icon: FaExchangeAlt,
        label: "Transaction",
        description: "Standard transaction",
      },
    };

    return types[type] || types.default;
  };

  if (loading && !transaction) {
    return (
      <div className="container-custom py-16 pt-24">
        <Loading className="my-16" size="lg" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container-custom py-16 pt-24">
        <div className="text-center text-red-500">
          <FaExclamationTriangle className="mx-auto h-12 w-12 mb-4" />
          <p className="text-xl font-medium mb-4">{error}</p>
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

  if (!transaction) {
    return (
      <div className="container-custom py-16 pt-24">
        <div className="text-center">
          <div className="bg-yellow-50 dark:bg-yellow-900/20 p-6 rounded-xl inline-block mb-4">
            <FaExclamationTriangle className="h-12 w-12 text-yellow-500" />
          </div>
          <p className="text-xl font-medium text-gray-900 dark:text-gray-100 mb-2">
            Transaction not found
          </p>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            The transaction hash you're looking for doesn't exist or hasn't been
            indexed yet.
          </p>
          <Link to="/" className="btn-primary inline-block">
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  const statusInfo = getStatusInfo(transaction.status);
  const typeInfo = getTransactionTypeInfo(transaction.type);
  const StatusIcon = statusInfo.icon;
  const TypeIcon = typeInfo.icon;

  return (
    <div className="container-custom py-8 pt-24">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
          Transaction Details
        </h1>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {/* Transaction Summary Card */}
        <Card className="mb-2">
          <div className="px-6 py-5 border-b border-gray-100 dark:border-gray-700">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center">
                <div
                  className={`p-2 rounded-lg ${statusInfo.color} bg-opacity-10 mr-3`}
                >
                  <StatusIcon className={`h-5 w-5 ${statusInfo.color}`} />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {typeInfo.label}
                  </h2>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {typeInfo.description}
                  </span>
                </div>
              </div>
              <Badge
                variant={statusInfo.variant}
                size="lg"
                glow={transaction.status === "success"}
              >
                {statusInfo.label}
              </Badge>
            </div>
          </div>

          <div className="p-6">
            <div className="mb-6 pb-6 border-b border-gray-100 dark:border-gray-700">
              <div className="flex flex-col gap-2">
                <div className="flex flex-col md:flex-row md:items-center gap-2">
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 min-w-[120px]">
                    Transaction Hash:
                  </h3>
                  <div className="flex items-center flex-1">
                    <span className="font-mono text-gray-800 dark:text-gray-200 break-all text-sm">
                      {txHash}
                    </span>
                    <CopyButton text={txHash} className="ml-2" />
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
              {/* Left Column */}
              <div>
                <div className="flex justify-between py-3 border-b border-gray-100 dark:border-gray-700">
                  <div className="flex items-center text-gray-500 dark:text-gray-400">
                    <FaRegClock className="h-4 w-4 mr-2" />
                    <span className="text-sm">Timestamp</span>
                  </div>
                  <div className="text-sm text-gray-900 dark:text-gray-200">
                    {formatDate(transaction.timestamp)}{" "}
                    <span className="text-gray-500 dark:text-gray-400">
                      ({timeAgo(transaction.timestamp)})
                    </span>
                  </div>
                </div>

                <div className="flex justify-between py-3 border-b border-gray-100 dark:border-gray-700">
                  <div className="flex items-center text-gray-500 dark:text-gray-400">
                    <FaServer className="h-4 w-4 mr-2" />
                    <span className="text-sm">Block</span>
                  </div>
                  <div className="text-sm">
                    {transaction.block ? (
                      <HashLink hash={transaction.block} type="block" />
                    ) : (
                      <span className="text-yellow-500">Pending</span>
                    )}
                  </div>
                </div>

                <div className="flex justify-between py-3 border-b border-gray-100 dark:border-gray-700">
                  <div className="flex items-center text-gray-500 dark:text-gray-400">
                    <FaCodeBranch className="h-4 w-4 mr-2" />
                    <span className="text-sm">Nonce</span>
                  </div>
                  <div className="text-sm text-gray-900 dark:text-gray-200">
                    {transaction.nonce !== undefined
                      ? formatNumber(transaction.nonce)
                      : "N/A"}
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div>
                <div className="flex justify-between py-3 border-b border-gray-100 dark:border-gray-700">
                  <div className="flex items-center text-gray-500 dark:text-gray-400">
                    <FaExchangeAlt className="h-4 w-4 mr-2" />
                    <span className="text-sm">Value</span>
                  </div>
                  <div className="text-sm font-semibold text-gray-900 dark:text-gray-200">
                    {formatCurrency(transaction.value)}
                  </div>
                </div>

                <div className="flex justify-between py-3 border-b border-gray-100 dark:border-gray-700">
                  <div className="flex items-center text-gray-500 dark:text-gray-400">
                    <FaGasPump className="h-4 w-4 mr-2" />
                    <span className="text-sm">Fee</span>
                  </div>
                  <div className="text-sm text-gray-900 dark:text-gray-200">
                    {formatCurrency(transaction.fee)}
                  </div>
                </div>

                <div className="flex justify-between py-3 border-b border-gray-100 dark:border-gray-700">
                  <div className="flex items-center text-gray-500 dark:text-gray-400">
                    <FaFileContract className="h-4 w-4 mr-2" />
                    <span className="text-sm">Type</span>
                  </div>
                  <div className="text-sm text-gray-900 dark:text-gray-200">
                    {transaction.type &&
                      transaction.type.charAt(0).toUpperCase() +
                        transaction.type.slice(1)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* From/To Card */}
        <Card className="mb-2">
          <div className="p-6">
            <div className="flex flex-col space-y-6">
              <div className="flex items-start md:items-center">
                <div className="min-w-[80px] text-sm font-medium text-gray-500 dark:text-gray-400 mr-6">
                  From
                </div>
                <div className="flex-1 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <HashLink
                    hash={transaction.from}
                    type="account"
                    length="full"
                    highlight
                    monospace
                  />
                </div>
              </div>

              <div className="flex justify-center">
                <div className="bg-gray-100 dark:bg-gray-800 p-2 rounded-full">
                  <FaArrowCircleRight className="h-5 w-5 text-gray-400" />
                </div>
              </div>

              <div className="flex items-start md:items-center">
                <div className="min-w-[80px] text-sm font-medium text-gray-500 dark:text-gray-400 mr-6">
                  To
                </div>
                <div className="flex-1 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <HashLink
                    hash={transaction.to}
                    type="account"
                    length="full"
                    highlight
                    monospace
                  />
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Data Card */}
        {transaction.data && (
          <Card className="mb-2">
            <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center">
              <div className="flex items-center">
                <FaCode className="mr-2 text-gray-500" />
                <h3 className="font-medium text-gray-900 dark:text-white">
                  Transaction Data
                </h3>
              </div>
              <button
                className="text-sm text-primary hover:underline"
                onClick={() => setShowRawData(!showRawData)}
              >
                {showRawData ? "Show Decoded" : "Show Raw"}
              </button>
            </div>
            <div className="p-6">
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg font-mono text-sm break-all overflow-x-auto">
                {transaction.data}
              </div>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

export default TransactionDetails;
