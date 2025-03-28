// API endpoints
export const API_BASE_URL = "https://api.dharitri.com";

// Pagination defaults
export const DEFAULT_PAGE_SIZE = 20;
export const PAGE_SIZE_OPTIONS = [10, 20, 50, 100];

// Transaction types
export const TRANSACTION_TYPES = {
  TRANSFER: "transfer",
  SMART_CONTRACT: "smartContract",
  STAKING: "staking",
  UNSTAKING: "unstaking",
  CLAIM_REWARDS: "claimRewards",
  DELEGATE: "delegate",
  UNDELEGATE: "undelegate",
  ISSUE_TOKEN: "issueToken",
  MINT_TOKEN: "mintToken",
  BURN_TOKEN: "burnToken",
  FREEZE_TOKEN: "freezeToken",
  UNFREEZE_TOKEN: "unfreezeToken",
  WIPE_TOKEN: "wipeToken",
  PAUSE_TOKEN: "pauseToken",
  UNPAUSE_TOKEN: "unpauseToken",
  SET_SPECIAL_ROLE: "setSpecialRole",
  UNSET_SPECIAL_ROLE: "unsetSpecialRole",
  MULTI_TRANSFER: "multiTransfer",
  RELAYED_TX: "relayedTx",
  SCRESULT: "scResult",
  REWARD: "reward",
  INVALID: "invalid",
  OTHER: "other",
};

// Transaction statuses
export const TRANSACTION_STATUS = {
  SUCCESS: "success",
  PENDING: "pending",
  FAILED: "failed",
  INVALID: "invalid",
};

// Block statuses
export const BLOCK_STATUS = {
  FINAL: "final",
  PROPOSED: "proposed",
  NOTARIZED: "notarized",
  PENDING: "pending",
};

// Validator statuses
export const VALIDATOR_STATUS = {
  ELIGIBLE: "eligible",
  WAITING: "waiting",
  JAILED: "jailed",
  INACTIVE: "inactive",
};

// Chart colors
export const CHART_COLORS = {
  primary: "#00b2ad",
  secondary: "#00d4aa",
  accent: "#f7931a",
  success: "#10b981",
  warning: "#f59e0b",
  danger: "#ef4444",
  info: "#3b82f6",
  gray: "#6b7280",
};

// Time periods for statistics
export const TIME_PERIODS = {
  DAY: "24h",
  WEEK: "7d",
  MONTH: "30d",
  YEAR: "1y",
  ALL: "all",
};

// Social media links
export const SOCIAL_LINKS = {
  TWITTER: "https://twitter.com/dharitri",
  GITHUB: "https://github.com/TerraDharitri",
  TELEGRAM: "https://t.me/dharitri",
  DISCORD: "https://discord.gg/dharitri",
  WEBSITE: "https://dharitri.org",
  DOCS: "https://docs.dharitri.com",
  BLOG: "https://dharitri.com/blog",
};
