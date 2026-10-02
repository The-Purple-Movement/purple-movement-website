"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export function Hero2() {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  return (
    <section id="hero" className="relative w-full min-h-screen flex items-center overflow-hidden bg-pm-bg">
      {/* Background Cosmic Planet Image */}
      <div className="absolute inset-0 w-full h-full select-none pointer-events-none">
        <Image
          src="/image.webp"
          alt="The Purple Movement — Cosmic Planet with Glowing Orbit"
          fill
          priority
          quality={95}
          className="hidden sm:block object-cover object-right lg:object-center"
          sizes="100vw"
        />

        {/* Ambient WebP Animation Overlay layered over image.webp tilted 20 degrees */}
        <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
          <picture>
            <source srcSet="/videos/hero-bg.webp" type="image/webp" />
            <img
              src="/videos/hero-bg.webp"
              alt=""
              aria-hidden="true"
              className="absolute sm:pt-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full min-w-full min-h-full object-cover object-[center_75%] sm:object-center mix-blend-screen pointer-events-none opacity-90 sm:opacity-60 md:opacity-25 scale-110 sm:scale-125 md:scale-[1.4] lg:scale-[1] rotate-0 md:rotate-[-15deg] [mask-image:radial-gradient(ellipse_at_center,black_75%,transparent_100%)]"
            />
          </picture>
        </div>

        {/* Left darkening gradient overlay for high contrast text readability */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-r from-pm-bg via-pm-bg/15 to-transparent w-full lg:w-3/4 pointer-events-none z-[1]"
        />

        {/* Top subtle vignette */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-pm-bg/90 to-transparent pointer-events-none z-[1]"
        />

        {/* Bottom subtle blend fade into next section */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-pm-bg to-transparent pointer-events-none z-[1]"
        />

        {/* Ambient atmospheric purple glow */}
        <div
          aria-hidden="true"
          className="absolute top-1/3 left-1/4 w-[420px] h-[420px] rounded-full blur-[140px] pointer-events-none z-[1]"
          style={{
            background: "radial-gradient(circle, var(--pm-primary) 0%, transparent 70%)",
            opacity: 0.25,
          }}
        />
      </div>

      {/* Hero Content Container */}
      <div className="relative z-10 w-full max-w-8xl mx-auto px-6 sm:px-10 lg:px-16 xl:px-20 pt-28 pb-20 flex items-center min-h-screen">
        <div className="max-w-xl lg:max-w-2xl text-left">
          {/* Eyebrow Label with Right Accent Line */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-3.5 mb-4"
          >
            <span className="text-sm sm:text-base font-semibold tracking-[0.22em] uppercase text-pm-text-secondary font-poppins">
              We Are The
            </span>
            <span className="w-12 sm:w-16 h-px bg-pm-card-border" />
          </motion.div>

          {/* Main Title Stack */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col select-none"
          >
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black uppercase tracking-wide text-pm-text-primary leading-[0.92] font-nura">
              Purple
            </h1>
            <span
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black uppercase tracking-wide leading-[0.92] font-nura mt-1"
              style={{
                background:
                  "linear-gradient(180deg, var(--pm-light) 0%, var(--pm-accent) 45%, var(--pm-primary) 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Movement
            </span>
          </motion.div>

          {/* Subtext Paragraph */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="text-base sm:text-base md:text-lg text-pm-text-secondary leading-relaxed font-poppins max-w-lg mt-6 text-pretty"
          >
            Where purposeful people gather to explore, tackle issues, and create
            meaningful change. A community without barriers, where your skills
            matter and open new possibilities.
          </motion.p>

          {/* Action Buttons Row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-wrap items-center gap-4 sm:gap-6 mt-8"
          >
            {/* Join Us Button */}
            <Link
              href="/join"
              id="hero2-join-btn"
              className="inline-flex items-center justify-center gap-4 px-7 py-4.5 rounded-xl text-sm sm:text-base font-bold tracking-wider uppercase text-pm-text-primary bg-pm-primary hover:bg-pm-primary-hover shadow-[var(--pm-glow)] hover:shadow-[var(--pm-glow-strong)] transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer w-full"
            >
              <span>Join Us</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </Link>

            {/* Watch Our Story Trigger */}
            {/* <button
              type="button"
              id="hero2-watch-story-btn"
              onClick={() => setIsVideoModalOpen(true)}
              className="inline-flex items-center gap-3 group text-xs sm:text-sm font-medium text-pm-text-secondary hover:text-pm-text-primary transition-colors cursor-pointer"
              aria-label="Watch Our Story Video"
            >
              <span className="w-10 h-10 rounded-full border border-pm-card-border bg-pm-card/60 backdrop-blur-md flex items-center justify-center text-pm-text-primary group-hover:border-pm-accent group-hover:text-pm-accent group-hover:scale-105 transition-all duration-200 shadow-sm">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="13"
                  height="13"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                  className="translate-x-0.5"
                >
                  <polygon points="6 3 20 12 6 21 6 3" />
                </svg>
              </span>
              <span>Watch Our Story</span>
            </button> */}
          </motion.div>
        </div>
      </div>

      {/* Video Modal Popup */}
      <AnimatePresence>
        {isVideoModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-pm-bg/85 backdrop-blur-md"
            onClick={() => setIsVideoModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative w-full max-w-4xl rounded-2xl overflow-hidden border border-pm-card-border bg-pm-card shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Modal Button */}
              <button
                type="button"
                onClick={() => setIsVideoModalOpen(false)}
                className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-pm-bg/70 border border-pm-card-border text-pm-text-primary hover:text-pm-accent hover:border-pm-accent flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Close video modal"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>

              <div className="relative aspect-video w-full bg-pm-bg">
                <video
                  controls
                  autoPlay
                  playsInline
                  preload="metadata"
                  className="w-full h-full object-cover"
                >
                  <source src="/videos/hero-bg.webm" type="video/webm" />
                  <source src="/videos/hero-bg.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

export default Hero2;
