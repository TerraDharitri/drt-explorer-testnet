import React from "react";

const Card = ({
  children,
  className = "",
  title,
  subtitle,
  footer,
  isLoading = false,
}) => {
  if (isLoading) {
    return (
      <div className={`card animate-pulse ${className}`}>
        <div className="card-header">
          <div className="h-6 bg-gray-200 rounded w-1/3"></div>
          {subtitle && (
            <div className="h-4 bg-gray-200 rounded w-1/4 mt-2"></div>
          )}
        </div>
        <div className="card-body">
          <div className="h-24 bg-gray-200 rounded"></div>
        </div>
        {footer && (
          <div className="px-6 py-4 border-t border-gray-200">
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={`card ${className}`}>
      {(title || subtitle) && (
        <div className="card-header">
          {title && (
            <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          )}
          {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
        </div>
      )}
      <div className="card-body">{children}</div>
      {footer && (
        <div className="px-6 py-4 border-t border-gray-200">{footer}</div>
      )}
    </div>
  );
};

export default Card;
