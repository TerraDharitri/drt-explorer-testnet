import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  MagnifyingGlassIcon,
  XMarkIcon,
  Bars3Icon,
  SunIcon,
  MoonIcon,
  ComputerDesktopIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";
import { useTheme } from "../../context/ThemeContext";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isNetworkOpen, setIsNetworkOpen] = useState(false);
  const [isThemeOpen, setIsThemeOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();

  // Check if the path is active
  const isActive = (path) => {
    return (
      location.pathname === path || location.pathname.startsWith(path + "/")
    );
  };

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Close the network dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isNetworkOpen && !event.target.closest("#network-dropdown")) {
        setIsNetworkOpen(false);
      }
      if (isThemeOpen && !event.target.closest("#theme-dropdown")) {
        setIsThemeOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isNetworkOpen, isThemeOpen]);

  const handleSearch = (e) => {
    e.preventDefault();

    if (!searchQuery.trim()) return;

    const query = searchQuery.trim();

    // Handle different search types based on query format
    if (query.startsWith("0x") && query.length > 40) {
      // Transaction hash
      navigate(`/transaction/${query}`);
    } else if (query.startsWith("0x")) {
      // Account address
      navigate(`/account/${query}`);
    } else if (!isNaN(query)) {
      // Block number
      navigate(`/block/${query}`);
    } else {
      // Token name or other search
      navigate(`/search?q=${encodeURIComponent(query)}`);
    }

    setSearchQuery("");
  };

  const ThemeIcon = () => {
    if (theme === "light") return <SunIcon className="h-5 w-5" />;
    if (theme === "dim") return <ComputerDesktopIcon className="h-5 w-5" />;
    if (theme === "dark") return <MoonIcon className="h-5 w-5" />;
    return <ComputerDesktopIcon className="h-5 w-5" />;
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/90 dark:bg-black/90 backdrop-blur-md shadow-md"
          : "bg-white dark:bg-black"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <img
              src="./drt-logo.png"
              alt="Dharitri Explorer"
              className="h-8 w-auto"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src =
                  'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="%2310b981" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg>';
              }}
            />
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-secondary text-transparent bg-clip-text">
              Explorer
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            <Link
              to="/"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                isActive("/")
                  ? "text-primary"
                  : "text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary"
              }`}
            >
              Dashboard
            </Link>
            <Link
              to="/blocks"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                isActive("/blocks")
                  ? "text-primary"
                  : "text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary"
              }`}
            >
              Blocks
            </Link>
            <Link
              to="/transactions"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                isActive("/transactions")
                  ? "text-primary"
                  : "text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary"
              }`}
            >
              Transactions
            </Link>
            <Link
              to="/accounts"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                isActive("/accounts")
                  ? "text-primary"
                  : "text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary"
              }`}
            >
              Accounts
            </Link>
            <Link
              to="/apps"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                isActive("/apps")
                  ? "text-primary"
                  : "text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary"
              }`}
            >
              Apps
            </Link>
            <Link
              to="/tokens"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                isActive("/tokens")
                  ? "text-primary"
                  : "text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary"
              }`}
            >
              Tokens
            </Link>
            <Link
              to="/nfts"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                isActive("/nfts")
                  ? "text-primary"
                  : "text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary"
              }`}
            >
              NFTs
            </Link>
            <Link
              to="/validators"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                isActive("/validators")
                  ? "text-primary"
                  : "text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary"
              }`}
            >
              Validators
            </Link>
            <Link
              to="/statistics"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                isActive("/statistics")
                  ? "text-primary"
                  : "text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary"
              }`}
            >
              Statistics
            </Link>
            <Link
              to="/analytics"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                isActive("/analytics")
                  ? "text-primary"
                  : "text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary"
              }`}
            >
              Analytics
            </Link>
          </div>

          {/* Desktop Search Bar & Theme Toggle & Network Selector */}
          <div className="hidden md:flex items-center gap-3">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                placeholder="Search by Address / Txn Hash / Block / Token"
                className="w-72 py-2 pl-10 pr-4 rounded-full bg-gray-100 dark:bg-black text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button
                type="submit"
                className="absolute inset-y-0 left-0 pl-3 flex items-center"
              >
                <MagnifyingGlassIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
              </button>
            </form>

            {/* Network Selector */}
            <div className="relative" id="network-dropdown">
              <button
                onClick={() => setIsNetworkOpen(!isNetworkOpen)}
                className="flex items-center px-3 py-2 rounded-full bg-gray-100 dark:bg-black text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-900"
              >
                <span className="flex items-center">
                  <span className="h-2 w-2 rounded-full bg-green-500 mr-2"></span>
                  Mainnet
                </span>
                <ChevronDownIcon className="h-4 w-4 ml-2" />
              </button>

              {isNetworkOpen && (
                <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white dark:bg-black ring-1 ring-black ring-opacity-5">
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-900"
                  >
                    <span className="flex items-center">
                      <span className="h-2 w-2 rounded-full bg-green-500 mr-2"></span>
                      Mainnet
                    </span>
                  </a>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-900"
                  >
                    <span className="flex items-center">
                      <span className="h-2 w-2 rounded-full bg-purple-500 mr-2"></span>
                      Testnet
                    </span>
                  </a>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-900"
                  >
                    <span className="flex items-center">
                      <span className="h-2 w-2 rounded-full bg-blue-500 mr-2"></span>
                      Devnet
                    </span>
                  </a>
                </div>
              )}
            </div>

            {/* Theme Selector Dropdown */}
            <div className="relative" id="theme-dropdown">
              <button
                onClick={() => setIsThemeOpen(!isThemeOpen)}
                className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-900 transition-colors"
                aria-label="Toggle theme"
              >
                <ThemeIcon />
              </button>

              {isThemeOpen && (
                <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg py-2 bg-white dark:bg-black ring-1 ring-black ring-opacity-5 z-50 border border-gray-200 dark:border-gray-800">
                  <div className="px-3 py-1 text-xs text-gray-500 dark:text-gray-400 uppercase font-semibold">
                    Appearance
                  </div>
                  <button
                    onClick={() => {
                      toggleTheme("light");
                      setIsThemeOpen(false);
                    }}
                    className={`w-full text-left block px-4 py-2 text-sm ${
                      theme === "light"
                        ? "text-primary font-medium"
                        : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-900"
                    }`}
                  >
                    <span className="flex items-center">
                      <SunIcon className="h-4 w-4 mr-3" />
                      Light
                      {theme === "light" && (
                        <span className="ml-auto">
                          <svg
                            className="h-4 w-4 text-primary"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </span>
                      )}
                    </span>
                  </button>
                  <button
                    onClick={() => {
                      toggleTheme("dim");
                      setIsThemeOpen(false);
                    }}
                    className={`w-full text-left block px-4 py-2 text-sm ${
                      theme === "dim"
                        ? "text-primary font-medium"
                        : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-900"
                    }`}
                  >
                    <span className="flex items-center">
                      <ComputerDesktopIcon className="h-4 w-4 mr-3" />
                      Dim
                      {theme === "dim" && (
                        <span className="ml-auto">
                          <svg
                            className="h-4 w-4 text-primary"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </span>
                      )}
                    </span>
                  </button>
                  <button
                    onClick={() => {
                      toggleTheme("dark");
                      setIsThemeOpen(false);
                    }}
                    className={`w-full text-left block px-4 py-2 text-sm ${
                      theme === "dark"
                        ? "text-primary font-medium"
                        : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-900"
                    }`}
                  >
                    <span className="flex items-center">
                      <MoonIcon className="h-4 w-4 mr-3" />
                      Dark
                      {theme === "dark" && (
                        <span className="ml-auto">
                          <svg
                            className="h-4 w-4 text-primary"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </span>
                      )}
                    </span>
                  </button>
                  <div className="border-t border-gray-200 dark:border-gray-800 my-1"></div>
                  <button
                    onClick={() => setIsThemeOpen(false)}
                    className="w-full text-left block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-900"
                  >
                    <span className="flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 mr-3"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                      Site Settings
                    </span>
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            {/* Theme Selector for Mobile */}
            <div className="relative" id="mobile-theme-dropdown">
              <button
                onClick={() => setIsThemeOpen(!isThemeOpen)}
                className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
                aria-label="Toggle theme"
              >
                <ThemeIcon />
              </button>

              {isThemeOpen && (
                <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg py-2 bg-white dark:bg-black ring-1 ring-black ring-opacity-5 z-50">
                  <div className="px-3 py-1 text-xs text-gray-500 dark:text-gray-400 uppercase font-semibold">
                    Appearance
                  </div>
                  <button
                    onClick={() => {
                      toggleTheme("light");
                      setIsThemeOpen(false);
                    }}
                    className={`w-full text-left block px-4 py-2 text-sm ${
                      theme === "light"
                        ? "text-primary font-medium"
                        : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-900"
                    }`}
                  >
                    <span className="flex items-center">
                      <SunIcon className="h-4 w-4 mr-3" />
                      Light
                      {theme === "light" && (
                        <span className="ml-auto">
                          <svg
                            className="h-4 w-4 text-primary"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </span>
                      )}
                    </span>
                  </button>
                  <button
                    onClick={() => {
                      toggleTheme("dim");
                      setIsThemeOpen(false);
                    }}
                    className={`w-full text-left block px-4 py-2 text-sm ${
                      theme === "dim"
                        ? "text-primary font-medium"
                        : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-900"
                    }`}
                  >
                    <span className="flex items-center">
                      <ComputerDesktopIcon className="h-4 w-4 mr-3" />
                      Dim
                      {theme === "dim" && (
                        <span className="ml-auto">
                          <svg
                            className="h-4 w-4 text-primary"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </span>
                      )}
                    </span>
                  </button>
                  <button
                    onClick={() => {
                      toggleTheme("dark");
                      setIsThemeOpen(false);
                    }}
                    className={`w-full text-left block px-4 py-2 text-sm ${
                      theme === "dark"
                        ? "text-primary font-medium"
                        : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-900"
                    }`}
                  >
                    <span className="flex items-center">
                      <MoonIcon className="h-4 w-4 mr-3" />
                      Dark
                      {theme === "dark" && (
                        <span className="ml-auto">
                          <svg
                            className="h-4 w-4 text-primary"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </span>
                      )}
                    </span>
                  </button>
                  <div className="border-t border-gray-200 dark:border-gray-800 my-1"></div>
                  <button
                    onClick={() => setIsThemeOpen(false)}
                    className="w-full text-left block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-900"
                  >
                    <span className="flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 mr-3"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                      Site Settings
                    </span>
                  </button>
                </div>
              )}
            </div>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-primary focus:outline-none"
            >
              {isMenuOpen ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <Bars3Icon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="md:hidden pb-4">
          <form onSubmit={handleSearch} className="relative">
            <input
              type="text"
              placeholder="Search..."
              className="w-full py-2 pl-10 pr-4 rounded-full bg-gray-100 dark:bg-black text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button
              type="submit"
              className="absolute inset-y-0 left-0 pl-3 flex items-center"
            >
              <MagnifyingGlassIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
            </button>
          </form>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200 dark:border-gray-800">
            <div className="flex flex-col space-y-2">
              <Link
                to="/"
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive("/")
                    ? "text-primary"
                    : "text-gray-700 dark:text-gray-300"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Dashboard
              </Link>
              <Link
                to="/blocks"
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive("/blocks")
                    ? "text-primary"
                    : "text-gray-700 dark:text-gray-300"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Blocks
              </Link>
              <Link
                to="/transactions"
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive("/transactions")
                    ? "text-primary"
                    : "text-gray-700 dark:text-gray-300"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Transactions
              </Link>
              <Link
                to="/accounts"
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive("/accounts")
                    ? "text-primary"
                    : "text-gray-700 dark:text-gray-300"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Accounts
              </Link>
              <Link
                to="/apps"
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive("/apps")
                    ? "text-primary"
                    : "text-gray-700 dark:text-gray-300"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Apps
              </Link>
              <Link
                to="/tokens"
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive("/tokens")
                    ? "text-primary"
                    : "text-gray-700 dark:text-gray-300"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Tokens
              </Link>
              <Link
                to="/nfts"
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive("/nfts")
                    ? "text-primary"
                    : "text-gray-700 dark:text-gray-300"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                NFTs
              </Link>
              <Link
                to="/validators"
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive("/validators")
                    ? "text-primary"
                    : "text-gray-700 dark:text-gray-300"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Validators
              </Link>
              <Link
                to="/statistics"
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive("/statistics")
                    ? "text-primary"
                    : "text-gray-700 dark:text-gray-300"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Statistics
              </Link>
              <Link
                to="/analytics"
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive("/analytics")
                    ? "text-primary"
                    : "text-gray-700 dark:text-gray-300"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Analytics
              </Link>

              {/* Network Selector for Mobile */}
              <div className="px-3 py-2 border-t border-gray-200 dark:border-gray-700 mt-2 pt-2">
                <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                  Network
                </div>
                <div className="flex flex-col space-y-2">
                  <a
                    href="#"
                    className="flex items-center rounded-md py-1 px-2 bg-gray-100 dark:bg-gray-800"
                  >
                    <span className="h-2 w-2 rounded-full bg-green-500 mr-2"></span>
                    Mainnet
                  </a>
                  <a
                    href="#"
                    className="flex items-center rounded-md py-1 px-2"
                  >
                    <span className="h-2 w-2 rounded-full bg-purple-500 mr-2"></span>
                    Testnet
                  </a>
                  <a
                    href="#"
                    className="flex items-center rounded-md py-1 px-2"
                  >
                    <span className="h-2 w-2 rounded-full bg-blue-500 mr-2"></span>
                    Devnet
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
