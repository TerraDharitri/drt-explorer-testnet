import { useState } from "react";
import { FaCopy, FaCheck } from "react-icons/fa";

const CopyButton = ({ text, className = "" }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);

      // Reset after 2 seconds
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <button
      onClick={handleCopy}
      className={`inline-flex items-center justify-center p-1 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none ${className}`}
      title={copied ? "Copied!" : "Copy to clipboard"}
    >
      {copied ? (
        <FaCheck className="text-green-500" />
      ) : (
        <FaCopy className="text-gray-500 dark:text-gray-400" />
      )}
    </button>
  );
};

export default CopyButton;
