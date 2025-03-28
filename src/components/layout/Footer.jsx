import React from "react";
import { Link } from "react-router-dom";
import {
  FaTwitter,
  FaGithub,
  FaTelegram,
  FaDiscord,
  FaEnvelope,
  FaExternalLinkAlt,
  FaCode,
} from "react-icons/fa";
import { useTheme } from "../../context/ThemeContext";

const Footer = () => {
  const { theme } = useTheme();
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      name: "Twitter",
      icon: <FaTwitter />,
      url: "https://twitter.com/dharitri",
    },
    {
      name: "GitHub",
      icon: <FaGithub />,
      url: "https://github.com/TerraDharitri",
    },
    { name: "Telegram", icon: <FaTelegram />, url: "https://t.me/dharitri" },
    {
      name: "Discord",
      icon: <FaDiscord />,
      url: "https://discord.gg/dharitri",
    },
  ];

  return (
    <footer className="bg-gray-50 dark:bg-gray-900 pt-12 pb-6 border-t border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Column 1: About */}
          <div>
            <div className="flex items-center mb-4">
              <img
                src="./drt-logo.png"
                alt="Dharitri Logo"
                className="h-8 w-auto mr-2"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src =
                    'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="%2310b981" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg>';
                }}
              />
              <span className="text-xl font-bold bg-gradient-to-r from-primary to-secondary text-transparent bg-clip-text">
                Explorer
              </span>
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
              Explore the Dharitri blockchain with real-time data, charts and
              analytics.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors"
                  aria-label={link.name}
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Explore */}
          <div>
            <h3 className="text-gray-900 dark:text-white font-semibold mb-4">
              Explore
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary text-sm transition-colors"
                >
                  Dashboard
                </Link>
              </li>
              <li>
                <Link
                  to="/blocks"
                  className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary text-sm transition-colors"
                >
                  Blocks
                </Link>
              </li>
              <li>
                <Link
                  to="/transactions"
                  className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary text-sm transition-colors"
                >
                  Transactions
                </Link>
              </li>
              <li>
                <Link
                  to="/accounts"
                  className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary text-sm transition-colors"
                >
                  Accounts
                </Link>
              </li>
              <li>
                <Link
                  to="/apps"
                  className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary text-sm transition-colors"
                >
                  Apps
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Resources */}
          <div>
            <h3 className="text-gray-900 dark:text-white font-semibold mb-4">
              Resources
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/tokens"
                  className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary text-sm transition-colors"
                >
                  Tokens
                </Link>
              </li>
              <li>
                <Link
                  to="/nfts"
                  className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary text-sm transition-colors"
                >
                  NFTs
                </Link>
              </li>
              <li>
                <Link
                  to="/validators"
                  className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary text-sm transition-colors"
                >
                  Validators
                </Link>
              </li>
              <li>
                <Link
                  to="/statistics"
                  className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary text-sm transition-colors"
                >
                  Statistics
                </Link>
              </li>
              <li>
                <Link
                  to="/analytics"
                  className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary text-sm transition-colors"
                >
                  Analytics
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Developers */}
          <div>
            <h3 className="text-gray-900 dark:text-white font-semibold mb-4">
              Developers
            </h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://docs.dharitri.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary text-sm transition-colors flex items-center"
                >
                  <span>Documentation</span>
                  <FaExternalLinkAlt className="ml-1 h-3 w-3" />
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/TerraDharitri"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary text-sm transition-colors flex items-center"
                >
                  <span>GitHub</span>
                  <FaExternalLinkAlt className="ml-1 h-3 w-3" />
                </a>
              </li>
              <li>
                <a
                  href="https://dharitri.com/sdk"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary text-sm transition-colors flex items-center"
                >
                  <span>SDK</span>
                  <FaExternalLinkAlt className="ml-1 h-3 w-3" />
                </a>
              </li>
              <li>
                <a
                  href="https://dharitri.com/api"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary text-sm transition-colors flex items-center"
                >
                  <span>API</span>
                  <FaExternalLinkAlt className="ml-1 h-3 w-3" />
                </a>
              </li>
              <li>
                <a
                  href="mailto:supporrt@dharitri.org"
                  className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary text-sm transition-colors flex items-center"
                >
                  <FaEnvelope className="mr-2" />
                  <span>supporrt@dharitri.org</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 dark:border-gray-800 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            © {currentYear} Dharitri Explorer. All rights reserved.
          </p>
          <div className="flex items-center mt-4 md:mt-0 space-x-4">
            <span className="text-xs text-gray-500 dark:text-gray-500 flex items-center">
              <FaCode className="mr-1" /> Built with ❤️ by the Dharitri Team
            </span>
            <div className="flex items-center">
              <span className="flex items-center px-3 py-1 rounded-full text-xs bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
                <span className="h-2 w-2 rounded-full bg-green-500 mr-2"></span>
                Mainnet
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
