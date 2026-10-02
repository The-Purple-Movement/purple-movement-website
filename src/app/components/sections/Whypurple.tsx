"use client";

import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";



const RedOrb: React.FC = () => (
  <div className="relative w-12 h-12 sm:w-14 sm:h-14 shrink-0 flex items-center justify-center">
    <svg
      viewBox="0 0 60 60"
      className="w-full h-full overflow-visible"
      style={{ filter: "drop-shadow(0 0 16px var(--pm-orb-red-glow))" }}
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="red-sphere-grad" cx="40%" cy="38%" r="62%">
          <stop offset="0%" stopColor="var(--pm-text-primary)" stopOpacity="0.95" />
          <stop offset="14%" stopColor="var(--pm-orb-red-highlight)" />
          <stop offset="42%" stopColor="var(--pm-orb-red-base)" />
          <stop offset="78%" stopColor="var(--pm-orb-red-dark)" />
          <stop offset="100%" stopColor="var(--pm-orb-red-shadow)" />
        </radialGradient>
      </defs>
      {/* 3D Sphere Body */}
      <circle cx="30" cy="30" r="21" fill="url(#red-sphere-grad)" />
      {/* Primary Specular Glint */}
      <circle cx="25" cy="23" r="3.2" fill="var(--pm-text-primary)" opacity="0.92" />
      <circle cx="24.5" cy="22.5" r="1.3" fill="var(--pm-text-primary)" opacity="1" />
    </svg>
  </div>
);

const BlueOrb: React.FC = () => (
  <div className="relative w-12 h-12 sm:w-14 sm:h-14 shrink-0 flex items-center justify-center">
    <svg
      viewBox="0 0 60 60"
      className="w-full h-full overflow-visible"
      style={{ filter: "drop-shadow(0 0 16px var(--pm-orb-blue-glow))" }}
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="blue-sphere-grad" cx="40%" cy="38%" r="62%">
          <stop offset="0%" stopColor="var(--pm-text-primary)" stopOpacity="0.95" />
          <stop offset="14%" stopColor="var(--pm-orb-blue-highlight)" />
          <stop offset="42%" stopColor="var(--pm-orb-blue-base)" />
          <stop offset="78%" stopColor="var(--pm-orb-blue-dark)" />
          <stop offset="100%" stopColor="var(--pm-orb-blue-shadow)" />
        </radialGradient>
      </defs>
      {/* 3D Sphere Body */}
      <circle cx="30" cy="30" r="21" fill="url(#blue-sphere-grad)" />
      {/* Primary Specular Glint */}
      <circle cx="25" cy="23" r="3.2" fill="var(--pm-text-primary)" opacity="0.92" />
      <circle cx="24.5" cy="22.5" r="1.3" fill="var(--pm-text-primary)" opacity="1" />
    </svg>
  </div>
);

const PurpleOrb: React.FC<{ size?: string; glow?: boolean }> = ({
  size = "w-14 h-14 sm:w-16 sm:h-16",
  glow = true,
}) => (
  <div className={`relative ${size} shrink-0 flex items-center justify-center`}>
    <svg
      viewBox="0 0 60 60"
      className="w-full h-full overflow-visible"
      style={{
        filter: glow
          ? "drop-shadow(0 0 18px var(--pm-orb-purple-glow)) drop-shadow(0 0 32px var(--pm-glow))"
          : "none",
      }}
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="purple-sphere-grad" cx="40%" cy="38%" r="62%">
          <stop offset="0%" stopColor="var(--pm-text-primary)" stopOpacity="0.95" />
          <stop offset="14%" stopColor="var(--pm-orb-purple-highlight)" />
          <stop offset="42%" stopColor="var(--pm-orb-purple-base)" />
          <stop offset="78%" stopColor="var(--pm-orb-purple-dark)" />
          <stop offset="100%" stopColor="var(--pm-orb-purple-shadow)" />
        </radialGradient>
      </defs>
      {/* 3D Sphere Body */}
      <circle cx="30" cy="30" r="21" fill="url(#purple-sphere-grad)" />
      {/* Primary Specular Glint */}
      <circle cx="25" cy="23" r="3.2" fill="var(--pm-text-primary)" opacity="0.92" />
      <circle cx="24.5" cy="22.5" r="1.3" fill="var(--pm-text-primary)" opacity="1" />
    </svg>
  </div>
);

interface FusionStageProps {
  stageRef: React.RefObject<HTMLDivElement | null>;
  onReplay?: () => void;
  hasTriggered: boolean;
  fusionKey: number;
  isMobile: boolean;
}

const FusionStage: React.FC<FusionStageProps> = ({
  stageRef,
  onReplay,
  hasTriggered,
  fusionKey,
  isMobile,
}) => {
  const startX = isMobile ? 72 : 95;

  return (
    <div
      ref={stageRef}
      onClick={onReplay}
      className="relative w-full h-28 sm:h-32 flex items-center justify-center cursor-pointer select-none group"
      title="Click or tap to replay mixing"
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onReplay?.();
        }
      }}
    >
      {/* 1. Fluid Gliding Red Energy Orb */}
      <motion.div
        key={`red-${fusionKey}`}
        initial={{ x: -startX, opacity: 0, scale: 0.6 }}
        animate={
          hasTriggered
            ? {
                x: [-startX, 0],
                opacity: [0, 1, 0.85, 0],
                scale: [0.6, 1, 0.85, 0.2],
              }
            : {
                x: -startX,
                opacity: [0.45, 0.8, 0.45],
                scale: [0.75, 0.85, 0.75],
              }
        }
        transition={
          hasTriggered
            ? {
                duration: 1.1,
                ease: [0.22, 1, 0.36, 1],
              }
            : {
                duration: 2.4,
                repeat: Infinity,
                ease: "easeInOut",
              }
        }
        className="absolute z-20 pointer-events-none"
      >
        <div
          className="w-9 h-9 sm:w-11 sm:h-11 rounded-full"
          style={{
            background:
              "radial-gradient(circle at 35% 35%, var(--pm-text-primary) 0%, var(--pm-orb-red-highlight) 25%, var(--pm-orb-red-base) 65%, var(--pm-orb-red-dark) 100%)",
            boxShadow: "0 0 20px var(--pm-orb-red-glow)",
          }}
        />
      </motion.div>

      {/* 2. Fluid Gliding Blue Energy Orb */}
      <motion.div
        key={`blue-${fusionKey}`}
        initial={{ x: startX, opacity: 0, scale: 0.6 }}
        animate={
          hasTriggered
            ? {
                x: [startX, 0],
                opacity: [0, 1, 0.85, 0],
                scale: [0.6, 1, 0.85, 0.2],
              }
            : {
                x: startX,
                opacity: [0.45, 0.8, 0.45],
                scale: [0.75, 0.85, 0.75],
              }
        }
        transition={
          hasTriggered
            ? {
                duration: 1.1,
                ease: [0.22, 1, 0.36, 1],
              }
            : {
                duration: 2.4,
                repeat: Infinity,
                ease: "easeInOut",
              }
        }
        className="absolute z-20 pointer-events-none"
      >
        <div
          className="w-9 h-9 sm:w-11 sm:h-11 rounded-full"
          style={{
            background:
              "radial-gradient(circle at 35% 35%, var(--pm-text-primary) 0%, var(--pm-orb-blue-highlight) 25%, var(--pm-orb-blue-base) 65%, var(--pm-orb-blue-dark) 100%)",
            boxShadow: "0 0 20px var(--pm-orb-blue-glow)",
          }}
        />
      </motion.div>

      {/* 3. Soft Ambient Fusion Bloom at collision */}
      <motion.div
        key={`bloom-${fusionKey}`}
        initial={{ scale: 0.2, opacity: 0 }}
        animate={
          hasTriggered
            ? {
                scale: [0.2, 1.4, 0.7],
                opacity: [0, 0.75, 0],
              }
            : { scale: 0.2, opacity: 0 }
        }
        transition={{
          duration: 0.95,
          delay: 0.44,
          ease: "easeOut",
        }}
        className="absolute w-20 h-20 sm:w-24 sm:h-24 rounded-full pointer-events-none filter blur-md"
        style={{
          background: "radial-gradient(circle, var(--pm-accent) 0%, var(--pm-primary) 60%, transparent 100%)",
          boxShadow: "0 0 32px var(--pm-glow-strong)",
        }}
      />

      {/* 4. The 3D Purple Orb emerges and settles into a calm float */}
      <motion.div
        key={`purple-${fusionKey}`}
        initial={{ scale: hasTriggered ? 0 : 0.4, opacity: hasTriggered ? 0 : 0.2 }}
        animate={
          hasTriggered
            ? {
                scale: [0, 1.12, 1],
                opacity: [0, 1, 1],
              }
            : {
                scale: 0.85,
                opacity: 0.4,
              }
        }
        transition={{
          duration: 0.75,
          delay: 0.56,
          ease: [0.25, 1, 0.5, 1],
        }}
        className="relative z-10 flex items-center justify-center transition-transform duration-300 group-hover:scale-105 active:scale-95"
      >
        <motion.div
          animate={{
            y: [-3, 3, -3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <PurpleOrb size="w-14 h-14 sm:w-16 sm:h-16" />
        </motion.div>
      </motion.div>
    </div>
  );
};

export const Whypurple = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [fusionKey, setFusionKey] = useState(0);
  const [hasTriggered, setHasTriggered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const stageRef = useRef<HTMLDivElement>(null);
  const hasTriggeredRef = useRef(false);

  useEffect(() => {
    const updateMobile = () => setIsMobile(window.innerWidth < 640);
    updateMobile();
    window.addEventListener("resize", updateMobile, { passive: true });
    return () => window.removeEventListener("resize", updateMobile);
  }, []);

  // Dedicated observer & focal check: guarantees the purple mixing animation
  // fires right in front of the user when scrolled into view on mobile (and desktop)
  useEffect(() => {
    const stageEl = stageRef.current;
    if (!stageEl) return;

    const checkVisibility = () => {
      const rect = stageEl.getBoundingClientRect();
      const inView = rect.top < window.innerHeight * 0.85 && rect.bottom > window.innerHeight * 0.15;
      if (inView) {
        if (!hasTriggeredRef.current) {
          setHasTriggered(true);
          setFusionKey((k) => k + 1);
          hasTriggeredRef.current = true;
        }
      } else {
        if (rect.bottom < -60 || rect.top > window.innerHeight + 60) {
          hasTriggeredRef.current = false;
        }
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (!hasTriggeredRef.current) {
              setHasTriggered(true);
              setFusionKey((k) => k + 1);
              hasTriggeredRef.current = true;
            }
          } else {
            hasTriggeredRef.current = false;
          }
        });
      },
      {
        threshold: 0.35,
      }
    );

    observer.observe(stageEl);
    window.addEventListener("scroll", checkVisibility, { passive: true });
    checkVisibility();

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", checkVisibility);
    };
  }, []);

  const toggleExpand = () => {
    setIsExpanded((prev) => !prev);
  };

  const replayFusion = () => {
    setHasTriggered(true);
    setFusionKey((k) => k + 1);
  };

  return (
    <section
      id="story"
      aria-label="Why Purple Story Section"
      className="relative w-full bg-pm-bg text-pm-text-primary py-20 lg:py-28 px-4 sm:px-6 lg:px-8 overflow-hidden scroll-mt-20"
    >
      {/* Ambient Radial Spotlight */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] pointer-events-none rounded-full filter blur-[130px] opacity-15"
        style={{
          background: "radial-gradient(circle, var(--pm-primary) 0%, var(--pm-deep) 70%, transparent 100%)",
        }}
        aria-hidden="true"
      />

      <div className="relative w-full max-w-5xl mx-auto z-10">
        
        {/* Story Section Header */}
        <div className="flex flex-col items-center text-center mb-12 sm:mb-16">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-wide text-pm-text-primary font-nura mb-4">
            Why{" "}
            <span
              className="bg-gradient-to-r from-pm-light via-pm-accent to-pm-primary bg-clip-text text-transparent"
              style={{ filter: "drop-shadow(0 0 24px var(--pm-glow-strong))" }}
            >
              Purple?
            </span>
          </h2>

          {/* Subtitle */}
          <p className="text-sm sm:text-base md:text-lg text-pm-text-secondary font-poppins max-w-2xl mx-auto">
            Purple isn&apos;t just a colour for us — it represents what happens when two worlds meet.
          </p>
        </div>

        {/* Red & Blue Orb Concept Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-4xl mx-auto">
          
          {/* Red Card */}
          <div className="flex items-center gap-5 sm:gap-6 p-6 sm:p-7 rounded-3xl bg-pm-story-card-bg border border-pm-story-card-border hover:border-pm-story-card-hover backdrop-blur-md transition-all duration-300 shadow-2xl group">
            <RedOrb />
            <div>
              <h3 className="text-xl sm:text-2xl font-bold font-poppins text-pm-text-primary mb-1 tracking-tight">
                Red
              </h3>
              <p className="text-xs sm:text-sm text-pm-text-secondary font-poppins leading-relaxed">
                The youth: energetic, passionate, curious, and ready to create change.
              </p>
            </div>
          </div>

          {/* Blue Card */}
          <div className="flex items-center gap-5 sm:gap-6 p-6 sm:p-7 rounded-3xl bg-pm-story-card-bg border border-pm-story-card-border hover:border-pm-story-card-hover backdrop-blur-md transition-all duration-300 shadow-2xl group">
            <BlueOrb />
            <div>
              <h3 className="text-xl sm:text-2xl font-bold font-poppins text-pm-text-primary mb-1 tracking-tight">
                Blue
              </h3>
              <p className="text-xs sm:text-sm text-pm-text-secondary font-poppins leading-relaxed">
                Experienced professionals: steady, knowledgeable, and capable of unlocking new possibilities.
              </p>
            </div>
          </div>

        </div>

        {/* Centered Purple Card with Fusion Animation */}
        <div className="mt-6 sm:mt-8 max-w-4xl mx-auto">
          <div className="relative rounded-3xl bg-pm-story-card-bg border border-pm-story-card-border hover:border-pm-story-card-hover backdrop-blur-md p-6 sm:p-9 shadow-2xl transition-all duration-300">
            {/* Subtle Ambient Radial Highlight */}
            <div
              aria-hidden="true"
              className="absolute top-0 left-1/2 -translate-x-1/2 w-80 h-48 pointer-events-none rounded-full filter blur-3xl opacity-20"
              style={{
                background: "radial-gradient(circle, var(--pm-primary) 0%, transparent 70%)",
              }}
            />

            {/* Fusion Stage & Header */}
            <div className="relative z-10 flex flex-col items-center text-center">
              <FusionStage
                stageRef={stageRef}
                onReplay={replayFusion}
                hasTriggered={hasTriggered}
                fusionKey={fusionKey}
                isMobile={isMobile}
              />

              <h3 className="text-xl sm:text-2xl font-bold font-poppins text-pm-text-primary tracking-tight mt-2">
                Purple
              </h3>
              <p className="text-xs sm:text-sm text-pm-accent font-poppins mt-0.5">
                Where youth and experience meet.
              </p>
            </div>

            {/* Core Message Always Visible */}
            <div className="relative z-10 max-w-2xl mx-auto mt-4 text-center">
              <p className="text-xs sm:text-sm text-pm-text-secondary font-poppins leading-relaxed">
                When red and blue come together, they create purple — a symbol of collaboration, balance, and the future we want to build.
              </p>
            </div>

            {/* Expandable Extended Story Content */}
            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  id="why-purple-more"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <div className="relative z-10 max-w-2xl mx-auto space-y-5 font-poppins text-pm-text-secondary text-sm sm:text-base leading-relaxed text-left border-t border-pm-border/30 pt-6 mt-5">
                    <p>
                      Today, a gap exists between these two groups. Young innovators full of energy and fresh ideas rarely have a direct bridge to experienced mentors, while industry leaders look for curiosity and talent to guide forward.
                    </p>

                    <p className="text-pm-text-primary font-medium text-base">
                      We aim to bridge that gap.
                    </p>

                    <ul className="space-y-2.5 pl-5 list-disc marker:text-pm-accent">
                      <li>
                        A place where young minds can prove that change is possible and necessary.
                      </li>
                      <li>
                        A place where experts can guide, inspire, and open doors to new opportunities.
                      </li>
                      <li>
                        A place where everyone can be themselves, grow together, and lift each other up.
                      </li>
                    </ul>

                    <p>
                      And that thought every person has felt at least once:{" "}
                      <span className="italic text-pm-text-primary">
                        &quot;If only there was a place where I could learn, connect, and be understood.&quot;
                      </span>
                    </p>

                    <p className="pt-1 font-semibold text-pm-text-primary">
                      Purple Movement is here to make that place real.
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Expand / Collapse Action inside card */}
            <div className="relative z-10 mt-6 flex justify-center">
              <button
                onClick={toggleExpand}
                aria-expanded={isExpanded}
                aria-controls="why-purple-more"
                className="group inline-flex items-center gap-2 px-5 py-2 rounded-full border border-pm-primary/40 bg-pm-card hover:bg-pm-card-hover hover:border-pm-accent text-xs font-semibold tracking-wider text-pm-text-primary uppercase transition-all duration-300 shadow-[0_0_12px_var(--pm-glow)] hover:shadow-[0_0_18px_var(--pm-glow)] cursor-pointer backdrop-blur-md"
              >
                <span>{isExpanded ? "READ LESS" : "READ MORE"}</span>
                {isExpanded ? (
                  <ChevronUp className="w-3.5 h-3.5 text-pm-accent group-hover:-translate-y-0.5 transition-transform" />
                ) : (
                  <ChevronDown className="w-3.5 h-3.5 text-pm-accent group-hover:translate-y-0.5 transition-transform" />
                )}
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Whypurple;