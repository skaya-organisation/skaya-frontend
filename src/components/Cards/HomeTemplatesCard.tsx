import React from "react";

interface CardProps {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  isActive?: boolean;
  onClick?: () => void;
  showLiveBadge?: boolean; // for sessions
  variant?: "default" | "dashed"; // for create-new card
}

const Card: React.FC<CardProps> = ({
  title,
  description,
  icon,
  isActive = false,
  onClick,
  showLiveBadge = false,
  variant = "default",
}) => {
  return (
    <div
      onClick={onClick}
      className={`border rounded-2xl shadow-xl p-8 flex flex-col items-center text-center space-y-2 bg-white dark:bg-gray-800 transform transition-all duration-300 cursor-pointer
    ${
      variant === "dashed"
        ? "border-dashed border-gray-400 dark:border-gray-600"
        : ""
    }
    ${
      isActive
        ? "border-indigo-500 dark:border-indigo-400 shadow-2xl scale-105"
        : "border-gray-200 dark:border-gray-700 hover:shadow-2xl hover:-translate-y-2"
    }
  `}
    >
      {/* Icon */}
      {icon && (
        <div className="text-2xl text-blue-600 dark:text-blue-400">{icon}</div>
      )}

      {/* Title */}
      <h3 className="text-md font-bold text-gray-900 dark:text-white">
        {title}
      </h3>

      {/* Description */}
      {description && (
        <p className="text-gray-600 dark:text-gray-400 text-sm">
          {description}
        </p>
      )}

      {/* Live Badge */}
      {showLiveBadge && (
        <p className="text-xs mt-3 flex items-center justify-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
          Live Session
        </p>
      )}
    </div>
  );
};

export default Card;
