import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export const Header: React.FC<{ onDarkModeToggle?: () => void }> = ({ onDarkModeToggle }) => {
  useEffect(() => {
    document.title = 'NEURASYNTH - Advanced Tumor Detection';
  }, []);

  // Dark mode state
  const [dark, setDark] = useState(() =>
    typeof window !== 'undefined' && document.documentElement.classList.contains('dark')
  );
  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [dark]);

  // Animation variants for smoother, card-like effect
  const headerVariants = {
    hidden: { opacity: 0, y: -24 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 80, damping: 16 } },
  };
  const betaVariants = {
    rest: { scale: 1, y: 0, boxShadow: '0 0px 0px 0px rgba(44,135,255,0)' },
    hover: {
      scale: 1.13,
      y: -2,
      boxShadow: '0 6px 18px -4px rgba(44,135,255,0.13)',
      transition: { type: 'spring', stiffness: 260, damping: 18 }
    }
  };

  return (
    <motion.header
      className="backdrop-blur-sm"
      variants={headerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="container mx-auto px-8 py-8">
        <div className="flex items-center justify-between">
          {/* Left: NEURASYNTH title and beta */}
          <motion.div
            className="flex flex-col"
            whileHover={{ scale: 1.035, y: -4, boxShadow: '0 12px 32px -8px rgba(44,135,255,0.10)' }}
            transition={{ type: 'spring', stiffness: 80, damping: 16 }}
          >
            <div className="flex flex-col items-start">
              <div className="flex items-center">
                <h1 className="text-xl font-bold text-[#1F3C6E] flex items-baseline" style={{ fontFamily: 'Nomixa, Nunito, system-ui, sans-serif' }}>
                  NEURASYNTH
                  <motion.span
                    className="ml-0.5 px-0 py-0.5 text-[10px] font-extralight tracking-wider bg-gradient-to-r from-[#4d58fa] to-[#8121ff] text-transparent bg-clip-text rounded-[10px] align-super"
                    style={{
                      WebkitTextStroke: '1px',
                      WebkitTextStrokeColor: 'currentColor',
                      backgroundClip: 'text',
                      color: 'transparent',
                      opacity: 1,
                      boxSizing: 'border-box',
                      display: 'inline-block',
                      lineHeight: 1.2,
                      position: 'relative',
                      top: '-8px',
                      left: '0.05em',
                      fontFamily: 'Nomixa, Nunito, system-ui, sans-serif'
                    }}
                    variants={betaVariants}
                    initial="rest"
                    whileHover="hover"
                    animate="rest"
                  >
                    BETA
                  </motion.span>
                </h1>
              </div>
            </div>
            <p className="text-[10.4px] text-[#1F3C6E]/60 -mt-0.5" style={{ fontFamily: 'Nomixa, Nunito, system-ui, sans-serif' }}>Advanced Tumor Detection</p>
          </motion.div>
          {/* Right: Dark mode button */}
          <button
            type="button"
            className="relative inline-flex h-12 w-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 bg-transparent"
            aria-label="Toggle dark mode"
            onClick={() => {
              setDark((d) => !d);
              if (onDarkModeToggle) onDarkModeToggle();
            }}
          >
            {/* Show sun icon if dark mode is active, moon icon otherwise */}
            {dark ? (
              <span className="flex items-center justify-center w-full h-full">
                <svg className="shrink-0 size-6 text-yellow-400" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="4"></circle>
                  <path d="M12 2v2"></path>
                  <path d="M12 20v2"></path>
                  <path d="m4.93 4.93 1.41 1.41"></path>
                  <path d="m17.66 17.66 1.41 1.41"></path>
                  <path d="M2 12h2"></path>
                  <path d="M20 12h2"></path>
                  <path d="m6.34 17.66-1.41 1.41"></path>
                  <path d="m19.07 4.93-1.41 1.41"></path>
                </svg>
              </span>
            ) : (
              <span className="flex items-center justify-center w-full h-full">
                <svg className="shrink-0 size-6 text-blue-900" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
                </svg>
              </span>
            )}
          </button>
        </div>
      </div>
    </motion.header>
  );
};