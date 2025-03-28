import React from "react";

const ValueDisplay = ({
  value,
  currency = "DRT",
  decimals = 4,
  showCurrency = true,
  className = "",
}) => {
  if (value === undefined || value === null) return null;

  // Convert to number if it's a string
  const numValue = typeof value === "string" ? parseFloat(value) : value;

  // Format the value
  const formattedValue = numValue.toLocaleString(undefined, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });

  return (
    <span className={className}>
      {formattedValue}
      {showCurrency && ` ${currency}`}
    </span>
  );
};

export default ValueDisplay;
