"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { motion, useInView, AnimatePresence } from "framer-motion";

interface StatItem {
  icon: React.ReactNode;
  value: string;
  label: string;
}

interface FeatureItem {
  icon: React.ReactNode;
  title: string;
  desc: string;
}

interface FlagshipEventData {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  stats: StatItem[];
  features: FeatureItem[];
  ctaText: string;
  link: string;
  imageSrc: string;
  imageAlt: string;
}

const flagshipEvents: FlagshipEventData[] = [
  {
    id: "01",
    title: "AI + Compassion",
    subtitle: "Global Forum 2026 · Kyoto & Global Relay",
    description:
      "AI + Compassion is Purple Movement's most ambitious international initiative — a 24-hour global conversation exploring how artificial intelligence can serve humanity and the planet. Uniting innovators, policymakers, and cultural leaders across 12 world regions, the forum asks how technology and nature can thrive together.",
    stats: [
      {
        icon: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
          </svg>
        ),
        value: "24h",
        label: "Continuous Relay",
      },
      {
        icon: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="2" y1="12" x2="22" y2="12" />
            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
          </svg>
        ),
        value: "12",
        label: "World Regions",
      },
      {
        icon: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
          </svg>
        ),
        value: "28+",
        label: "Global Leaders",
      },
    ],
    features: [
      {
        icon: (
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
            <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
            <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
          </svg>
        ),
        title: "Harmony Across Systems",
        desc: "Designing AI to coexist with natural ecosystems.",
      },
      {
        icon: (
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
            <path d="M21.42 10.922a1 1 0 0 0-.019-.838L12.83 3.18a2 2 0 0 0-1.66 0L2.6 10.084a1 1 0 0 0 0 1.832l8.57 6.908a2 2 0 0 0 1.66 0l8.57-6.908a1 1 0 0 0 .02-.832z" />
            <path d="M6 12v5c0 1.66 2.69 3 6 3s6-1.34 6-3v-5" />
          </svg>
        ),
        title: "Education for Co-Flourishing",
        desc: "Cultivating AI literacy and eco-social awareness.",
      },
      {
        icon: (
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
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            <path d="m9 12 2 2 4-4" />
          </svg>
        ),
        title: "Trust & Accountability",
        desc: "Closing the trust gap through ethics and transparency.",
      },
    ],
    ctaText: "Explore AI + Compassion",
    link: "https://compassionai.io/",
    imageSrc: "/images/aic.webp",
    imageAlt: "AI + Compassion Global Forum 2026 — Purple Movement",
  },
  {
    id: "02",
    title: "Beyond Syllabus",
    subtitle: "AI-Powered University Learning Guide",
    description:
      "Beyond Syllabus is Purple Movement's flagship open-source education platform that reimagines how students navigate their university curriculum. With AI-driven insights, structured subject breakdowns, and an interactive chat interface, it puts the complete learning roadmap at students' fingertips — making higher education more accessible and less overwhelming.",
    stats: [
      {
        icon: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
            <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
          </svg>
        ),
        value: "100%",
        label: "Open Source",
      },
      {
        icon: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 4.44-2.04" />
            <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-4.44-2.04" />
          </svg>
        ),
        value: "AI",
        label: "Powered",
      },
      {
        icon: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M21.42 10.922a1 1 0 0 0-.019-.838L12.83 3.18a2 2 0 0 0-1.66 0L2.6 10.084a1 1 0 0 0 0 1.832l8.57 6.908a2 2 0 0 0 1.66 0l8.57-6.908a1 1 0 0 0 .02-.832z" />
            <path d="M6 12v5c0 1.66 2.69 3 6 3s6-1.34 6-3v-5" />
          </svg>
        ),
        value: "KTU",
        label: "University Coverage",
      },
    ],
    features: [
      {
        icon: (
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
            <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
            <polyline points="14 2 14 8 20 8" />
            <line x1="16" y1="13" x2="8" y2="13" />
            <line x1="16" y1="17" x2="8" y2="17" />
            <line x1="10" y1="9" x2="8" y2="9" />
          </svg>
        ),
        title: "Structured Syllabus",
        desc: "Complete curriculum broken down.",
      },
      {
        icon: (
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
            <line x1="18" y1="20" x2="18" y2="10" />
            <line x1="12" y1="20" x2="12" y2="4" />
            <line x1="6" y1="20" x2="6" y2="14" />
          </svg>
        ),
        title: "AI-Powered Insights",
        desc: "Concise module summaries and key concepts.",
      },
      {
        icon: (
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
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
          </svg>
        ),
        title: "Community Driven",
        desc: "Open-source and student contributions.",
      },
    ],
    ctaText: "Explore Beyond Syllabus",
    link: "https://wiki-syllabus.vercel.app/",
    imageSrc: "/images/beyondsylabbus.webp",
    imageAlt: "Beyond Syllabus — AI-Powered University Learning Guide by Purple Movement",
  },
];

export default function FlagshipEvents() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-60px" });

  const currentEvent = flagshipEvents[currentIndex];
  const nextIndex = (currentIndex + 1) % flagshipEvents.length;
  const nextEvent = flagshipEvents[nextIndex];

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev === 0 ? flagshipEvents.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev === flagshipEvents.length - 1 ? 0 : prev + 1));
  };

  return (
    <section
      ref={sectionRef}
      id="flagship-events"
      className="relative w-full py-20 lg:py-28 overflow-hidden bg-pm-bg-dark scroll-mt-20"
      aria-labelledby="flagship-events-heading"
    >
      {/* Background ambient lighting */}
      <div
        aria-hidden="true"
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[350px] pointer-events-none opacity-40 blur-3xl"
        style={{
          background: "radial-gradient(ellipse at center, var(--pm-primary) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 w-full max-w-6xl xl:max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex flex-col items-center text-center mb-12 sm:mb-16"
        >
          {/* Top rule line badge */}
          <div className="flex items-center justify-center gap-3 sm:gap-4 mb-3">
            <span className="w-10 sm:w-16 h-px bg-pm-card-border" />
            <span className="text-xs font-semibold tracking-widest uppercase text-pm-accent">
              Flagship Initiatives
            </span>
            <span className="w-10 sm:w-16 h-px bg-pm-card-border" />
          </div>

          {/* Heading */}
          <h2
            id="flagship-events-heading"
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-pm-text-primary tracking-wide leading-tight font-nura"
          >
            Our Landmark <span className="text-pm-accent">Projects</span>
          </h2>

          {/* Subtitle */}
          <p className="max-w-2xl text-pm-text-secondary text-sm sm:text-base leading-relaxed mt-3">
            Beyond hackathons and meetups — these are Purple Movement&apos;s signature
            platforms that have created real, lasting impact for students, technologists,
            and communities worldwide.
          </p>
        </motion.div>

        {/* Card Deck Wrapper with Cascading Stacked Cards */}
        <div className="relative w-full pr-5 sm:pr-10 md:pr-14 lg:pr-22 xl:pr-26">
          {/* Deepest Stacked Card (Layer 2 - Deck base depth) */}
          <div
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none rounded-3xl border-2 border-pm-border-hover/70 bg-pm-card/65 backdrop-blur-xl transition-all duration-500 ease-out translate-x-5 sm:translate-x-10 md:translate-x-14 lg:translate-x-20 xl:translate-x-24 translate-y-3 sm:translate-y-4.5 lg:translate-y-5.5 scale-[0.97] lg:scale-[0.96] rotate-[1deg] lg:rotate-[2deg] opacity-80 sm:opacity-90"
            style={{
              boxShadow: "0 0 45px var(--pm-glow-strong)",
            }}
          >
            {/* Glowing neon accent edge indicator on Layer 2 */}
            <div className="absolute right-2 sm:right-3.5 top-1/2 -translate-y-1/2 w-1 sm:w-1.5 h-24 sm:h-36 rounded-full bg-gradient-to-b from-pm-accent via-pm-light to-pm-primary opacity-80 shadow-[0_0_14px_var(--pm-glow-strong)]" />
          </div>

          {/* Next Event Stacked Card (Layer 1 - Interactive Cascading Card) */}
          <div
            role="button"
            tabIndex={0}
            onClick={handleNext}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                handleNext();
              }
            }}
            aria-label={`View next project: ${nextEvent.title}`}
            className="group/stack absolute inset-0 z-10 cursor-pointer rounded-3xl border-2 border-pm-border-hover hover:border-pm-accent bg-pm-card/75 hover:bg-pm-card/90 backdrop-blur-2xl transition-all duration-300 ease-out translate-x-3 sm:translate-x-6 md:translate-x-8 lg:translate-x-11 xl:translate-x-13 translate-y-1.5 sm:translate-y-2.5 lg:translate-y-3 scale-[0.985] lg:scale-[0.98] rotate-[0.5deg] lg:rotate-[1deg] hover:translate-x-4.5 sm:hover:translate-x-8 lg:hover:translate-x-14 xl:hover:translate-x-16 overflow-hidden"
            style={{
              boxShadow: "0 0 45px var(--pm-glow)",
            }}
          >
            {/* Background image preview of next event */}
            <div className="absolute inset-0 opacity-25 filter blur-xs pointer-events-none transition-opacity duration-300 group-hover/stack:opacity-40">
              <Image
                src={nextEvent.imageSrc}
                alt=""
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 42vw"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-l from-pm-card/90 via-pm-card/70 to-pm-bg-dark/80"
              />
            </div>

            {/* Exposed right teaser strip */}
            <div className="absolute right-0 top-0 bottom-0 w-9 sm:w-14 lg:w-18 xl:w-20 flex flex-col items-center justify-between py-5 sm:py-9 pointer-events-none select-none z-10 border-l border-pm-border-hover/60 bg-pm-card/85 backdrop-blur-md">
              {/* Next event ID badge */}
              <div className="flex flex-col items-center gap-2">
                <span className="px-2 py-0.5 rounded-full border border-pm-accent/50 bg-pm-primary/25 text-[10px] sm:text-xs font-mono font-bold text-pm-light shadow-[0_0_10px_var(--pm-glow)] transition-colors duration-200 group-hover/stack:border-pm-accent group-hover/stack:text-white">
                  {nextEvent.id}
                </span>
                <span className="w-4 h-[1.5px] bg-pm-accent/60" />
              </div>

              {/* Vertical orientation text */}
              <div className="flex items-center justify-center my-auto py-3">
                <span
                  className="text-[10px] sm:text-xs tracking-[0.25em] uppercase font-bold text-pm-text-secondary transition-colors duration-200 group-hover/stack:text-pm-text-primary whitespace-nowrap drop-shadow-[0_0_8px_var(--pm-glow)]"
                  style={{
                    writingMode: "vertical-rl",
                    textOrientation: "mixed",
                    transform: "rotate(180deg)",
                  }}
                >
                  NEXT: {nextEvent.title}
                </span>
              </div>

              {/* Arrow Indicator */}
              <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full border border-pm-border-hover bg-pm-primary/20 flex items-center justify-center text-pm-accent transition-all duration-300 group-hover/stack:text-white group-hover/stack:bg-pm-primary group-hover/stack:border-pm-accent group-hover/stack:scale-110 shadow-[0_0_12px_var(--pm-glow)]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </div>
            </div>
          </div>

          {/* Unified Active Card Container */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
            className="relative z-20 w-full rounded-3xl border border-pm-card-border bg-pm-card/90 sm:bg-pm-card/95 backdrop-blur-2xl p-5 sm:p-7 lg:p-8"
            style={{
              boxShadow: "0 0 50px var(--pm-glow)",
            }}
          >
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentIndex}
              custom={direction}
              initial={{ opacity: 0, x: direction * 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -direction * 20 }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-10 items-stretch"
            >
              {/* Left Column: Event Image */}
              <div className="lg:col-span-5 relative w-full h-[320px] sm:h-[380px] lg:h-full min-h-[320px] lg:min-h-[460px] rounded-2xl overflow-hidden border border-pm-card-border/60 bg-pm-bg-dark">
                <Image
                  src={currentEvent.imageSrc}
                  alt={currentEvent.imageAlt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 42vw"
                  priority
                />

                {/* Subtle bottom fade */}
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-pm-bg-dark/60 via-transparent to-transparent pointer-events-none"
                />
              </div>

              {/* Right Column: Event Content */}
              <div className="lg:col-span-7 flex flex-col justify-between py-1">
                {/* Top Row: Index number & Navigation arrows */}
                <div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <span className="text-xs font-mono text-pm-text-muted">
                        {currentEvent.id}
                      </span>
                      <span className="w-8 h-px bg-pm-card-border" />
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={handlePrev}
                        aria-label="Previous flagship project"
                        className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border border-pm-card-border bg-pm-card/60 flex items-center justify-center text-pm-text-secondary hover:text-pm-text-primary hover:border-pm-accent transition-colors duration-200 cursor-pointer"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          aria-hidden="true"
                        >
                          <path d="m15 18-6-6 6-6" />
                        </svg>
                      </button>
                      <button
                        type="button"
                        onClick={handleNext}
                        aria-label="Next flagship project"
                        className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border border-pm-card-border bg-pm-card/60 flex items-center justify-center text-pm-text-secondary hover:text-pm-text-primary hover:border-pm-accent transition-colors duration-200 cursor-pointer"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          aria-hidden="true"
                        >
                          <path d="m9 18 6-6-6-6" />
                        </svg>
                      </button>
                    </div>
                  </div>

                  {/* Title & Subtitle */}
                  <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-pm-text-primary tracking-wide mt-3 font-nura">
                    {currentEvent.title}
                  </h3>
                  <p className="text-xs sm:text-sm font-semibold text-pm-text-primary/90 mt-1">
                    {currentEvent.subtitle}
                  </p>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-pm-text-secondary leading-relaxed mt-3">
                    {currentEvent.description}
                  </p>

                  {/* Stats Row (3 Pill Cards) */}
                  <div className="grid grid-cols-3 gap-2.5 sm:gap-3.5 mt-5 sm:mt-6">
                    {currentEvent.stats.map((stat, i) => (
                      <div
                        key={i}
                        className="rounded-xl border border-pm-card-border bg-pm-card/40 p-2.5 sm:p-3.5 flex items-center gap-2.5 sm:gap-3"
                      >
                        <div className="text-pm-accent shrink-0">
                          {stat.icon}
                        </div>
                        <div className="min-w-0">
                          <p className="text-xs sm:text-sm md:text-base font-bold text-pm-text-primary leading-tight truncate">
                            {stat.value}
                          </p>
                          <p className="text-[10px] sm:text-[11px] text-pm-text-muted leading-tight mt-0.5 truncate">
                            {stat.label}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Features Row (3 Columns) */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mt-5 sm:mt-6">
                    {currentEvent.features.map((feature, i) => (
                      <div key={i} className="flex items-start gap-2.5">
                        <div className="text-pm-accent shrink-0 mt-0.5">
                          {feature.icon}
                        </div>
                        <div className="min-w-0">
                          <p className="text-xs font-semibold text-pm-text-primary leading-tight">
                            {feature.title}
                          </p>
                          <p className="text-[11px] text-pm-text-muted leading-relaxed mt-1">
                            {feature.desc}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom CTA Button */}
                <div className="mt-6 sm:mt-8">
                  <a
                    href={currentEvent.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    id={`flagship-cta-${currentEvent.id}`}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-xs sm:text-sm font-semibold text-pm-text-primary bg-pm-primary hover:bg-pm-primary-hover shadow-[var(--pm-glow)] hover:shadow-[var(--pm-glow-strong)] transition-all duration-200 cursor-pointer"
                  >
                    <span>{currentEvent.ctaText}</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M7 7h10v10" />
                      <path d="M7 17 17 7" />
                    </svg>
                  </a>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>
        </div>
      </div>
    </section>
  );
}

export { FlagshipEvents };
