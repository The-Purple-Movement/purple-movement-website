"use client";

import Link from "next/link";
import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface FAQItem {
  question: string;
  answer: string | React.ReactNode;
}

const FAQs: FAQItem[] = [
  {
    question: "What is The Purple Movement?",
    answer:
      "The Purple Movement is where curious, purpose-driven people come together to explore big ideas, solve real problems, and spark meaningful change. A barrier-free community where your skills actually matter.",
  },
  {
    question: "Who can join?",
    answer:
      "If you’re driven by purpose, you belong here. No limitations. A place to connect and grow alongside others on the same path.",
  },
  {
    question: "What does 'Beyond Syllabus' mean?",
    answer:
      "Beyond Syllabus is where learning stops being rigid. It is about picking up real skills, trying new things, and exploring what actually excites you—not just what is written in textbooks.",
  },
  {
    question: "What does 'Beyond Gatekeepers' mean?",
    answer:
      "Beyond Gatekeepers gives everyone a real chance to grow. By lifting each other up, we create a space where anyone with purpose can connect, contribute, and move forward without limitations.",
  },
  {
    question: "What does 'Beyond Borders' mean?",
    answer:
      "Beyond Borders is all about breaking limits. It helps people connect, share ideas, and access opportunities without being held back by geography, systems, or labels. It’s a space where ambition isn’t boxed in and you can dream big, build big, and grow beyond boundaries.",
  },
  {
    question: "How can I contribute?",
    answer: (
      <>
        Click{" "}
        <Link href="/join" className="text-pm-accent font-semibold hover:text-pm-light underline underline-offset-4 transition-colors">
          Join Us
        </Link>
        —that&apos;s all it takes to get started.
      </>
    ),
  },
];

export const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section id="faq" aria-labelledby="faq-heading" className="w-full flex flex-col justify-start items-start gap-6 scroll-mt-28">
      
      {/* Title & Badge */}
      <div className="flex flex-col items-start gap-2.5">
        <span className="inline-block px-3 py-1 rounded-full bg-pm-card border border-pm-card-border text-pm-accent text-xs font-semibold uppercase tracking-wider">
          Got Questions?
        </span>
        <h2 id="faq-heading" className="text-left text-pm-text-primary text-3xl sm:text-4xl md:text-5xl font-bold font-nura tracking-wide">
          Frequently Asked <span className="text-pm-accent">Questions</span>
        </h2>
      </div>

      {/* Subtitle */}
      <p className="w-full text-left text-pm-text-secondary text-sm sm:text-base md:text-lg font-normal font-poppins leading-relaxed">
        Got questions? We&apos;ve got answers. Here are some of the most common things people ask 
        about the Purple Movement.
      </p>

      {/* FAQ List */}
      <div className="w-full flex flex-col gap-3 sm:gap-4 mt-2">
        {FAQs.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <div
              key={index}
              className={`w-full rounded-2xl overflow-hidden border transition-all duration-300 ${
                isOpen 
                  ? "bg-pm-card hover:bg-pm-card-hover border-pm-border-hover shadow-[var(--pm-glow)]" 
                  : "bg-pm-card/60 hover:bg-pm-card-hover border-pm-card-border hover:border-pm-border"
              }`}
            >
              {/* Question button */}
              <button
                type="button"
                id={`faq-question-${index}`}
                aria-expanded={isOpen}
                aria-controls={`faq-answer-${index}`}
                onClick={() => toggleFAQ(index)}
                className="w-full flex items-center justify-between px-5 sm:px-6 py-4 sm:py-5 text-left text-pm-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pm-accent rounded-2xl group cursor-pointer"
              >
                <span className="text-sm sm:text-base md:text-lg font-semibold font-poppins pr-4 text-pm-text-primary group-hover:text-pm-accent transition-colors">
                  {faq.question}
                </span>
                <span className="shrink-0 p-1.5 rounded-full bg-pm-card border border-pm-card-border text-pm-accent group-hover:border-pm-border transition-colors">
                  {isOpen ? (
                    <Minus className="w-4 h-4 sm:w-5 sm:h-5" />
                  ) : (
                    <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
                  )}
                </span>
              </button>

              {/* Answer block with smooth natural height transition */}
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    id={`faq-answer-${index}`}
                    role="region"
                    aria-labelledby={`faq-question-${index}`}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="border-t border-pm-card-border mx-5 sm:mx-6" />
                    <div className="px-5 sm:px-6 pb-5 pt-4 text-pm-text-secondary text-sm sm:text-base font-poppins leading-relaxed">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </section>
  );
};