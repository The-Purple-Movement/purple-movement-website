'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';

export const Contact = () => {
  const [question, setQuestion] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  // Auto-clear status messages after 5 seconds
  useEffect(() => {
    if (submitStatus !== 'idle') {
      const timer = setTimeout(() => {
        setSubmitStatus('idle');
      }, 5000);
      
      return () => clearTimeout(timer);
    }
  }, [submitStatus]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!question.trim()) return;
    
    setIsSubmitting(true);
    setSubmitStatus('idle');
    
    try {
      const response = await fetch('/api/questions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          question: question.trim(),
          timestamp: new Date().toISOString(),
          userAgent: navigator.userAgent,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit question');
      }

      setSubmitStatus('success');
      setQuestion('');
    } catch (error) {
      console.error('Error submitting question:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <section 
      id="contact" 
      aria-labelledby="contact-heading" 
      className="w-full bg-gradient-to-b from-pm-card via-pm-bg-dark to-pm-bg rounded-3xl border border-pm-card-border p-6 sm:p-8 lg:p-8 xl:p-10 shadow-2xl backdrop-blur-md relative overflow-hidden flex flex-col gap-6 scroll-mt-28"
    >
      {/* Ambient background glows */}
      <div className="absolute -top-12 -right-12 w-48 h-48 bg-pm-primary/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-pm-deep/25 rounded-full blur-3xl pointer-events-none" />

      {/* Header with 3D Question Mark Graphic */}
      <div className="flex items-center gap-4 relative z-10">
        <div className="relative w-16 h-16 sm:w-20 sm:h-20 shrink-0">
          <Image 
            src="/images/qtnmark.webp" 
            alt="Question Mark"
            fill
            className="object-contain drop-shadow-[0_8px_16px_var(--pm-glow)]"
            sizes="(max-width: 640px) 64px, 80px"
          />
        </div>
        <div className="flex flex-col items-start gap-1">
          <span className="inline-block px-2.5 py-0.5 rounded-full bg-pm-card border border-pm-card-border text-pm-accent text-xs font-semibold uppercase tracking-wider">
            Ask Us Anything
          </span>
          <h2 id="contact-heading" className="text-2xl sm:text-3xl md:text-4xl font-bold font-nura tracking-wide text-pm-text-primary leading-tight">
            Any <span className="text-pm-accent">Questions?</span>
          </h2>
        </div>
      </div>

      {/* Subtext */}
      <p className="text-sm sm:text-base text-pm-text-secondary font-normal font-poppins leading-relaxed relative z-10">
        Can&apos;t find what you&apos;re looking for? Reach out anytime and our team will get back to you!
      </p>

      {/* Input and Submit Form */}
      <form onSubmit={handleSubmit} className="w-full flex flex-col gap-3.5 relative z-10">
        <div className="flex flex-col gap-3 w-full">
          <label htmlFor="contact-question-input" className="sr-only">Type your question</label>
          <input 
            id="contact-question-input"
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Type your question..."
            className="w-full h-13 sm:h-14 bg-pm-card border border-pm-card-border text-pm-text-primary text-base px-4 py-3 rounded-xl font-poppins placeholder:text-pm-text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pm-accent focus-visible:border-transparent transition"
            disabled={isSubmitting}
          />
          <button
            type="submit"
            disabled={!question.trim() || isSubmitting}
            className={`w-full h-13 sm:h-14 px-6 rounded-xl font-poppins text-base font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pm-accent flex items-center justify-center gap-2 cursor-pointer ${
              question.trim() && !isSubmitting
                ? 'bg-pm-primary hover:bg-pm-primary-hover text-pm-text-primary shadow-[var(--pm-glow)] hover:shadow-[var(--pm-glow-strong)] active:scale-95'
                : 'bg-pm-card/40 text-pm-text-muted border border-pm-card-border cursor-not-allowed'
            }`}
          >
            {isSubmitting ? (
              <div className="flex items-center justify-center gap-2">
                <div className="w-4 h-4 border-2 border-pm-text-primary/30 border-t-pm-text-primary rounded-full animate-spin" />
                <span>Sending...</span>
              </div>
            ) : (
              'Submit Question'
            )}
          </button>
        </div>
        
        {/* Status Messages */}
        {submitStatus === 'success' && (
          <div className="p-3.5 rounded-xl bg-pm-card border border-pm-success/30 text-pm-success text-sm font-poppins flex items-center gap-2">
            <span className="font-bold">✓</span>
            <span>Question submitted successfully! We&apos;ll get back to you soon.</span>
          </div>
        )}
        {submitStatus === 'error' && (
          <div className="p-3.5 rounded-xl bg-pm-card border border-pm-error/30 text-pm-error text-sm font-poppins flex items-center gap-2">
            <span className="font-bold">✗</span>
            <span>Failed to submit question. Please try again.</span>
          </div>
        )}
      </form>
    </section>
  );
};