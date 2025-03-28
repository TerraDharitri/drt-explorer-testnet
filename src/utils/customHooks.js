import { useState, useEffect, useCallback } from "react";

/**
 * Custom hook for fetching data with loading and error states
 * @param {Function} fetchFunction - The function to fetch data
 * @param {Array} dependencies - Dependencies array for useEffect
 * @returns {Object} Object containing data, loading state, error, and refetch function
 */
export const useFetch = (fetchFunction, dependencies = []) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const result = await fetchFunction();
      setData(result.data);
    } catch (err) {
      setError(err.message || "An error occurred");
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  }, [fetchFunction]);

  useEffect(() => {
    fetchData();
  }, [...dependencies, fetchData]);

  return { data, loading, error, refetch: fetchData };
};

/**
 * Custom hook for pagination
 * @param {number} initialPage - Initial page number
 * @param {number} initialLimit - Initial items per page
 * @returns {Object} Object containing pagination state and functions
 */
export const usePagination = (initialPage = 1, initialLimit = 20) => {
  const [page, setPage] = useState(initialPage);
  const [limit, setLimit] = useState(initialLimit);
  const [totalItems, setTotalItems] = useState(0);

  const totalPages = Math.ceil(totalItems / limit);

  const goToPage = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  const nextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  const prevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const changeLimit = (newLimit) => {
    setLimit(newLimit);
    // Reset to page 1 when changing limit
    setPage(1);
  };

  return {
    page,
    limit,
    totalItems,
    totalPages,
    setTotalItems,
    goToPage,
    nextPage,
    prevPage,
    changeLimit,
  };
};

/**
 * Custom hook for handling dark mode
 * @param {boolean} initialValue - Initial dark mode state
 * @returns {Array} Array containing dark mode state and toggle function
 */
export const useDarkMode = (initialValue = false) => {
  const [darkMode, setDarkMode] = useState(initialValue);

  useEffect(() => {
    // Check for user preference in localStorage
    const savedDarkMode = localStorage.getItem("darkMode") === "true";
    // Check for system preference if no saved preference
    const systemPrefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    setDarkMode(savedDarkMode ?? systemPrefersDark);
  }, []);

  useEffect(() => {
    // Update document class when darkMode changes
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    // Save preference to localStorage
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  return [darkMode, toggleDarkMode];
};

/**
 * Custom hook for handling window resize events
 * @returns {Object} Object containing window dimensions
 */
export const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    // Handler to call on window resize
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Call handler right away so state gets updated with initial window size
    handleResize();

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowSize;
};
