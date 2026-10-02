"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export const Manifesto = () => {
  return (
    <section className="w-full bg-pm-bg-dark text-pm-text-primary py-20 px-6 md:px-12 lg:px-20 border-t border-pm-card-border">
      <div className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
        <div className="lg:col-span-4 relative">
          <div className="lg:sticky lg:top-32">
            <h2 className="text-5xl md:text-7xl font-bold font-nura tracking-wide leading-[0.9] mb-5">
              MANI
              <br />
              FESTO<span className="text-pm-accent">.</span>
            </h2>
            <div className="h-1.5 w-16 bg-pm-primary mb-6 rounded-full" />
            <p className="text-base text-pm-text-secondary font-poppins max-w-xs leading-relaxed">
              A declaration of our purpose, our power, and the future we are
              building together.
            </p>
          </div>
        </div>

        <div className="lg:col-span-8 space-y-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <h3 className="text-2xl md:text-3xl font-bold font-poppins mb-4 text-pm-text-primary">
              The Manifestors
            </h3>
            <p className="text-base md:text-lg text-pm-text-secondary font-poppins leading-relaxed border-l border-pm-border-hover pl-5">
              We are the Manifestors of Change. Not waiting for the future, but
              building it with{" "}
              <span className="text-pm-text-primary font-medium">
                courage, code, creativity, and clarity
              </span>
              . We are the voice of a generation that refuses to settle.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <h3 className="text-2xl md:text-3xl font-bold font-poppins mb-4 text-pm-text-primary">
              The Producers
            </h3>
            <p className="text-base md:text-lg text-pm-text-secondary font-poppins leading-relaxed border-l border-pm-border-hover pl-5">
              We are not consumers of culture;{" "}
              <span className="text-pm-text-primary font-medium">
                we are producers of purpose.
              </span>{" "}
              We break barriers for every young mind daring to dream. We believe
              in ecosystems that empower, not limit.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="py-4"
          >
            <p className="text-2xl md:text-4xl font-bold font-poppins leading-tight text-pm-text-primary">
              In access, not gatekeeping.
              <br />
              In bold visions, not borrowed templates.
            </p>
            <p className="mt-4 text-base md:text-lg text-pm-text-secondary font-poppins">
              We are here to reclaim the narrative. To give confidence to the
              curious, networks to the bold, and direction to the determined.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative overflow-hidden rounded-2xl bg-pm-deep/20 p-6 md:p-10 border border-pm-border backdrop-blur-sm shadow-xl"
          >
            <span className="text-xs md:text-sm font-semibold text-pm-accent mb-3 uppercase tracking-widest block font-poppins">
              The Movement
            </span>
            <p className="text-2xl md:text-4xl font-bold font-poppins text-pm-text-primary leading-tight mb-3">
              This is <span className="text-pm-accent">The Purple Movement.</span>
            </p>
            <p className="text-base md:text-lg text-pm-text-secondary font-poppins">
              A wave of youth power, purpose, and possibility. A signal that
              change is not coming—it&apos;s already here.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="pt-4"
          >
            <p className="text-3xl md:text-5xl font-bold font-poppins tracking-tight text-pm-text-primary leading-tight">
              We are the energy.
              <br />
              We are the strategy.
              <br />
              We are the spark.
            </p>
            <Link
              href="/join"
              className="mt-6 text-lg sm:text-xl font-semibold text-pm-accent font-poppins inline-flex items-center gap-2 hover:gap-3 hover:text-pm-primary-hover transition-all duration-300 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pm-accent rounded-md py-1"
            >
              <span>And it starts now</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
