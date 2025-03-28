import axios from "axios";

// Base API URL - configured via environment variables with fallback
const BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "https://api.dharitri.org/v1";

// Create axios instance with default config
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Enable mock data only in development mode
const ENABLE_MOCK =
  import.meta.env.VITE_ENABLE_MOCK === "true" || import.meta.env.DEV;
const MOCK_DELAY = import.meta.env.DEV ? 800 : 0;

// Mock data for development
const mockData = {
  // Network stats
  networkStats: {
    price: 0.25,
    marketCap: 250000000,
    circulatingSupply: 1000000000,
    totalTransactions: 58749283,
    averageBlockTime: 6.2,
    currentEpoch: 721,
    totalAccounts: 742935,
    activeValidators: 10,
  },

  // Latest transactions
  latestTransactions: Array(20)
    .fill(0)
    .map((_, i) => ({
      hash: `0x${Math.random().toString(16).substr(2, 64)}`,
      from: `0x${Math.random().toString(16).substr(2, 40)}`,
      to: `0x${Math.random().toString(16).substr(2, 40)}`,
      value: Math.random() * 100,
      fee: Math.random() * 0.01,
      timestamp: Math.floor(Date.now() / 1000) - i * 60,
      status:
        Math.random() > 0.1
          ? "success"
          : Math.random() > 0.5
          ? "pending"
          : "failed",
    })),

  // Latest blocks
  latestBlocks: Array(20)
    .fill(0)
    .map((_, i) => ({
      number: 5000000 - i,
      hash: `0x${Math.random().toString(16).substr(2, 64)}`,
      timestamp: Math.floor(Date.now() / 1000) - i * 6,
      transactions: Math.floor(Math.random() * 50),
      gasUsed: Math.floor(Math.random() * 8000000),
      validator: `0x${Math.random().toString(16).substr(2, 40)}`,
    })),

  // Validators
  validators: Array(10)
    .fill(0)
    .map((_, i) => ({
      address: `0x${Math.random().toString(16).substr(2, 40)}`,
      name: `Validator ${i + 1}`,
      stake: Math.random() * 1000000 + 500000,
      nodes: Math.floor(Math.random() * 5) + 1,
      distribution: Math.random() * 0.1 + 0.05,
      delegators: Math.floor(Math.random() * 1000) + 100,
      uptime: 0.99 + Math.random() * 0.01,
      produced: Math.floor(Math.random() * 10000) + 5000,
    })),

  // Top tokens
  tokens: Array(10)
    .fill(0)
    .map((_, i) => ({
      id: `TKN-${Math.random().toString(36).substr(2, 6)}`,
      name: `Token ${i + 1}`,
      symbol: `TKN${i + 1}`,
      price: Math.random() * 10,
      change24h: Math.random() * 10 - 5,
      volume24h: Math.random() * 1000000,
      marketCap: Math.random() * 10000000,
      holders: Math.floor(Math.random() * 10000),
    })),
};

// Helper for simulating API delay and responses
const mockResponse = (data) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ data });
    }, MOCK_DELAY);
  });
};

// API service methods
const apiService = {
  // Network stats
  getStats: async () => {
    if (ENABLE_MOCK) {
      return mockResponse(mockData.networkStats);
    }
    return api.get("/stats");
  },

  // Transactions
  getTransactions: async (page = 1, size = 25) => {
    if (ENABLE_MOCK) {
      return mockResponse({
        data: {
          transactions: mockData.latestTransactions.slice(
            (page - 1) * size,
            page * size
          ),
          pagination: {
            totalCount: mockData.latestTransactions.length,
            totalPages: Math.ceil(mockData.latestTransactions.length / size),
            currentPage: page,
            itemsPerPage: size,
          },
        },
      });
    }
    return api.get("/transactions", { params: { page, size } });
  },

  // Blocks
  getBlocks: async (page = 1, size = 25) => {
    if (ENABLE_MOCK) {
      return mockResponse({
        data: {
          blocks: mockData.latestBlocks.slice((page - 1) * size, page * size),
          totalCount: mockData.latestBlocks.length,
          pagination: {
            totalPages: Math.ceil(mockData.latestBlocks.length / size),
            currentPage: page,
            itemsPerPage: size,
          },
        },
      });
    }
    return api.get("/blocks", { params: { page, size } });
  },

  getLatestTransactions: async (page = 1, size = 25) => {
    if (ENABLE_MOCK) {
      return mockResponse({
        data: mockData.latestTransactions.slice(0, size),
        pagination: {
          totalItems: 58749283,
          totalPages: Math.ceil(58749283 / size),
          currentPage: page,
          itemsPerPage: size,
        },
      });
    }
    return api.get("/transactions", { params: { page, size } });
  },

  getTransaction: async (hash) => {
    if (ENABLE_MOCK) {
      const tx = {
        ...mockData.latestTransactions[0],
        hash,
        gasLimit: Math.floor(Math.random() * 100000),
        gasPrice: Math.floor(Math.random() * 1000000000),
        nonce: Math.floor(Math.random() * 1000),
        data: Math.random() > 0.5 ? "transfer@1234" : "",
        block: 5000000 - Math.floor(Math.random() * 100),
      };
      return mockResponse(tx);
    }
    return api.get(`/transactions/${hash}`);
  },

  // Blocks
  getLatestBlocks: async (page = 1, size = 25) => {
    if (ENABLE_MOCK) {
      return mockResponse({
        data: mockData.latestBlocks.slice(0, size),
        pagination: {
          totalItems: 5000000,
          totalPages: Math.ceil(5000000 / size),
          currentPage: page,
          itemsPerPage: size,
        },
      });
    }
    return api.get("/blocks", { params: { page, size } });
  },

  getBlock: async (hashOrNumber) => {
    if (ENABLE_MOCK) {
      const blockNumber = /^\d+$/.test(hashOrNumber)
        ? parseInt(hashOrNumber)
        : 5000000 - Math.floor(Math.random() * 100);

      const block = {
        ...mockData.latestBlocks[0],
        hash: /^\d+$/.test(hashOrNumber)
          ? `0x${Math.random().toString(16).substr(2, 64)}`
          : hashOrNumber,
        nonce: blockNumber,
        timestamp:
          Math.floor(Date.now() / 1000) - Math.floor(Math.random() * 86400),
        txCount: Math.floor(Math.random() * 50),
        size: Math.floor(Math.random() * 1000000) + 500000,
        gasUsed: Math.floor(Math.random() * 8000000),
        gasLimit: 10000000,
        validator: `0x${Math.random().toString(16).substr(2, 40)}`,
        validatorName: "Validator " + Math.floor(Math.random() * 10 + 1),
        reward: Math.random() * 2,
        transactions: Array(Math.floor(Math.random() * 10) + 1)
          .fill(0)
          .map(() => ({
            hash: `0x${Math.random().toString(16).substr(2, 64)}`,
            from: `0x${Math.random().toString(16).substr(2, 40)}`,
            to: `0x${Math.random().toString(16).substr(2, 40)}`,
            value: Math.random() * 100,
            fee: Math.random() * 0.01,
            timestamp:
              Math.floor(Date.now() / 1000) - Math.floor(Math.random() * 3600),
            status:
              Math.random() > 0.1
                ? "success"
                : Math.random() > 0.5
                ? "pending"
                : "failed",
          })),
      };
      return mockResponse(block);
    }
    return api.get(`/blocks/${hashOrNumber}`);
  },

  // Accounts/Addresses
  getAccount: async (address) => {
    if (ENABLE_MOCK) {
      const account = {
        address,
        balance: Math.random() * 10000,
        nonce: Math.floor(Math.random() * 100),
        shard: Math.floor(Math.random() * 3),
        txCount: Math.floor(Math.random() * 1000),
        scrCount: Math.floor(Math.random() * 10),
        isSmartContract: Math.random() > 0.7,
        assets: Array(Math.floor(Math.random() * 5))
          .fill(0)
          .map((_, i) => ({
            identifier: `TKN-${Math.random().toString(36).substr(2, 6)}`,
            name: `Token ${i + 1}`,
            balance: Math.random() * 1000,
            decimals: 18,
            price: Math.random() * 10,
          })),
      };
      return mockResponse(account);
    }
    return api.get(`/accounts/${address}`);
  },

  getAccountTransactions: async (address, page = 1, size = 10) => {
    if (ENABLE_MOCK) {
      const transactions = Array(size)
        .fill(0)
        .map(() => ({
          hash: `0x${Math.random().toString(16).substr(2, 64)}`,
          from:
            Math.random() > 0.5
              ? address
              : `0x${Math.random().toString(16).substr(2, 40)}`,
          to:
            Math.random() > 0.5
              ? address
              : `0x${Math.random().toString(16).substr(2, 40)}`,
          value: Math.random() * 100,
          fee: Math.random() * 0.01,
          timestamp:
            Math.floor(Date.now() / 1000) -
            Math.floor(Math.random() * 86400 * 30),
          status:
            Math.random() > 0.1
              ? "success"
              : Math.random() > 0.5
              ? "pending"
              : "failed",
        }));

      return mockResponse({
        data: transactions,
        pagination: {
          totalCount: 100,
          totalPages: 10,
          currentPage: page,
          itemsPerPage: size,
        },
      });
    }
    return api.get(`/accounts/${address}/transactions`, {
      params: { page, size },
    });
  },

  // Validators
  getValidators: async () => {
    if (ENABLE_MOCK) {
      return mockResponse(mockData.validators);
    }
    return api.get("/validators");
  },

  getValidator: async (address) => {
    if (ENABLE_MOCK) {
      const validator = {
        ...mockData.validators[0],
        address,
      };
      return mockResponse(validator);
    }
    return api.get(`/validators/${address}`);
  },

  // Tokens
  getTokens: async (page = 1, size = 25) => {
    if (ENABLE_MOCK) {
      return mockResponse({
        data: mockData.tokens.slice(0, size),
        pagination: {
          totalItems: mockData.tokens.length,
          totalPages: Math.ceil(mockData.tokens.length / size),
          currentPage: page,
          itemsPerPage: size,
        },
      });
    }
    return api.get("/tokens", { params: { page, size } });
  },

  getToken: async (id) => {
    if (ENABLE_MOCK) {
      const token = {
        ...mockData.tokens[0],
        id,
        transactions: Math.floor(Math.random() * 100000),
        accounts: Math.floor(Math.random() * 10000),
        transfers: Math.floor(Math.random() * 50000),
        owner: `0x${Math.random().toString(16).substr(2, 40)}`,
        totalSupply: Math.random() * 1000000000,
      };
      return mockResponse(token);
    }
    return api.get(`/tokens/${id}`);
  },

  // Search
  search: async (query) => {
    if (ENABLE_MOCK) {
      // Simulate different types of search results
      if (query.startsWith("0x") && query.length > 60) {
        return mockResponse({ type: "transaction", data: { hash: query } });
      } else if (query.startsWith("0x")) {
        return mockResponse({ type: "account", data: { address: query } });
      } else if (!isNaN(query)) {
        return mockResponse({
          type: "block",
          data: { number: parseInt(query) },
        });
      } else {
        return mockResponse({
          type: "token",
          data: mockData.tokens.find(
            (t) => t.name.includes(query) || t.symbol.includes(query)
          ),
        });
      }
    }
    return api.get("/search", { params: { query } });
  },
};

export default apiService;
