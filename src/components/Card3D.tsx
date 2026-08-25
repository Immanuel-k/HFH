import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { playIphoneClick } from '../utils/haptics';

interface Card3DProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  hapticType?: 'light' | 'medium' | 'heavy';
}

export const Card3D: React.FC<Card3DProps> = ({
  children,
  className = '',
  onClick,
  hapticType = 'medium',
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rX = ((y - centerY) / centerY) * -6;
    const rY = ((x - centerX) / centerX) * 6;

    setRotateX(rX);
    setRotateY(rY);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  const handleClick = () => {
    playIphoneClick(hapticType);
    if (onClick) onClick();
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      style={{
        transformStyle: 'preserve-3d',
        perspective: 1000,
      }}
      animate={{
        rotateX,
        rotateY,
      }}
      whileHover={{
        scale: 1.025,
        transition: { duration: 0.2 },
      }}
      whileTap={{
        scale: 0.96,
        rotateX: 0,
        rotateY: 0,
        boxShadow: 'inset 0 6px 15px rgba(0, 0, 0, 0.7)',
        transition: { type: 'spring', stiffness: 500, damping: 20 },
      }}
      className={`liquid-glass-nav rounded-3xl transition-colors duration-300 cursor-pointer relative overflow-hidden select-none ${className}`}
    >
      {/* Liquid Glass distortion background filter */}
      <div
        className="absolute inset-0 z-0 pointer-events-none rounded-3xl"
        style={{
          backdropFilter: 'blur(4px)',
          filter: 'url(#glass-distortion)',
          isolation: 'isolate',
        }}
      />

      {/* Liquid Glass Inner Specular Contour */}
      <div
        className="absolute inset-0 z-10 pointer-events-none rounded-3xl overflow-hidden"
        style={{
          boxShadow:
            'inset 2px 2px 1px 0 rgba(255, 255, 255, 0.35), inset -1px -1px 1px 1px rgba(255, 255, 255, 0.15)',
        }}
      />

      {/* Card Content */}
      <div className="relative z-20 h-full flex flex-col justify-between">
        {children}
      </div>
    </motion.div>
  );
};
