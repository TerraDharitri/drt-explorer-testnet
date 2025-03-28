import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FaSearch,
  FaSortAmountDown,
  FaSortAmountUp,
  FaExternalLinkAlt,
  FaInfoCircle,
} from "react-icons/fa";
import {
  formatNumber,
  formatCurrency,
  shortenAddress,
} from "../utils/formatters";

const Accounts = () => {
  const [accounts, setAccounts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortField, setSortField] = useState("balance");
  const [sortDirection, setSortDirection] = useState("desc");
  const pageSize = 10;

  // Mock accounts data
  const mockAccounts = [
    {
      address:
        "erd1qqqqqqqqqqqqqqqpqqqqqqqqqqqqqqqqqqqqqqqqqqqqqz8llllls7a6h85",
      balance: 12780000000000000000,
      txCount: 0,
      shard: 0,
      type: "Smart Contract",
      username: "dharitri.io",
      isVerified: true,
    },
    {
      address: "erd1qqqqqqqqqqqqqqqpqqqqqqqqqqqqqqqqqqqqqqqqqqqqqfhllllsp5g4ey",
      balance: 8650000000000000000,
      txCount: 0,
      shard: 1,
      type: "Smart Contract",
      username: "staking.dharitri.io",
      isVerified: true,
    },
    {
      address: "erd1qqqqqqqqqqqqqqqpqqqqqqqqqqqqqqqqqqqqqqqqqqqqqtllllls062et4",
      balance: 6450000000000000000,
      txCount: 0,
      shard: 2,
      type: "Smart Contract",
      username: "bridge.dharitri.io",
      isVerified: true,
    },
    {
      address: "erd1932v4kxmjk48p5wnvsfk639q5jlhhrz4wsfwlqmkaroqfuuys4astyc0kl",
      balance: 3240000000000000000,
      txCount: 458,
      shard: 0,
      type: "Wallet",
      username: "alice.dharitri",
      isVerified: false,
    },
    {
      address: "erd18s6a06ktr2v6fvlv5yfxdqnsdmazrvsxwdq7vzxsd7h5pxjkh40qv3xuk5",
      balance: 2970000000000000000,
      txCount: 312,
      shard: 1,
      type: "Wallet",
      username: "bob.dharitri",
      isVerified: false,
    },
    {
      address: "erd1k7j6ewjsla4zsgv8v6f6fe3dvrkgv3d0j3tzgemw6sfk3m5z0ntqgqj9e9",
      balance: 2680000000000000000,
      txCount: 128,
      shard: 2,
      type: "Wallet",
      username: "",
      isVerified: false,
    },
    {
      address: "erd1ff7n4mq5cjh8zxmd6a5vye3qj2rdafg3eflkwvs6ltxae6wycvys9ydchu",
      balance: 2450000000000000000,
      txCount: 276,
      shard: 0,
      type: "Wallet",
      username: "charlie.dharitri",
      isVerified: false,
    },
    {
      address: "erd1c8wvrxlj9a9l8rw4wpyasl9kxf7zfx3adq5c3m5g8g3zmk6ndfjqhr3frj",
      balance: 2180000000000000000,
      txCount: 192,
      shard: 1,
      type: "Wallet",
      username: "",
      isVerified: false,
    },
    {
      address: "erd15xdla6k7lfxc3mgl5u46a63a5sydf8mw2n0wvdrphcpkuknlgyuqmc0xw6",
      balance: 1970000000000000000,
      txCount: 88,
      shard: 2,
      type: "Wallet",
      username: "dave.dharitri",
      isVerified: false,
    },
    {
      address: "erd1qqqqqqqqqqqqqpgq53thnw99v3ssfdd84eg5jrrxhzmkfp8g2jpsgk0hzn",
      balance: 1860000000000000000,
      txCount: 0,
      shard: 0,
      type: "Smart Contract",
      username: "exchange.dharitri.io",
      isVerified: true,
    },
    {
      address: "erd1qqqqqqqqqqqqqpgqrc4pg2xarca9z34njcxeur622qmfj20gerpsk6nsws",
      balance: 1750000000000000000,
      txCount: 0,
      shard: 1,
      type: "Smart Contract",
      username: "nft.dharitri.io",
      isVerified: true,
    },
    {
      address: "erd1wh2rz67zlq5nea7j0jdktvjr3atsehlf8l96p7xfj7fhupzaw3xscllhvj",
      balance: 1680000000000000000,
      txCount: 156,
      shard: 2,
      type: "Wallet",
      username: "eve.dharitri",
      isVerified: false,
    },
    {
      address: "erd1tfs0pn0hgkwfxj5d4ze0h3qrz9v3ua3tlj948p0acuylzqj8z9vqeaxdmw",
      balance: 1570000000000000000,
      txCount: 134,
      shard: 0,
      type: "Wallet",
      username: "",
      isVerified: false,
    },
    {
      address: "erd1g98qmpk702jxkkmueusqvgwvp3r9pdz62rdpwqzk9k8rjeggvc7qm730va",
      balance: 1450000000000000000,
      txCount: 122,
      shard: 1,
      type: "Wallet",
      username: "frank.dharitri",
      isVerified: false,
    },
    {
      address: "erd1mv5zea4fxtg2s6ahn5mqzqwg46q5lmjgse8qm5hcjk0vaemmdj9qv7z2j3",
      balance: 1340000000000000000,
      txCount: 98,
      shard: 2,
      type: "Wallet",
      username: "",
      isVerified: false,
    },
  ];

  useEffect(() => {
    const fetchAccounts = async () => {
      setIsLoading(true);
      setError(null);
      try {
        // In a real app, we'd fetch from API
        // const response = await apiService.getAccounts(currentPage, pageSize, sortField, sortDirection);

        // For demo, filter and sort mock data
        let filteredAccounts = [...mockAccounts];

        // Apply search filter if present
        if (searchQuery.trim() !== "") {
          const query = searchQuery.toLowerCase();
          filteredAccounts = filteredAccounts.filter(
            (account) =>
              account.address.toLowerCase().includes(query) ||
              (account.username &&
                account.username.toLowerCase().includes(query))
          );
        }

        // Sort the accounts
        filteredAccounts.sort((a, b) => {
          let valueA, valueB;

          switch (sortField) {
            case "address":
              valueA = a.address;
              valueB = b.address;
              break;
            case "username":
              valueA = a.username || "";
              valueB = b.username || "";
              break;
            case "txCount":
              valueA = a.txCount;
              valueB = b.txCount;
              break;
            case "shard":
              valueA = a.shard;
              valueB = b.shard;
              break;
            default:
              valueA = a.balance;
              valueB = b.balance;
          }

          if (typeof valueA === "string") {
            const compareResult = valueA.localeCompare(valueB);
            return sortDirection === "asc" ? compareResult : -compareResult;
          } else {
            return sortDirection === "asc" ? valueA - valueB : valueB - valueA;
          }
        });

        // Paginate the accounts
        const start = (currentPage - 1) * pageSize;
        const end = start + pageSize;
        const paginatedAccounts = filteredAccounts.slice(start, end);

        // Set state
        setAccounts(paginatedAccounts);
        setTotalPages(Math.ceil(filteredAccounts.length / pageSize));

        // Simulate API delay
        setTimeout(() => {
          setIsLoading(false);
        }, 600);
      } catch (err) {
        setError("Failed to fetch accounts");
        console.error(err);
        setIsLoading(false);
      }
    };

    fetchAccounts();
  }, [currentPage, searchQuery, sortField, sortDirection]);

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
    setCurrentPage(1); // Reset to first page on new search
    // The actual search logic is in the useEffect
  };

  const formatREWA = (amount) => {
    // 1 REWA = 10^18 smallest unit
    const rewa = Number(amount) / Math.pow(10, 18);
    return (
      rewa.toLocaleString(undefined, { maximumFractionDigits: 4 }) + " REWA"
    );
  };

  const renderSortIcon = (field) => {
    if (sortField !== field) return null;
    return sortDirection === "asc" ? (
      <FaSortAmountUp className="ml-1 inline" />
    ) : (
      <FaSortAmountDown className="ml-1 inline" />
    );
  };

  const renderPagination = () => {
    return (
      <div className="flex items-center justify-center mt-8 space-x-2">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
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
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
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
        <h1 className="text-2xl font-bold mb-6">Accounts</h1>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Accounts</h1>
        <div className="bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400 p-4 rounded-lg">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <h1 className="text-2xl font-bold">Accounts</h1>
        <form
          onSubmit={handleSearch}
          className="mt-4 md:mt-0 relative w-full md:w-auto"
        >
          <input
            type="text"
            placeholder="Search by address or username..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-4 py-2 w-full md:w-80 rounded-lg bg-gray-100 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <FaSearch className="absolute left-3 top-3 text-gray-400" />
        </form>
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-800">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort("address")}
                >
                  Address {renderSortIcon("address")}
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort("balance")}
                >
                  Balance {renderSortIcon("balance")}
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort("txCount")}
                >
                  Transactions {renderSortIcon("txCount")}
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort("shard")}
                >
                  Shard {renderSortIcon("shard")}
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                >
                  Type
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-800">
              {accounts.map((account) => (
                <tr
                  key={account.address}
                  className="hover:bg-gray-50 dark:hover:bg-gray-800"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <Link
                        to={`/account/${account.address}`}
                        className="text-primary hover:underline"
                      >
                        {shortenAddress(account.address, 12)}
                      </Link>
                      {account.isVerified && (
                        <span className="ml-2 px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400">
                          Verified
                        </span>
                      )}
                    </div>
                    {account.username && (
                      <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        {account.username}
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium">
                      {formatREWA(account.balance)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    {formatNumber(account.txCount)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400">
                      {account.shard}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span
                      className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        account.type === "Smart Contract"
                          ? "bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400"
                          : "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
                      }`}
                    >
                      {account.type}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {renderPagination()}

      <div className="mt-8 bg-gray-50 dark:bg-gray-800 rounded-xl p-6">
        <div className="flex items-center mb-4">
          <FaInfoCircle className="text-primary mr-2" />
          <h2 className="text-lg font-semibold">About Accounts</h2>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
          An account is an entity on the Dharitri blockchain with a unique
          address. Accounts can store REWA (the native token), other tokens, and
          data. Each account has a balance and a nonce (transaction count).
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-md font-medium mb-3">What is an Account?</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              An account is an entity on the Dharitri blockchain with a unique
              address that can send and receive transactions. Accounts can be of
              two types: user wallets and smart contracts. Each account has its
              own balance and state.
            </p>
          </div>
          <div>
            <h3 className="text-md font-medium mb-3">Account Types</h3>
            <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-400 space-y-2">
              <li>
                <span className="font-medium">Wallet</span>: Regular user
                account, controlled by a private key
              </li>
              <li>
                <span className="font-medium">Smart Contract</span>:
                Programmatic account that executes code on the blockchain
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Accounts;
