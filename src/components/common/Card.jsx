import React from "react";

const Card = ({
  children,
  className = "",
  variant = "default",
  title,
  subtitle,
  titleIcon: TitleIcon,
  action,
  noPadding = false,
  ...props
}) => {
  // Different variants for cards
  const variantClasses = {
    default: "bg-white dark:bg-gray-800 shadow-sm",
    primary:
      "bg-primary bg-opacity-5 dark:bg-primary dark:bg-opacity-10 shadow-sm",
    secondary:
      "bg-secondary bg-opacity-5 dark:bg-secondary dark:bg-opacity-10 shadow-sm",
    elevated: "bg-white dark:bg-gray-800 shadow-lg",
    outline:
      "bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700",
    transparent: "bg-transparent",
  };

  const variantClass = variantClasses[variant] || variantClasses.default;
  const paddingClass = noPadding ? "" : "p-6";

  return (
    <div
      className={`rounded-xl overflow-hidden transition-all duration-200 ${variantClass} ${className}`}
      {...props}
    >
      {(title || subtitle || action) && (
        <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-700 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {TitleIcon && <TitleIcon className="h-5 w-5 text-primary" />}
            <div>
              {title && (
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                  {title}
                </h3>
              )}
              {subtitle && (
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {subtitle}
                </p>
              )}
            </div>
          </div>
          {action && <div>{action}</div>}
        </div>
      )}
      <div className={`${paddingClass}`}>{children}</div>
    </div>
  );
};

export default Card;
