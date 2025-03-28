// Format address for display
export const formatAddress = (address, start = 6, end = 4) => {
  if (!address) return "";
  if (address.length <= start + end) return address;
  return `${address.slice(0, start)}...${address.slice(-end)}`;
};

// Format timestamp to local date/time
export const formatTimestamp = (timestamp) => {
  if (!timestamp) return "";

  const date = new Date(timestamp * 1000);
  return date.toLocaleString();
};

// Format timestamp to relative time (e.g., "2 mins ago")
export const formatRelativeTime = (timestamp) => {
  if (!timestamp) return "";

  const seconds = Math.floor((new Date() - new Date(timestamp * 1000)) / 1000);

  let interval = Math.floor(seconds / 31536000);
  if (interval >= 1) {
    return interval === 1 ? "1 year ago" : `${interval} years ago`;
  }

  interval = Math.floor(seconds / 2592000);
  if (interval >= 1) {
    return interval === 1 ? "1 month ago" : `${interval} months ago`;
  }

  interval = Math.floor(seconds / 86400);
  if (interval >= 1) {
    return interval === 1 ? "1 day ago" : `${interval} days ago`;
  }

  interval = Math.floor(seconds / 3600);
  if (interval >= 1) {
    return interval === 1 ? "1 hour ago" : `${interval} hours ago`;
  }

  interval = Math.floor(seconds / 60);
  if (interval >= 1) {
    return interval === 1 ? "1 minute ago" : `${interval} minutes ago`;
  }

  return seconds < 10 ? "just now" : `${seconds} seconds ago`;
};

// Format token amount with proper decimal places
export const formatTokenAmount = (amount, decimals = 18) => {
  if (amount === undefined || amount === null) return "0";

  // Convert from base units (like wei) to main units (like ETH)
  const value = Number(amount) / Math.pow(10, decimals);

  // Format based on the value size
  if (value === 0) return "0";
  if (value < 0.000001) return "<0.000001";
  if (value < 1) return value.toFixed(6);
  if (value < 10000)
    return value.toLocaleString(undefined, { maximumFractionDigits: 4 });

  return value.toLocaleString(undefined, { maximumFractionDigits: 2 });
};

// Format gas price (in wei) to Gwei
export const formatGasPrice = (gasPrice) => {
  if (!gasPrice) return "0";

  const gweiValue = Number(gasPrice) / 1e9;
  if (gweiValue < 0.01) return "<0.01 Gwei";

  return `${gweiValue.toFixed(2)} Gwei`;
};

/**
 * Format a number with thousand separators
 * @param {number} num - Number to format
 * @returns {string} Formatted number
 */
export const formatNumber = (num) => {
  if (num === null || num === undefined) return "--";

  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + "M";
  } else if (num >= 1000) {
    return (num / 1000).toFixed(1) + "K";
  } else {
    return num.toString();
  }
};

/**
 * Format a currency value
 * @param {number} value - Currency value to format
 * @param {string} symbol - Currency symbol (default: $)
 * @returns {string} Formatted currency
 */
export const formatCurrency = (value, symbol = "$") => {
  if (value === null || value === undefined) return "--";

  if (value >= 1000000000) {
    return symbol + (value / 1000000000).toFixed(2) + "B";
  } else if (value >= 1000000) {
    return symbol + (value / 1000000).toFixed(2) + "M";
  } else if (value >= 1000) {
    return symbol + (value / 1000).toFixed(2) + "K";
  } else {
    return symbol + value.toFixed(2);
  }
};

/**
 * Format cryptocurrency amount
 * @param {number|string|BigInt} value - Value to format
 * @param {number|string} decimals - Decimal places (default: 18)
 * @param {string} symbol - Cryptocurrency symbol (default: REWA)
 * @returns {string} Formatted cryptocurrency amount
 */
export const formatCrypto = (value, decimals = 18, symbol = "REWA") => {
  if (value === null || value === undefined) return "--";

  try {
    // Handle BigInt, string, or number input
    let numericValue;

    if (typeof value === "bigint") {
      // If it's already a BigInt
      numericValue = value;
    } else if (typeof value === "string" && value.length > 15) {
      // If it's a string that might be a large number
      try {
        numericValue = BigInt(value);
      } catch (e) {
        console.warn("Failed to convert string to BigInt:", e);
        return "Error";
      }
    } else {
      // Handle regular numbers or short strings
      numericValue = Number(value);
    }

    // For BigInt values
    if (typeof numericValue === "bigint") {
      const divisor = BigInt(10) ** BigInt(decimals);

      // Get the whole part
      const wholePart = numericValue / divisor;

      // Get decimal part (first 4 places)
      const remainder = numericValue % divisor;
      const decimalPlaces = 4; // Show up to 4 decimal places
      const decimalStr = remainder
        .toString()
        .padStart(Number(decimals), "0")
        .substring(0, decimalPlaces);

      // Format with comma separators
      const formattedWholePart = wholePart.toLocaleString();

      // Only show decimal if it's non-zero
      const formattedValue =
        decimalStr !== "0000"
          ? `${formattedWholePart}.${decimalStr}`
          : formattedWholePart;

      return `${formattedValue} ${symbol}`;
    }

    // For regular numbers
    const divisor = Math.pow(10, Number(decimals));
    const amount = numericValue / divisor;

    return (
      amount.toLocaleString(undefined, {
        maximumFractionDigits: 4,
      }) +
      " " +
      symbol
    );
  } catch (error) {
    console.error("Error formatting crypto value:", error);
    return `Error ${symbol}`;
  }
};

/**
 * Shorten a blockchain address
 * @param {string} address - Full address
 * @param {number} chars - Number of characters to show at each end (default: 6)
 * @returns {string} Shortened address
 */
export const shortenAddress = (address, chars = 6) => {
  if (!address) return "";
  if (address.length <= chars * 2) return address;

  return `${address.substring(0, chars)}...${address.substring(
    address.length - chars
  )}`;
};

/**
 * Format a date to a readable string
 * @param {Date|string|number} date - Date to format
 * @param {boolean} includeTime - Whether to include time (default: true)
 * @returns {string} Formatted date
 */
export const formatDate = (date, includeTime = true) => {
  if (!date) return "--";

  const d = new Date(date);
  if (isNaN(d.getTime())) return "--";

  const options = {
    year: "numeric",
    month: "short",
    day: "numeric",
    ...(includeTime && { hour: "2-digit", minute: "2-digit" }),
  };

  return d.toLocaleDateString(undefined, options);
};

/**
 * Format time elapsed since a given date
 * @param {Date|string|number} date - Date to calculate from
 * @returns {string} Human-readable time elapsed
 */
export const timeAgo = (date) => {
  if (!date) return "--";

  const d = new Date(date);
  if (isNaN(d.getTime())) return "--";

  const now = new Date();
  const diffInSeconds = Math.floor((now - d) / 1000);

  if (diffInSeconds < 60) {
    return diffInSeconds + " seconds ago";
  }

  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return diffInMinutes + " minutes ago";
  }

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return diffInHours + " hours ago";
  }

  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 30) {
    return diffInDays + " days ago";
  }

  const diffInMonths = Math.floor(diffInDays / 30);
  if (diffInMonths < 12) {
    return diffInMonths + " months ago";
  }

  const diffInYears = Math.floor(diffInMonths / 12);
  return diffInYears + " years ago";
};

/**
 * Format a percentage
 * @param {number} value - Percentage value
 * @param {number} decimals - Number of decimal places (default: 2)
 * @returns {string} Formatted percentage
 */
export const formatPercent = (value, decimals = 2) => {
  if (value === null || value === undefined) return "--";

  return value.toFixed(decimals) + "%";
};

/**
 * Format file size
 * @param {number} bytes - Size in bytes
 * @returns {string} Formatted file size
 */
export const formatFileSize = (bytes) => {
  if (bytes === 0) return "0 Bytes";
  if (!bytes) return "--";

  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
};

/**
 * Format a hash for display
 * @param {string} hash - Full hash
 * @param {number} chars - Characters to show (default: 8)
 * @returns {string} Shortened hash
 */
export const formatHash = (hash, chars = 8) => {
  return shortenAddress(hash, chars);
};

// Format transaction hash
export const formatTxHash = (hash, start = 8, end = 8) => {
  return formatAddress(hash, start, end);
};

// Get transaction status class
export const getStatusClass = (status) => {
  if (!status) return "bg-gray-100 text-gray-800";

  const statusMap = {
    success: "bg-green-100 text-green-800",
    pending: "bg-yellow-100 text-yellow-800",
    failed: "bg-red-100 text-red-800",
    invalid: "bg-red-100 text-red-800",
    executed: "bg-green-100 text-green-800",
  };

  return statusMap[status.toLowerCase()] || "bg-gray-100 text-gray-800";
};

// Format percentage change
export const formatPercentChange = (value) => {
  if (value === undefined || value === null) return "";

  const formatted = Number(value).toFixed(2);
  return value >= 0 ? `+${formatted}%` : `${formatted}%`;
};
