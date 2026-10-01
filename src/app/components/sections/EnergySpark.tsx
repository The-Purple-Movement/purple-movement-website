"use client";

import Image from "next/image";
import React from "react";

export const EnergySpark = () => {
  return (
    <section className="relative w-full bg-black text-white py-20 md:py-28 px-6 md:px-12 lg:px-20 overflow-hidden">
      <div className="max-w-[1280px] mx-auto relative">
        {/* Big purple "P" mark with dashed ring */}
        <div className="absolute right-[5%] top-0 w-[34%] max-w-[480px] z-0 pointer-events-none select-none">
          <div className="relative aspect-[358/501]">
            <Image src="/logos/p-mark.png" alt="" fill className="object-contain" />
            <div
              className="absolute rounded-full border-2 border-dashed border-white/50"
              style={{
                left: "26.5%",
                top: "34.7%",
                width: "44.1%",
                height: "31.5%",
              }}
            />
          </div>
        </div>

        <div className="relative z-10 flex flex-col">
          {/* This is The Purple Movement */}
          <div className="max-w-[260px] sm:max-w-[300px] md:max-w-[360px] pt-2">
            <h3 className="text-4xl sm:text-5xl md:text-6xl font-extrabold font-montserrat leading-tight">
              This is
              <br />
              <span className="bg-gradient-to-r from-[#7F39FD] to-[#DA9EFD] bg-clip-text text-transparent">
                The Purple Movement.
              </span>
            </h3>
            <p className="mt-4 text-sm md:text-base text-gray-400 font-poppins">
              A wave of youth power, purpose, and possibility. A signal that
              change is not coming—it&apos;s already here.
            </p>
            <div className="mt-8 h-px w-full bg-white/15" />
          </div>

          {/* Ghost watermark text */}
          <div
            aria-hidden
            className="mt-16 sm:mt-20 md:mt-24 lg:mt-28 flex justify-between pointer-events-none select-none"
          >
            <span className="flex-shrink-0 whitespace-nowrap font-montserrat font-black uppercase text-white/[0.06] text-[13vw] sm:text-[10vw] md:text-[7vw] lg:text-[7.5vw] leading-none">
              We are
            </span>
            <span className="flex-shrink-0 whitespace-nowrap font-montserrat font-black uppercase text-white/[0.06] text-[13vw] sm:text-[10vw] md:text-[7vw] lg:text-[7.5vw] leading-none">
              The
            </span>
          </div>

          {/* Energy / Strategy / Spark */}
          <div className="mt-8 sm:mt-10 flex justify-end text-right">
            <div>
              <p className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-montserrat leading-tight">
                ENERGY.
              </p>
              <p className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-montserrat leading-tight">
                STRATEGY.
              </p>
              <p className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-montserrat leading-tight">
                SPARK.
              </p>
              <p className="mt-3 text-purple-500 font-semibold tracking-wide font-poppins text-sm sm:text-base">
                AND IT STARTS NOW
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
