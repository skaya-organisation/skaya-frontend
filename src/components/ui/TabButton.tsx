// src/components/ui/TabButton.tsx
import React from "react";
import { motion } from "framer-motion";

interface TabButtonProps {
  label: string;
  icon: React.ReactNode;
  isActive: boolean;
  onClick: () => void;
}

const TabButton: React.FC<TabButtonProps> = ({
  label,
  icon,
  isActive,
  onClick,
}) => {

  return (
    <button
      onClick={onClick}
      className="rounded-md relative px-2 py-2 text-sm font-medium transition-colors"
    >
      <span className="relative z-10 flex items-center gap-2">
        {icon}
        {label}
      </span>
      {isActive && (
        <motion.div
          layoutId="active-tab-indicator"
          className="absolute inset-0 rounded-md"
          style={{
          }}
        />
      )}
    </button>
  );
};

export default TabButton;
