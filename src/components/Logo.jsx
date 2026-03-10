import React from 'react';

const Logo = ({ className = '', style = {} }) => {
  return (
    <svg
      viewBox="0 0 100 100"
      className={`transition-all duration-300 ease-in-out ${className}`}
      style={style}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Outer Hexagon Glow */}
        <filter id="neon-glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
        <filter id="neon-glow-strong" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="5" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      <g stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round" className="group-hover:filter-none">
        {/* Outer Hexagon Rings */}
        <polygon 
          points="50,5 90,25 90,75 50,95 10,75 10,25" 
          strokeWidth="3.5" 
          className="text-primary drop-shadow-[0_0_8px_currentColor] opacity-90"
          style={{ filter: "url(#neon-glow)" }}
        />
        
        <polygon 
          points="50,14 82,30 82,70 50,86 18,70 18,30" 
          strokeWidth="2.5" 
          className="text-cyan-400 opacity-80"
          style={{ filter: "url(#neon-glow)" }}
        />

        {/* Inner Cube / Isometric Box */}
        <polygon 
          points="50,25 72,36 72,64 50,75 28,64 28,36" 
          strokeWidth="2.5" 
          strokeOpacity="0.8"
        />
        <polyline points="28,36 50,47 72,36" strokeWidth="2.5" strokeOpacity="0.8" />
        <line x1="50" y1="47" x2="50" y2="75" strokeWidth="2.5" strokeOpacity="0.8" />
      </g>

      {/* Center Solid Circle and Up Arrow */}
      <g className="text-primary drop-shadow-[0_0_12px_currentColor]">
        <circle cx="50" cy="49" r="10" fill="currentColor" />
        <path 
          d="M50 56 L50 43 M45 47 L50 42 L55 47" 
          stroke="#0F172A" /* Dark background color to cut out the arrow from the circle */
          strokeWidth="2.5" 
          fill="none" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
        />
        {/* Tail winding outwards */}
        <path 
          d="M50 56 Q50 68 40 68" 
          stroke="#0F172A" 
          strokeWidth="2" 
          fill="none" 
          strokeLinecap="round" 
        />
      </g>
    </svg>
  );
};

export default Logo;
