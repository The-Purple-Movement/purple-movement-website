"use client";

import React from "react";
import { Globe, Users, BookOpen } from "lucide-react";

export interface LevelData {
  id: number;
  title: string;
  description: string;
  icon?: "globe" | "users" | "book";
}

interface PyramidChartProps {
  data?: LevelData[];
  hoveredLevel: number | null;
  onHover: (id: number | null) => void;
  onSelect?: (id: number) => void;
  onUpdate?: (id: number, field: "title" | "description", value: string) => void;
}

const PyramidChart: React.FC<PyramidChartProps> = ({
  hoveredLevel,
  onHover,
  onSelect,
}) => {
  return (
    <div className="relative w-full max-w-[430px] xl:max-w-[460px] mx-auto aspect-[520/460] flex items-center justify-center select-none">
      {/* Background Radial Glow */}
      <div 
        className="absolute inset-0 rounded-full pointer-events-none filter blur-3xl opacity-60"
        style={{
          background: "radial-gradient(circle, var(--pm-glow) 0%, var(--pm-border) 50%, transparent 75%)",
        }}
        aria-hidden="true"
      />

      <svg
        viewBox="0 0 520 460"
        className="w-full h-full overflow-visible relative z-10"
        role="img"
        aria-label="Interactive 3-Tier Purple Movement Pyramid"
      >
        <defs>
          {/* Intense Neon Glow Filter */}
          <filter id="pyramid-neon-glow" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="blur1" />
            <feGaussianBlur in="SourceGraphic" stdDeviation="12" result="blur2" />
            <feMerge>
              <feMergeNode in="blur2" />
              <feMergeNode in="blur1" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Top Edge Rim Bloom Filter */}
          <filter id="rim-bloom" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Subtle Outer Drop Shadow */}
          <filter id="tier-shadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="8" stdDeviation="10" floodColor="var(--pm-bg)" floodOpacity="0.8" />
          </filter>

          {/* Gradients for Glass Bodies */}
          <linearGradient id="tier-glass-1" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="var(--pm-pyramid-glass-top)" />
            <stop offset="100%" stopColor="var(--pm-pyramid-glass-bottom)" />
          </linearGradient>

          <linearGradient id="tier-glass-2" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="var(--pm-pyramid-glass-top)" />
            <stop offset="100%" stopColor="var(--pm-pyramid-glass-bottom)" />
          </linearGradient>

          <linearGradient id="tier-glass-3" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="var(--pm-pyramid-glass-top)" />
            <stop offset="100%" stopColor="var(--pm-pyramid-glass-bottom)" />
          </linearGradient>

          {/* Vibrant Neon Rim Gradients */}
          <linearGradient id="neon-rim-bright" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="var(--pm-primary)" stopOpacity="0.4" />
            <stop offset="25%" stopColor="var(--pm-accent)" />
            <stop offset="50%" stopColor="var(--pm-pyramid-rim-bright)" />
            <stop offset="75%" stopColor="var(--pm-accent)" />
            <stop offset="100%" stopColor="var(--pm-primary)" stopOpacity="0.4" />
          </linearGradient>

          <linearGradient id="neon-rim-top" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="var(--pm-pyramid-rim-bright)" />
            <stop offset="50%" stopColor="var(--pm-accent)" />
            <stop offset="100%" stopColor="var(--pm-primary)" />
          </linearGradient>
        </defs>

        {/* --- Background Orbital Rings --- */}
        <g className="pointer-events-none opacity-80" aria-hidden="true">
          {/* Main Dotted Orbit */}
          <circle
            cx="260"
            cy="235"
            r="206"
            fill="none"
            stroke="var(--pm-pyramid-orbit)"
            strokeWidth="1.2"
            strokeDasharray="4 6"
          />
          {/* Faint Outer Ring */}
          <circle
            cx="260"
            cy="235"
            r="218"
            fill="none"
            stroke="var(--pm-border)"
            strokeWidth="0.6"
            opacity="0.3"
          />
          {/* Faint Inner Ring */}
          <circle
            cx="260"
            cy="235"
            r="194"
            fill="none"
            stroke="var(--pm-border)"
            strokeWidth="0.5"
            opacity="0.2"
          />
        </g>

        {/* Tier 1: Beyond Borders (Top Triangle) */}
        <g
          className="cursor-pointer transition-all duration-300 origin-center"
          onMouseEnter={() => onHover(1)}
          onMouseLeave={() => onHover(null)}
          onClick={() => onSelect?.(1)}
          style={{ transformOrigin: "260px 100px" }}
          transform={hoveredLevel === 1 ? "scale(1.04)" : "scale(1)"}
        >
          {/* Base 3D Bevel Lip */}
          <path
            d="M 198 144 L 322 144 L 314 150 L 206 150 Z"
            fill="var(--pm-border)"
            stroke="var(--pm-border)"
            strokeWidth="0.5"
          />

          {/* Main Glass Triangle */}
          <path
            d="M 260 44 L 198 144 L 322 144 Z"
            fill="url(#tier-glass-1)"
            stroke={hoveredLevel === 1 ? "var(--pm-light)" : "var(--pm-accent)"}
            strokeWidth={hoveredLevel === 1 ? "2" : "1.2"}
            filter={hoveredLevel === 1 ? "url(#pyramid-neon-glow)" : "url(#tier-shadow)"}
            className="transition-all duration-300"
          />

          {/* Neon Apex & Side Rim Highlights */}
          <path
            d="M 198 144 L 260 44 L 322 144"
            fill="none"
            stroke="url(#neon-rim-top)"
            strokeWidth={hoveredLevel === 1 ? "2.2" : "1.5"}
            className="pointer-events-none"
          />

          {/* Globe Icon */}
          <foreignObject
            x="245"
            y="76"
            width="30"
            height="30"
            className="pointer-events-none overflow-visible"
          >
            <div className="w-full h-full flex items-center justify-center text-pm-accent transition-all duration-300">
              <Globe
                className={`w-6 h-6 stroke-[1.8] ${
                  hoveredLevel === 1 ? "text-pm-light drop-shadow-[0_0_10px_var(--pm-accent)]" : ""
                }`}
              />
            </div>
          </foreignObject>

          {/* Text Labels */}
          <text
            x="260"
            y="120"
            textAnchor="middle"
            fill="var(--pm-text-primary)"
            fontSize="12.5"
            fontWeight="700"
            className="font-poppins tracking-wide select-none pointer-events-none"
          >
            Beyond
          </text>
          <text
            x="260"
            y="135"
            textAnchor="middle"
            fill="var(--pm-text-primary)"
            fontSize="12.5"
            fontWeight="700"
            className="font-poppins tracking-wide select-none pointer-events-none"
          >
            Borders
          </text>
        </g>

        {/* Tier 2: Beyond Gatekeepers (Middle Trapezoid) */}
        <g
          className="cursor-pointer transition-all duration-300 origin-center"
          onMouseEnter={() => onHover(2)}
          onMouseLeave={() => onHover(null)}
          onClick={() => onSelect?.(2)}
          style={{ transformOrigin: "260px 215px" }}
          transform={hoveredLevel === 2 ? "scale(1.04)" : "scale(1)"}
        >
          {/* Base 3D Bevel Lip */}
          <path
            d="M 128 268 L 392 268 L 382 274 L 138 274 Z"
            fill="var(--pm-border)"
            stroke="var(--pm-border)"
            strokeWidth="0.5"
          />

          {/* Main Glass Trapezoid */}
          <path
            d="M 190 158 L 330 158 L 392 268 L 128 268 Z"
            fill="url(#tier-glass-2)"
            stroke={hoveredLevel === 2 ? "var(--pm-light)" : "var(--pm-border-hover)"}
            strokeWidth={hoveredLevel === 2 ? "2" : "1.2"}
            filter={hoveredLevel === 2 ? "url(#pyramid-neon-glow)" : "url(#tier-shadow)"}
            className="transition-all duration-300"
          />

          {/* Top Neon Horizontal Rim */}
          <line
            x1="190"
            y1="158"
            x2="330"
            y2="158"
            stroke="url(#neon-rim-bright)"
            strokeWidth={hoveredLevel === 2 ? "2.5" : "1.8"}
            filter="url(#rim-bloom)"
            className="pointer-events-none"
          />

          {/* Users Icon */}
          <foreignObject
            x="244"
            y="194"
            width="32"
            height="32"
            className="pointer-events-none overflow-visible"
          >
            <div className="w-full h-full flex items-center justify-center text-pm-accent transition-all duration-300">
              <Users
                className={`w-6 h-6 stroke-[1.8] ${
                  hoveredLevel === 2 ? "text-pm-light drop-shadow-[0_0_10px_var(--pm-accent)]" : ""
                }`}
              />
            </div>
          </foreignObject>

          {/* Text Labels */}
          <text
            x="260"
            y="240"
            textAnchor="middle"
            fill="var(--pm-text-primary)"
            fontSize="13.5"
            fontWeight="700"
            className="font-poppins tracking-wide select-none pointer-events-none"
          >
            Beyond
          </text>
          <text
            x="260"
            y="256"
            textAnchor="middle"
            fill="var(--pm-text-primary)"
            fontSize="13.5"
            fontWeight="700"
            className="font-poppins tracking-wide select-none pointer-events-none"
          >
            Gatekeepers
          </text>
        </g>

        {/* Tier 3: Beyond Syllabus (Bottom Wide Trapezoid) */}
        <g
          className="cursor-pointer transition-all duration-300 origin-center"
          onMouseEnter={() => onHover(3)}
          onMouseLeave={() => onHover(null)}
          onClick={() => onSelect?.(3)}
          style={{ transformOrigin: "260px 350px" }}
          transform={hoveredLevel === 3 ? "scale(1.04)" : "scale(1)"}
        >
          {/* Base 3D Bevel Lip */}
          <path
            d="M 48 412 L 472 412 L 460 418 L 60 418 Z"
            fill="var(--pm-border)"
            stroke="var(--pm-border)"
            strokeWidth="0.5"
          />

          {/* Main Glass Trapezoid */}
          <path
            d="M 120 282 L 400 282 L 472 412 L 48 412 Z"
            fill="url(#tier-glass-3)"
            stroke={hoveredLevel === 3 ? "var(--pm-light)" : "var(--pm-border-hover)"}
            strokeWidth={hoveredLevel === 3 ? "2" : "1.2"}
            filter={hoveredLevel === 3 ? "url(#pyramid-neon-glow)" : "url(#tier-shadow)"}
            className="transition-all duration-300"
          />

          {/* Intense Neon Flare on Top Edge (Iconic Purple Movement signature glow) */}
          <line
            x1="120"
            y1="282"
            x2="400"
            y2="282"
            stroke="url(#neon-rim-bright)"
            strokeWidth={hoveredLevel === 3 ? "3.5" : "2.5"}
            filter="url(#rim-bloom)"
            className="pointer-events-none"
          />
          {/* Fine White Core Line */}
          <line
            x1="130"
            y1="282"
            x2="390"
            y2="282"
            stroke="var(--pm-text-primary)"
            strokeWidth="1"
            opacity={hoveredLevel === 3 ? "0.9" : "0.7"}
            className="pointer-events-none"
          />

          {/* Book Icon */}
          <foreignObject
            x="243"
            y="322"
            width="34"
            height="34"
            className="pointer-events-none overflow-visible"
          >
            <div className="w-full h-full flex items-center justify-center text-pm-accent transition-all duration-300">
              <BookOpen
                className={`w-6 h-6 stroke-[1.8] ${
                  hoveredLevel === 3 ? "text-pm-light drop-shadow-[0_0_10px_var(--pm-accent)]" : ""
                }`}
              />
            </div>
          </foreignObject>

          {/* Text Labels */}
          <text
            x="260"
            y="374"
            textAnchor="middle"
            fill="var(--pm-text-primary)"
            fontSize="14.5"
            fontWeight="700"
            className="font-poppins tracking-wide select-none pointer-events-none"
          >
            Beyond
          </text>
          <text
            x="260"
            y="392"
            textAnchor="middle"
            fill="var(--pm-text-primary)"
            fontSize="14.5"
            fontWeight="700"
            className="font-poppins tracking-wide select-none pointer-events-none"
          >
            Syllabus
          </text>
        </g>
      </svg>
    </div>
  );
};

export default PyramidChart;
