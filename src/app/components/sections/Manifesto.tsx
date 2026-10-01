"use client";

import React from "react";

export const Manifesto = () => {
  return (
    <section className="relative w-full bg-black text-white py-20 md:py-28 px-6 md:px-12 lg:px-20 overflow-hidden">
      <div className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
        {/* Left: Manifesto heading */}
        <div className="lg:col-span-4">
          <h2 className="text-5xl md:text-6xl font-extrabold font-montserrat leading-[0.95] tracking-tight">
            MANI
            <br />
            FESTO<span className="text-purple-600">.</span>
          </h2>
          <div className="h-[3px] w-14 bg-purple-600 my-5" />
          <p className="text-sm text-gray-400 font-poppins max-w-[220px] leading-relaxed">
            A declaration of our purpose, our power, and the future we are
            building.
          </p>
        </div>

        {/* Right: manifesto copy + movement feature block */}
        <div className="lg:col-span-8">
          <p className="text-lg md:text-xl lg:text-[26px] leading-[1.55] font-poppins font-light text-gray-300">
            We are the Manifestors of Change. Not waiting for the future, but
            building it with{" "}
            <span className="text-purple-400 font-semibold">
              courage, code, creativity, and clarity
            </span>
            . We are the voice of a generation that refuses to settle. We are
            not consumers of culture;{" "}
            <span className="text-purple-400 font-semibold">
              we are producers of purpose.
            </span>{" "}
            We break barriers for every young mind daring to dream. We believe
            in ecosystems that empower, not limit.{" "}
            <span className="text-purple-400 font-semibold">
              In access, not gatekeeping. In bold visions, not borrowed
              templates.
            </span>{" "}
            We are here to reclaim the narrative. To give confidence to the
            curious, networks to the bold, and direction to the determined.
          </p>
        </div>
      </div>
    </section>
  );
};
