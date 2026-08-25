import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { playIphoneClick } from '../utils/haptics';

interface TactileButtonProps extends Omit<HTMLMotionProps<'button'>, 'children'> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'glass' | 'outline' | 'liquid';
  size?: 'sm' | 'md' | 'lg';
  hapticType?: 'light' | 'medium' | 'heavy';
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export const TactileButton: React.FC<TactileButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  hapticType = 'light',
  className = '',
  onClick,
  ...props
}) => {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    playIphoneClick(hapticType);
    if (onClick) onClick(e);
  };

  const sizeClasses = {
    sm: 'px-4 py-2 text-xs font-bold rounded-full',
    md: 'px-6 py-3 text-sm font-bold rounded-full',
    lg: 'px-8 py-4 text-base font-extrabold rounded-full',
  };

  const variantClasses = {
    primary:
      'text-white bg-gradient-to-r from-red-600 via-red-600 to-red-700 shadow-lg shadow-red-600/30 hover:shadow-red-600/50 border border-red-500/40',
    secondary:
      'bg-slate-900/90 hover:bg-slate-800 text-slate-100 border border-slate-700/80 shadow-md',
    glass:
      'glass-panel text-white border border-white/20 hover:border-white/40 shadow-md',
    liquid:
      'glass-panel text-white border border-red-500/30 hover:border-red-500/60 shadow-md',
    outline:
      'bg-red-950/40 hover:bg-red-900/50 text-red-400 hover:text-white border border-red-600/50 shadow-sm',
  };

  return (
    <motion.button
      whileHover={{
        scale: 1.03,
        y: -1.5,
        transition: { type: 'spring', stiffness: 500, damping: 20 },
      }}
      whileTap={{
        scale: 0.96,
        y: 1,
        transition: { type: 'spring', stiffness: 600, damping: 15 },
      }}
      onClick={handleClick}
      className={`relative inline-flex items-center justify-center space-x-2 select-none cursor-pointer tracking-wide transition-all overflow-hidden rounded-full ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
      {...props}
    >
      <span className="relative z-10 flex items-center justify-center space-x-2">
        {children}
      </span>
    </motion.button>
  );
};
