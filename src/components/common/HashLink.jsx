import { Link } from "react-router-dom";
import { useState } from "react";
import CopyButton from "./CopyButton";
import { HiExternalLink } from "react-icons/hi";

const HashLink = ({
  hash,
  type = "tx",
  length = "medium",
  showCopy = true,
  showExternal = false,
  className = "",
  monospace = true,
  highlight = false,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  if (!hash) return null;

  // Determine how much of the hash to show
  let displayHash = hash;
  if (length === "short") {
    displayHash = `${hash.substring(0, 6)}...${hash.substring(
      hash.length - 4
    )}`;
  } else if (length === "medium") {
    displayHash = `${hash.substring(0, 10)}...${hash.substring(
      hash.length - 8
    )}`;
  } else if (length === "long") {
    displayHash = `${hash.substring(0, 20)}...${hash.substring(
      hash.length - 10
    )}`;
  }

  // Determine the link path based on type
  let path = "";
  switch (type) {
    case "tx":
      path = `/transaction/${hash}`;
      break;
    case "block":
      path = `/block/${hash}`;
      break;
    case "account":
      path = `/account/${hash}`;
      break;
    default:
      path = `/${type}/${hash}`;
  }

  // External link URL (e.g., for linking to a block explorer)
  const externalUrl = `https://explorer.dharitri.com/${type}/${hash}`;

  return (
    <div
      className={`inline-flex items-center rounded-md group ${
        highlight ? "bg-blue-50 dark:bg-blue-900/20 px-2 py-1" : ""
      } ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link
        to={path}
        className={`text-primary hover:text-primary-600 dark:hover:text-primary-400 ${
          monospace ? "font-mono" : ""
        } transition-colors`}
        title={hash}
      >
        {displayHash}
      </Link>

      {showCopy && isHovered && (
        <CopyButton
          text={hash}
          className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity"
        />
      )}

      {showExternal && isHovered && (
        <a
          href={externalUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="ml-1 text-gray-500 hover:text-primary opacity-0 group-hover:opacity-100 transition-opacity"
          title="View in external explorer"
        >
          <HiExternalLink className="h-4 w-4" />
        </a>
      )}
    </div>
  );
};

export default HashLink;
