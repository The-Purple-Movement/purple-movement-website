'use client';
import Image from 'next/image';
import { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { FaXTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa6';
import FeedbackPopup from './FeedbackPopup';

const links = [
  { name: 'Home', href: '/#' },
  { name: 'About', href: '/#about' },
  { name: 'Events', href: '/#events' },
];

const supportLinks = [
  { name: 'T&C', href: '/terms' },
  { name: 'Privacy Policy', href: '/privacy' },
  { name: 'Feedback', action: 'feedback' },
];

export const Footer = () => {
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();

    const lenis = typeof window !== 'undefined' 
      ? (window as unknown as { lenis?: { scrollTo: (target: HTMLElement | number, opts?: Record<string, unknown>) => void } }).lenis 
      : undefined;

    if (href === '/#') {
      if (pathname === '/') {
        if (lenis) {
          lenis.scrollTo(0);
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      } else {
        router.push('/');
      }
      return;
    }

    if (pathname !== '/') {
      router.push(href);
      return;
    }

    const targetId = href.replace('/#', '');
    const element = document.getElementById(targetId);

    if (element) {
      if (lenis) {
        lenis.scrollTo(element, { offset: -80 });
      } else {
        const navbarHeight = 80;
        const elementPosition = element.getBoundingClientRect().top + window.scrollY;
        const offsetPosition = elementPosition - navbarHeight;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }
  };

  return (
    <>
      <footer className="w-full bg-pm-bg-dark rounded-t-3xl sm:rounded-t-[40px] md:rounded-t-[48px] border-t border-pm-card-border/80 px-4 sm:px-6 md:px-8 pt-14 pb-12 relative overflow-hidden shadow-[0_-12px_40px_rgba(0,0,0,0.6)]">
        {/* Subtle top neon ambient rim */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 max-w-4xl h-[1px] bg-gradient-to-r from-transparent via-pm-accent/40 to-transparent pointer-events-none" />
        <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-96 h-40 bg-pm-primary/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-6xl mx-auto relative z-10">
          {/* Mobile Layout - Logo first, then Quick Links and Support side by side */}
          <div className="md:hidden space-y-8">
            {/* Logo, Tagline, and Social Links */}
            <div className="space-y-4 flex flex-col items-start p-4">
              <Image
                width={183}
                height={59}
                className="w-40 h-14"
                src="/logos/logo_pm.webp"
                alt="Logo"
                style={{ width: 'auto' }}
              />
              <h3 className="text-pm-text-primary text-lg font-bold font-poppins">
                The Purple Movement
              </h3>
              <p className="text-pm-text-secondary text-sm font-poppins">
                Beyond Syllabus, Beyond Gatekeepers, Beyond Borders
              </p>
              <div className="flex space-x-4 mt-4">
                <a href="https://www.instagram.com/tpm.live/" target="_blank" rel="noopener noreferrer" aria-label="Follow us on Instagram" className="group p-1">
                  <FaInstagram className="w-6 h-6 text-pm-text-secondary group-hover:text-pm-accent transition-colors" />
                </a>
                <a href="https://x.com/ThePurpleMVMT" target="_blank" rel="noopener noreferrer" aria-label="Follow us on X" className="group p-1">
                  <FaXTwitter className="w-6 h-6 text-pm-text-secondary group-hover:text-pm-accent transition-colors" />
                </a>
                <a href="https://www.linkedin.com/company/the-purple-movement/posts/?feedView=all" target="_blank" rel="noopener noreferrer" aria-label="Connect on LinkedIn" className="group p-1">
                  <FaLinkedinIn className="w-6 h-6 text-pm-text-secondary group-hover:text-pm-accent transition-colors" />
                </a>
              </div>
            </div>

            {/* Quick Links and Support Links side by side */}
            <div className="grid grid-cols-2 gap-6">
              {/* Quick Links - Left side */}
              <div className="space-y-4 flex flex-col items-start pl-4">
                <h4 className="text-left text-pm-text-primary text-base font-bold font-nura tracking-wide leading-relaxed">
                  Quick Links
                </h4>
                <nav className="flex flex-col space-y-2 items-start">
                  {links.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      onClick={(e) => handleLinkClick(e, item.href)}
                      className="text-left text-pm-text-secondary text-sm font-normal font-poppins leading-relaxed hover:text-pm-accent transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-pm-accent rounded"
                    >
                      {item.name}
                    </a>
                  ))}
                </nav>
              </div>

              {/* Support Links - Right side */}
              <div className="space-y-4 flex flex-col items-end pr-4">
                <h4 className="text-right text-pm-text-primary text-base font-bold font-nura tracking-wide leading-relaxed">
                  Support
                </h4>
                <nav className="flex flex-col space-y-2 items-end">
                  {supportLinks.map((item) => (
                    item.action === 'feedback' ? (
                      <button
                        key={item.name}
                        onClick={() => setIsFeedbackOpen(true)}
                        className="text-right text-pm-text-secondary text-sm font-normal font-poppins leading-relaxed hover:text-pm-accent transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-pm-accent rounded cursor-pointer"
                      >
                        {item.name}
                      </button>
                    ) : (
                      <a
                        key={item.name}
                        href={item.href}
                        className="text-right text-pm-text-secondary text-sm font-normal font-poppins leading-relaxed hover:text-pm-accent transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-pm-accent rounded"
                      >
                        {item.name}
                      </a>
                    )
                  ))}
                </nav>
              </div>
            </div>
          </div>

          {/* Desktop Layout - 3 columns */}
          <div className="hidden md:grid md:grid-cols-3 gap-12 items-start">
            {/* Logo, Tagline, and Social Links */}
            <div className="space-y-4 flex flex-col items-start">
              <Image
                width={183}
                height={59}
                className="w-40 h-14"
                src="/logos/logo_pm.webp"
                alt="Logo"
                style={{ width: 'auto' }}
              />
              <h3 className="text-pm-text-primary text-lg sm:text-xl font-bold font-nura tracking-wide">
                The Purple Movement
              </h3>
              <p className="text-pm-text-secondary text-sm sm:text-base font-poppins">
                Beyond Syllabus, Beyond Gatekeepers, Beyond Borders
              </p>
              <div className="flex space-x-4 mt-2">
                <a href="https://www.instagram.com/tpm.live/" target="_blank" rel="noopener noreferrer" aria-label="Follow us on Instagram" className="group p-1">
                  <FaInstagram className="w-6 h-6 text-pm-text-secondary group-hover:text-pm-accent transition-colors" />
                </a>
                <a href="https://x.com/ThePurpleMVMT" target="_blank" rel="noopener noreferrer" aria-label="Follow us on X" className="group p-1">
                  <FaXTwitter className="w-6 h-6 text-pm-text-secondary group-hover:text-pm-accent transition-colors" />
                </a>
                <a href="https://www.linkedin.com/company/the-purple-movement/posts/?feedView=all" target="_blank" rel="noopener noreferrer" aria-label="Connect on LinkedIn" className="group p-1">
                  <FaLinkedinIn className="w-6 h-6 text-pm-text-secondary group-hover:text-pm-accent transition-colors" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div className="space-y-4 flex flex-col items-center">
              <h4 className="text-center text-pm-text-primary text-lg font-bold font-nura tracking-wide leading-relaxed">
                Quick Links
              </h4>
              <nav className="flex flex-col space-y-2.5 items-center">
                {links.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    onClick={(e) => handleLinkClick(e, item.href)}
                    className="text-center text-pm-text-secondary text-base font-normal font-poppins leading-relaxed hover:text-pm-accent transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-pm-accent rounded"
                  >
                    {item.name}
                  </a>
                ))}
              </nav>
            </div>

            {/* Support Links */}
            <div className="space-y-4 flex flex-col items-center">
              <h4 className="text-center text-pm-text-primary text-lg font-bold font-nura tracking-wide leading-relaxed">
                Support
              </h4>
              <nav className="flex flex-col space-y-2.5 items-center">
                {supportLinks.map((item) => (
                  item.action === 'feedback' ? (
                    <button
                      key={item.name}
                      onClick={() => setIsFeedbackOpen(true)}
                      className="text-center text-pm-text-secondary text-base font-normal font-poppins leading-relaxed hover:text-pm-accent transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-pm-accent rounded cursor-pointer"
                    >
                      {item.name}
                    </button>
                  ) : (
                    <a
                      key={item.name}
                      href={item.href}
                      className="text-center text-pm-text-secondary text-base font-normal font-poppins leading-relaxed hover:text-pm-accent transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-pm-accent rounded"
                    >
                      {item.name}
                    </a>
                  )
                ))}
              </nav>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-6 border-t border-pm-card-border/60 relative z-10">
          <p className="text-pm-text-muted text-xs sm:text-sm font-poppins text-center">
            © {new Date().getFullYear()} The Purple Movement. All rights reserved.
          </p>
        </div>
      </footer>

      {/* Feedback Popup */}
      <FeedbackPopup 
        isOpen={isFeedbackOpen} 
        onClose={() => setIsFeedbackOpen(false)} 
      />
    </>
  );
};