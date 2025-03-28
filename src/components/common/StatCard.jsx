import React from "react";
import CountUp from "react-countup";

const StatCard = ({
  title,
  value,
  icon: Icon,
  change,
  changeType = "neutral",
  variant = "default",
  isLoading = false,
  direction = "up",
  endValue,
  duration = 2.5,
  className = "",
}) => {
  const changeColors = {
    positive: "text-green-500",
    negative: "text-red-500",
    neutral: "text-gray-500 dark:text-gray-400",
  };

  const variantClasses = {
    default: "bg-white dark:bg-gray-800",
    primary: "bg-primary bg-opacity-5 dark:bg-primary dark:bg-opacity-10",
    secondary: "bg-secondary bg-opacity-5 dark:bg-secondary dark:bg-opacity-10",
    success: "bg-green-50 dark:bg-green-900 dark:bg-opacity-10",
    warning: "bg-yellow-50 dark:bg-yellow-900 dark:bg-opacity-10",
    danger: "bg-red-50 dark:bg-red-900 dark:bg-opacity-10",
    info: "bg-blue-50 dark:bg-blue-900 dark:bg-opacity-10",
  };

  const iconBgColors = {
    default: "bg-gray-100 dark:bg-gray-700",
    primary: "bg-primary bg-opacity-10 dark:bg-primary dark:bg-opacity-20",
    secondary:
      "bg-secondary bg-opacity-10 dark:bg-secondary dark:bg-opacity-20",
    success: "bg-green-100 dark:bg-green-900 dark:bg-opacity-30",
    warning: "bg-yellow-100 dark:bg-yellow-900 dark:bg-opacity-30",
    danger: "bg-red-100 dark:bg-red-900 dark:bg-opacity-30",
    info: "bg-blue-100 dark:bg-blue-900 dark:bg-opacity-30",
  };

  const iconColors = {
    default: "text-gray-700 dark:text-gray-300",
    primary: "text-primary",
    secondary: "text-secondary",
    success: "text-green-600 dark:text-green-400",
    warning: "text-yellow-600 dark:text-yellow-400",
    danger: "text-red-600 dark:text-red-400",
    info: "text-blue-600 dark:text-blue-400",
  };

  const changeArrows = {
    up: "↑",
    down: "↓",
    none: "",
  };

  const changeColor = changeColors[changeType] || changeColors.neutral;
  const variantClass = variantClasses[variant] || variantClasses.default;
  const iconBgColor = iconBgColors[variant] || iconBgColors.default;
  const iconColor = iconColors[variant] || iconColors.default;
  const arrow = changeArrows[direction] || changeArrows.none;

  return (
    <div
      className={`rounded-xl shadow-sm p-6 transition-transform duration-200 hover:shadow-md hover:scale-[1.02] ${variantClass} ${className}`}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
          {title}
        </h3>
        {Icon && (
          <div className={`p-2 rounded-lg ${iconBgColor}`}>
            <Icon className={`h-5 w-5 ${iconColor}`} />
          </div>
        )}
      </div>
      <div className="flex items-end justify-between">
        <div>
          {isLoading ? (
            <div className="h-8 w-24 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
          ) : (
            <p className="text-2xl font-semibold text-gray-900 dark:text-white">
              {endValue ? (
                <CountUp
                  end={Number(endValue)}
                  duration={duration}
                  separator=","
                />
              ) : (
                value
              )}
            </p>
          )}
          {change && (
            <p className={`text-sm ${changeColor} mt-1 flex items-center`}>
              {arrow && <span className="mr-1">{arrow}</span>}
              {change}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default StatCard;
