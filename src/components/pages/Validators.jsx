import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FaServer,
  FaCircle,
  FaChevronDown,
  FaChevronUp,
  FaSearch,
  FaInfoCircle,
  FaRegCopy,
  FaCheck,
  FaExclamationTriangle,
  FaSync,
} from "react-icons/fa";
import {
  formatNumber,
  formatCrypto,
  shortenAddress,
} from "../../utils/formatters";

const Validators = () => {
  console.log("Validators component mounting...");
  const [validators, setValidators] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortConfig, setSortConfig] = useState({
    key: "stake",
    direction: "desc",
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [copySuccess, setCopySuccess] = useState("");
  const [activeTab, setActiveTab] = useState("active");
  const [stats, setStats] = useState({
    totalValidators: 0,
    activeValidators: 0,
    waitingValidators: 0,
    jailedValidators: 0,
    totalStake: "0",
    averageUptime: "0",
  });

  // Get mock data for validators
  useEffect(() => {
    const fetchValidators = async () => {
      setIsLoading(true);
      setError(null);
      try {
        console.log("Fetching validators data...");
        // In a real app, we'd fetch from an API
        // const response = await apiService.getValidators();

        // Mock data
        setTimeout(() => {
          try {
            console.log("Creating mock validators...");
            const mockValidators = Array.from({ length: 50 }).map(
              (_, index) => {
                try {
                  const status =
                    index < 40 ? "active" : index < 45 ? "waiting" : "jailed";
                  const baseStake = (
                    2500000000000000000000 +
                    Math.random() * 1000000000000000000000
                  ).toString();

                  return {
                    id: `validator_${index + 1}`,
                    name: `Dharitri Validator ${index + 1}`,
                    address: `erd1${Math.random()
                      .toString(36)
                      .substring(2, 15)}${Math.random()
                      .toString(36)
                      .substring(2, 15)}`,
                    status,
                    stake: baseStake,
                    topUp: (BigInt(baseStake) / BigInt(10)).toString(),
                    locked:
                      status === "jailed"
                        ? (BigInt(baseStake) / BigInt(20)).toString()
                        : "0",
                    numNodes: Math.floor(Math.random() * 10) + 1,
                    score: (85 + Math.random() * 15).toFixed(2),
                    uptime: (95 + Math.random() * 5).toFixed(2),
                    commission: (5 + Math.random() * 15).toFixed(1),
                    delegators: Math.floor(Math.random() * 500) + 50,
                    website: Math.random() > 0.5 ? "https://example.com" : null,
                    identity: Math.random() > 0.7 ? "VALIDATOR_IDENTITY" : null,
                    shards: Array.from(
                      { length: Math.floor(Math.random() * 3) + 1 },
                      () => Math.floor(Math.random() * 3)
                    ),
                  };
                } catch (validatorError) {
                  console.error(
                    "Error creating mock validator:",
                    validatorError
                  );
                  // Return a default validator on error
                  return {
                    id: `validator_error_${index + 1}`,
                    name: `Default Validator ${index + 1}`,
                    address: `erd1defaultaddress${index}`,
                    status: "active",
                    stake: "2500000000000000000000",
                    topUp: "250000000000000000000",
                    locked: "0",
                    numNodes: 1,
                    score: "90.00",
                    uptime: "99.00",
                    commission: "10.0",
                    delegators: 100,
                    website: null,
                    identity: null,
                    shards: [0],
                  };
                }
              }
            );

            console.log(`Created ${mockValidators.length} mock validators`);

            // Calculate stats from the mock data
            const activeCount = mockValidators.filter(
              (v) => v.status === "active"
            ).length;
            const waitingCount = mockValidators.filter(
              (v) => v.status === "waiting"
            ).length;
            const jailedCount = mockValidators.filter(
              (v) => v.status === "jailed"
            ).length;

            // Safe calculation of total stake
            let totalStake = "0";
            try {
              totalStake = mockValidators
                .reduce((sum, v) => {
                  try {
                    return sum + BigInt(v.stake || "0");
                  } catch (e) {
                    console.warn("Error adding validator stake:", e);
                    return sum;
                  }
                }, BigInt(0))
                .toString();

              console.log("Total stake calculated:", totalStake);
            } catch (stakeErr) {
              console.error("Failed to calculate total stake:", stakeErr);
            }

            // Calculate average uptime
            let avgUptime = "0.00";
            try {
              const uptimeSum = mockValidators.reduce((sum, v) => {
                try {
                  return sum + parseFloat(v.uptime || "0");
                } catch (e) {
                  console.warn("Error adding validator uptime:", e);
                  return sum;
                }
              }, 0);
              avgUptime = (uptimeSum / mockValidators.length).toFixed(2);
              console.log("Average uptime calculated:", avgUptime);
            } catch (uptimeErr) {
              console.error("Failed to calculate average uptime:", uptimeErr);
            }

            // Update stats
            const statsObj = {
              totalValidators: mockValidators.length,
              activeValidators: activeCount,
              waitingValidators: waitingCount,
              jailedValidators: jailedCount,
              totalStake: totalStake,
              averageUptime: avgUptime,
            };

            setStats(statsObj);
            setValidators(mockValidators);
            setIsLoading(false);
            console.log("Validators data loaded successfully");
          } catch (mockError) {
            console.error("Error creating mock data:", mockError);
            setError("Failed to generate validators data. Please try again.");
            setIsLoading(false);
          }
        }, 800);
      } catch (err) {
        setError(
          "Failed to fetch validators data. Please try refreshing the page."
        );
        console.error("Error in validators fetch:", err);
        setIsLoading(false);
      }
    };

    fetchValidators();

    // Cleanup function
    return () => {
      console.log("Validators component unmounting...");
    };
  }, []);

  const sortedValidators = React.useMemo(() => {
    console.log("Sorting validators...");

    if (!validators || !validators.length) {
      console.log("No validators to sort");
      return [];
    }

    let sortableValidators = [...validators];
    if (sortConfig !== null) {
      sortableValidators.sort((a, b) => {
        // Safety checks
        if (!a || !b) return 0;
        if (!(sortConfig.key in a) || !(sortConfig.key in b)) return 0;

        if (
          sortConfig.key === "stake" ||
          sortConfig.key === "topUp" ||
          sortConfig.key === "locked"
        ) {
          try {
            const bigA = BigInt(a[sortConfig.key] || "0");
            const bigB = BigInt(b[sortConfig.key] || "0");

            if (bigA < bigB) {
              return sortConfig.direction === "asc" ? -1 : 1;
            }
            if (bigA > bigB) {
              return sortConfig.direction === "asc" ? 1 : -1;
            }
            return 0;
          } catch (err) {
            console.error(
              `Error comparing BigInt values for ${sortConfig.key}:`,
              err
            );
            return 0;
          }
        } else if (
          sortConfig.key === "score" ||
          sortConfig.key === "uptime" ||
          sortConfig.key === "commission"
        ) {
          // Handle numeric string comparisons properly
          const numA = parseFloat(a[sortConfig.key] || "0");
          const numB = parseFloat(b[sortConfig.key] || "0");

          if (numA < numB) {
            return sortConfig.direction === "asc" ? -1 : 1;
          }
          if (numA > numB) {
            return sortConfig.direction === "asc" ? 1 : -1;
          }
          return 0;
        } else {
          // Handle string comparisons
          const strA = String(a[sortConfig.key] || "");
          const strB = String(b[sortConfig.key] || "");

          if (strA < strB) {
            return sortConfig.direction === "asc" ? -1 : 1;
          }
          if (strA > strB) {
            return sortConfig.direction === "asc" ? 1 : -1;
          }
          return 0;
        }
      });
    }
    return sortableValidators;
  }, [validators, sortConfig]);

  const filteredValidators = React.useMemo(() => {
    if (!searchTerm) {
      return sortedValidators.filter(
        (validator) => activeTab === "all" || validator.status === activeTab
      );
    }

    const term = searchTerm.toLowerCase();
    return sortedValidators.filter((validator) => {
      return (
        (validator.name.toLowerCase().includes(term) ||
          validator.address.toLowerCase().includes(term) ||
          (validator.website &&
            validator.website.toLowerCase().includes(term))) &&
        (activeTab === "all" || validator.status === activeTab)
      );
    });
  }, [sortedValidators, searchTerm, activeTab]);

  const requestSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const getClassNamesFor = (name) => {
    if (!sortConfig) {
      return;
    }
    return sortConfig.key === name ? sortConfig.direction : undefined;
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

  const getStatusClass = (status) => {
    switch (status) {
      case "active":
        return "text-green-500";
      case "waiting":
        return "text-yellow-500";
      case "jailed":
        return "text-red-500";
      default:
        return "text-gray-500";
    }
  };

  const copyToClipboard = (text, type) => {
    navigator.clipboard.writeText(text);
    setCopySuccess(type);
    setTimeout(() => setCopySuccess(""), 2000);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center bg-red-100 dark:bg-red-900/20 p-6 rounded-xl shadow-md">
          <FaExclamationTriangle className="text-red-500 dark:text-red-400 text-5xl mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">Something Went Wrong</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-6">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-2 bg-primary hover:bg-primary-dark text-white rounded-lg transition-colors inline-flex items-center"
          >
            <FaSync className="mr-2" /> Retry
          </button>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Validators</h1>
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-md p-10">
          <div className="flex flex-col items-center justify-center h-64">
            <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-gray-600 dark:text-gray-400">
              Loading validators data...
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (validators.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Validators</h1>
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-md p-10 text-center">
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            No validators found.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded-lg transition-colors"
          >
            Refresh
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Validators</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-md p-4">
          <p className="text-gray-500 dark:text-gray-400 text-sm mb-1">
            Total Validators
          </p>
          <p className="text-2xl font-semibold">
            {formatNumber(stats.totalValidators, 0)}
          </p>
        </div>
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-md p-4">
          <p className="text-gray-500 dark:text-gray-400 text-sm mb-1">
            Active
          </p>
          <p className="text-2xl font-semibold text-green-500">
            {formatNumber(stats.activeValidators, 0)}
          </p>
        </div>
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-md p-4">
          <p className="text-gray-500 dark:text-gray-400 text-sm mb-1">
            Waiting
          </p>
          <p className="text-2xl font-semibold text-yellow-500">
            {formatNumber(stats.waitingValidators, 0)}
          </p>
        </div>
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-md p-4">
          <p className="text-gray-500 dark:text-gray-400 text-sm mb-1">
            Jailed
          </p>
          <p className="text-2xl font-semibold text-red-500">
            {formatNumber(stats.jailedValidators, 0)}
          </p>
        </div>
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-md p-4">
          <p className="text-gray-500 dark:text-gray-400 text-sm mb-1">
            Total Stake
          </p>
          <p className="text-2xl font-semibold">
            {formatCrypto(stats.totalStake, 18, "REWA")}
          </p>
        </div>
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-md p-4">
          <p className="text-gray-500 dark:text-gray-400 text-sm mb-1">
            Avg. Uptime
          </p>
          <p className="text-2xl font-semibold">{stats.averageUptime}%</p>
        </div>
      </div>

      {/* Filter and Search */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        <div className="flex space-x-2 bg-white dark:bg-gray-900 rounded-lg shadow-sm p-1">
          <button
            className={`px-4 py-2 rounded-md ${
              activeTab === "all"
                ? "bg-primary text-white"
                : "hover:bg-gray-100 dark:hover:bg-gray-800"
            }`}
            onClick={() => setActiveTab("all")}
          >
            All
          </button>
          <button
            className={`px-4 py-2 rounded-md ${
              activeTab === "active"
                ? "bg-primary text-white"
                : "hover:bg-gray-100 dark:hover:bg-gray-800"
            }`}
            onClick={() => setActiveTab("active")}
          >
            Active
          </button>
          <button
            className={`px-4 py-2 rounded-md ${
              activeTab === "waiting"
                ? "bg-primary text-white"
                : "hover:bg-gray-100 dark:hover:bg-gray-800"
            }`}
            onClick={() => setActiveTab("waiting")}
          >
            Waiting
          </button>
          <button
            className={`px-4 py-2 rounded-md ${
              activeTab === "jailed"
                ? "bg-primary text-white"
                : "hover:bg-gray-100 dark:hover:bg-gray-800"
            }`}
            onClick={() => setActiveTab("jailed")}
          >
            Jailed
          </button>
        </div>

        <div className="relative w-full sm:w-auto">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FaSearch className="text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search validators..."
            value={searchTerm}
            onChange={handleSearch}
            className="pl-10 pr-4 py-2 w-full rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>
      </div>

      {/* Validators Table */}
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-md overflow-hidden mb-8">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-800">
              <tr>
                <th
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer"
                  onClick={() => requestSort("name")}
                >
                  Validator {renderSortIcon("name")}
                </th>
                <th
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer"
                  onClick={() => requestSort("status")}
                >
                  Status {renderSortIcon("status")}
                </th>
                <th
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer"
                  onClick={() => requestSort("stake")}
                >
                  Stake {renderSortIcon("stake")}
                </th>
                <th
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer"
                  onClick={() => requestSort("numNodes")}
                >
                  Nodes {renderSortIcon("numNodes")}
                </th>
                <th
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer"
                  onClick={() => requestSort("score")}
                >
                  Score {renderSortIcon("score")}
                </th>
                <th
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer"
                  onClick={() => requestSort("uptime")}
                >
                  Uptime {renderSortIcon("uptime")}
                </th>
                <th
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer"
                  onClick={() => requestSort("commission")}
                >
                  Commission {renderSortIcon("commission")}
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
              {filteredValidators.length === 0 ? (
                <tr>
                  <td
                    colSpan="7"
                    className="px-6 py-4 text-center text-sm text-gray-500 dark:text-gray-400"
                  >
                    No validators found matching your criteria
                  </td>
                </tr>
              ) : (
                filteredValidators.map((validator) => (
                  <tr
                    key={validator.id}
                    className="hover:bg-gray-50 dark:hover:bg-gray-800"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center">
                          <FaServer className="text-gray-500 dark:text-gray-400" />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                            {validator.name}
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
                            <span className="font-mono">
                              {shortenAddress(validator.address, 8)}
                            </span>
                            <button
                              onClick={() =>
                                copyToClipboard(validator.address, validator.id)
                              }
                              className="ml-2 text-primary hover:text-primary-dark"
                              title="Copy address"
                            >
                              {copySuccess === validator.id ? (
                                <FaCheck className="text-green-500" />
                              ) : (
                                <FaRegCopy />
                              )}
                            </button>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <FaCircle
                          className={`mr-2 text-xs ${getStatusClass(
                            validator.status
                          )}`}
                        />
                        <span className="capitalize">{validator.status}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {formatCrypto(validator.stake, 18, "REWA")}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-gray-900 dark:text-gray-100">
                        {validator.numNodes}
                      </span>
                      {validator.shards && validator.shards.length > 0 && (
                        <div className="flex mt-1 space-x-1">
                          {validator.shards.map((shard, i) => (
                            <span
                              key={i}
                              className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-200"
                            >
                              S{shard}
                            </span>
                          ))}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={
                          parseFloat(validator.score) > 95
                            ? "text-green-500"
                            : parseFloat(validator.score) > 90
                            ? "text-yellow-500"
                            : "text-red-500"
                        }
                      >
                        {validator.score}%
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={
                          parseFloat(validator.uptime) > 98
                            ? "text-green-500"
                            : parseFloat(validator.uptime) > 95
                            ? "text-yellow-500"
                            : "text-red-500"
                        }
                      >
                        {validator.uptime}%
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {validator.commission}%
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Information Card */}
      <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6">
        <div className="flex items-center mb-4">
          <FaInfoCircle className="text-primary mr-2" />
          <h2 className="text-lg font-semibold">About Validators</h2>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
          Validators are essential participants in the Dharitri network who
          secure the blockchain by running validator nodes. They are responsible
          for processing transactions, creating new blocks, and maintaining
          consensus across the network.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-md font-medium mb-2">Validator Requirements</h3>
            <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-400 space-y-1">
              <li>
                A minimum stake of 2,500 REWA is required to become a validator
              </li>
              <li>
                Validators must maintain high-performance servers with specific
                hardware requirements
              </li>
              <li>
                Technical knowledge is needed to properly set up and maintain
                validator nodes
              </li>
              <li>
                Validators earn rewards for their service, including transaction
                fees and block rewards
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-md font-medium mb-2">Validator Statuses</h3>
            <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-400 space-y-1">
              <li>
                <span className="text-green-500 font-medium">Active</span>:
                Currently validating transactions and producing blocks
              </li>
              <li>
                <span className="text-yellow-500 font-medium">Waiting</span>: In
                the queue to become active at the next epoch
              </li>
              <li>
                <span className="text-red-500 font-medium">Jailed</span>:
                Temporarily removed from the validator set due to poor
                performance
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Validators;
