import React from "react";
import CountUp from "react-countup";

const StatCard = ({
  title,
  value,
  icon: Icon,
  change,
  changeType = "neutral",
  prefix = "",
  suffix = "",
  isLoading = false,
  decimals = 0,
  duration = 2.5,
  className = "",
}) => {
  const changeColorClass =
    changeType === "positive"
      ? "text-green-500"
      : changeType === "negative"
      ? "text-red-500"
      : "text-gray-500";

  if (isLoading) {
    return (
      <div className={`card ${className} animate-pulse`}>
        <div className="card-body">
          <div className="flex justify-between">
            <div>
              <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
              <div className="h-8 bg-gray-300 rounded w-3/4"></div>
              <div className="h-3 bg-gray-200 rounded w-1/3 mt-2"></div>
            </div>
            <div className="rounded-full bg-gray-200 p-3 h-12 w-12"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`card ${className}`}>
      <div className="card-body">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm font-medium text-gray-500 mb-1">{title}</p>
            <h3 className="text-2xl font-bold text-gray-900 flex items-baseline">
              {prefix}
              <CountUp
                end={value}
                duration={duration}
                decimals={decimals}
                separator=","
              />
              {suffix}
            </h3>
            {change !== undefined && (
              <p
                className={`text-xs font-medium mt-1 flex items-center ${changeColorClass}`}
              >
                {changeType === "positive" && "↑ "}
                {changeType === "negative" && "↓ "}
                {change}
              </p>
            )}
          </div>
          {Icon && (
            <div className="bg-primary-100 rounded-full p-3 text-primary-500">
              <Icon className="h-6 w-6" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StatCard;
