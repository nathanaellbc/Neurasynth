import React from 'react';
import { motion } from 'framer-motion';

interface LoadingIndicatorProps {
  className?: string;
}

export const LoadingIndicator: React.FC<LoadingIndicatorProps> = ({ className = "h-5 w-5 text-white" }) => {
  return (
    <motion.svg
      className={className}
      viewBox="0 0 24 24"
      animate={{ rotate: 360 }}
      transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
    >
      <circle
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
        fill="none"
        strokeDasharray="30 60"
        strokeLinecap="round"
      />
    </motion.svg>
  );
};