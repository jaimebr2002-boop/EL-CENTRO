import React from 'react';

export const Logo = ({ className = "h-12 w-auto" }: { className?: string }) => {
  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      <svg viewBox="0 0 100 100" className="h-full w-full">
        {/* Triangle Background with 3 bands */}
        <path d="M50 5 L95 85 L5 85 Z" fill="#2D5A27" /> {/* Dark Green */}
        <path d="M50 35 L75 85 L25 85 Z" fill="#7B2D2D" /> {/* Wine Red */}
        <path d="M50 65 L55 85 L45 85 Z" fill="#7CB342" /> {/* Lime Green */}
        
        {/* Cutlery Icons (Simplified) */}
        <g fill="white" transform="translate(35, 45) scale(0.3)">
          {/* Fork */}
          <path d="M10,0 L10,30 M20,0 L20,30 M30,0 L30,30 M20,30 L20,100" stroke="white" strokeWidth="8" />
          {/* Knife */}
          <path d="M60,0 L60,50 Q80,50 60,100 L60,0" transform="translate(30,0)" />
          {/* Spoon */}
          <ellipse cx="120" cy="25" rx="15" ry="25" />
          <path d="M120,50 L120,100" stroke="white" strokeWidth="8" />
        </g>
      </svg>
    </div>
  );
};

export const Divider = () => (
  <div className="section-divider">
    <svg width="200" height="20" viewBox="0 0 200 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M0 10C50 10 50 2 100 2C150 2 150 10 200 10" stroke="currentColor" strokeWidth="1" />
      <circle cx="100" cy="10" r="4" fill="currentColor" />
      <path d="M0 10C50 10 50 18 100 18C150 18 150 10 200 10" stroke="currentColor" strokeWidth="1" />
    </svg>
  </div>
);
