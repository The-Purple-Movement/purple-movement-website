"use client";

import React from "react";
import { motion } from "framer-motion";
import { Target, Users } from "lucide-react";

export const VisionMission = () => {
  return (
    <section
      id="about"
      aria-label="Vision and Mission Section"
      className="relative w-full bg-pm-bg text-pm-text-primary py-20 lg:py-28 px-4 sm:px-6 lg:px-8 overflow-hidden scroll-mt-20"
    >
      {/* Background Atmosphere */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[450px] pointer-events-none rounded-full filter blur-[140px] opacity-15"
        style={{
          background: "radial-gradient(circle, var(--pm-primary) 0%, var(--pm-deep) 70%, transparent 100%)",
        }}
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto z-10">
        <div className="relative grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-14 lg:gap-16 xl:gap-20">
          
          {/* Subtle Vertical Divider between Columns (Desktop) */}
          <div
            className="hidden md:block absolute left-1/2 top-4 bottom-4 w-[1px] -translate-x-1/2 pointer-events-none"
            style={{
              background:
                "linear-gradient(180deg, transparent 0%, var(--pm-border) 25%, var(--pm-border-hover) 50%, var(--pm-border) 75%, transparent 100%)",
            }}
            aria-hidden="true"
          />

          {/* Vision: Our Goal */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col justify-start md:pr-4 lg:pr-8"
          >
            {/* Tagline Row */}
            <div className="flex items-center gap-3.5 mb-6">
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl flex items-center justify-center bg-pm-icon-box-bg border border-pm-icon-box-border text-pm-accent shadow-[0_0_14px_var(--pm-glow)] backdrop-blur-md shrink-0">
                <Target className="w-5 h-5 stroke-[1.8]" />
              </div>
              <div
                className="h-[1.5px] w-12 rounded-full"
                style={{
                  background: "linear-gradient(90deg, var(--pm-primary) 0%, transparent 100%)",
                  boxShadow: "0 0 8px var(--pm-glow)",
                }}
              />
              <span className="text-xs font-semibold tracking-[0.25em] text-pm-text-muted uppercase font-mono">
                OUR GOAL
              </span>
            </div>

            {/* Headline */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-wide text-pm-text-primary leading-[1.15] mb-6 font-nura">
              A more inclusive<br />
              and{" "}
              <span
                className="bg-gradient-to-r from-pm-light via-pm-accent to-pm-primary bg-clip-text text-transparent"
                style={{ filter: "drop-shadow(0 0 20px var(--pm-glow))" }}
              >
                opportunity-rich
              </span>{" "}
              world.
            </h2>

            {/* Narrative Copy */}
            <p className="text-sm sm:text-base text-pm-text-secondary font-poppins leading-relaxed max-w-xl">
              A world where privilege, place, and access never decide opportunity, and learning is
              inclusive and recognized through real contributions — helping everyone learn, connect,
              and create lasting impact.
            </p>
          </motion.div>

          {/* Mobile Divider */}
          <div className="block md:hidden w-full h-[1px] bg-gradient-to-r from-transparent via-pm-border-hover to-transparent my-2" />

          {/* Mission: Our Purpose */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col justify-start md:pl-4 lg:pl-8"
          >
            {/* Tagline Row */}
            <div className="flex items-center gap-3.5 mb-6">
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl flex items-center justify-center bg-pm-icon-box-bg border border-pm-icon-box-border text-pm-accent shadow-[0_0_14px_var(--pm-glow)] backdrop-blur-md shrink-0">
                <Users className="w-5 h-5 stroke-[1.8]" />
              </div>
              <div
                className="h-[1.5px] w-12 rounded-full"
                style={{
                  background: "linear-gradient(90deg, var(--pm-primary) 0%, transparent 100%)",
                  boxShadow: "0 0 8px var(--pm-glow)",
                }}
              />
              <span className="text-xs font-semibold tracking-[0.25em] text-pm-text-muted uppercase font-mono">
                OUR PURPOSE
              </span>
            </div>

            {/* Headline */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-wide text-pm-text-primary leading-[1.15] mb-6 font-nura">
              People powering<br />
              a{" "}
              <span
                className="bg-gradient-to-r from-pm-light via-pm-accent to-pm-primary bg-clip-text text-transparent"
                style={{ filter: "drop-shadow(0 0 20px var(--pm-glow))" }}
              >
                brighter future.
              </span>
            </h2>

            {/* Narrative Copy */}
            <p className="text-sm sm:text-base text-pm-text-secondary font-poppins leading-relaxed max-w-xl">
              To build a people-powered network that breaks barriers and empowers students,
              professionals, and changemakers to go beyond syllabus, borders, and gatekeepers —
              turning curiosity into meaningful impact.
            </p>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default VisionMission;
