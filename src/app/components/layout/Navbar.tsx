'use client';

import { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';

interface NavLink {
  name: string;
  href: string;
  id?: string;
}

const navLinks: NavLink[] = [
  { name: 'Home', href: '/', id: 'hero' },
  { name: 'About', href: '/#about', id: 'about' },
  { name: 'Initiatives', href: '/#flagship-events', id: 'flagship-events' },
  { name: 'Events', href: '/#events', id: 'events' },
  { name: 'FAQ', href: '/#faq', id: 'faq' },
  { name: 'Contact', href: '/#contact', id: 'contact' },
];

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('/');
  const pathname = usePathname();
  const router = useRouter();

  // Scroll detection for navbar background styling
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      if (window.scrollY < 120 && pathname === '/') {
        setActiveSection('/');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [pathname]);

  // Scroll spy for active link indicator on the homepage
  useEffect(() => {
    if (pathname !== '/') {
      setActiveSection(pathname);
      return;
    }

    const sectionIds = ['hero', 'about', 'flagship-events', 'events', 'faq', 'contact'];
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              if (id === 'hero') {
                setActiveSection('/');
              } else {
                setActiveSection(`/#${id}`);
              }
            }
          });
        },
        { rootMargin: '-25% 0px -55% 0px', threshold: 0 }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => {
      observers.forEach((obs) => obs.disconnect());
    };
  }, [pathname]);

  // Handle hash scrolling if navigating to homepage with hash in URL
  useEffect(() => {
    if (pathname === '/' && typeof window !== 'undefined' && window.location.hash) {
      const id = window.location.hash.replace('#', '');
      const el = document.getElementById(id);
      if (el) {
        const timer = setTimeout(() => {
          el.scrollIntoView({ behavior: 'smooth' });
        }, 150);
        return () => clearTimeout(timer);
      }
    }
  }, [pathname]);

  // Smooth scroll handler for nav clicks
  const handleLinkClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, link: NavLink) => {
      // Allow default browser behavior for modifier keys (new tab, etc.)
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

      setIsOpen(false);

      const lenis = typeof window !== 'undefined'
        ? (window as unknown as { lenis?: { scrollTo: (target: HTMLElement | number, opts?: Record<string, unknown>) => void } }).lenis
        : undefined;

      if (link.href === '/') {
        if (pathname === '/') {
          e.preventDefault();
          if (lenis) {
            lenis.scrollTo(0);
          } else {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }
          window.history.pushState(null, '', '/');
          setActiveSection('/');
        } else {
          router.push('/');
        }
        return;
      }

      if (pathname === '/') {
        const targetId = link.id || link.href.replace('/#', '');
        const element = document.getElementById(targetId);

        if (element) {
          e.preventDefault();
          if (lenis) {
            lenis.scrollTo(element, { offset: -80 });
          } else {
            element.scrollIntoView({ behavior: 'smooth' });
          }
          window.history.pushState(null, '', link.href);
          setActiveSection(link.href);
        }
      }
      // If on /join or another route, default Link navigation takes user to /#section properly!
    },
    [pathname, router]
  );

  // Close mobile drawer on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (isOpen && !target.closest('nav')) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [isOpen]);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <nav
      className={`w-full fixed top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'backdrop-blur-xl bg-pm-bg/80 border-b border-pm-card-border shadow-lg shadow-black/40'
          : 'bg-transparent border-b border-transparent'
      }`}
      aria-label="Main Navigation"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-8 md:px-12 py-4 sm:py-5">
        {/* Logo */}
        <div className="shrink-0">
          <Link
            href="/"
            onClick={(e) => handleLinkClick(e, navLinks[0])}
            className="cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pm-accent rounded-lg flex items-center"
            aria-label="The Purple Movement Home"
          >
            <Image
              src="/logos/logo_pm.webp"
              width={110}
              height={44}
              alt="The Purple Movement Logo"
              priority
              className="w-28 sm:w-32 h-auto object-contain"
              sizes="(max-width: 768px) 112px, 128px"
            />
          </Link>
        </div>

        {/* Desktop Nav Items */}
        <div className="hidden md:flex items-center gap-6 lg:gap-8">
          <ul className="flex items-center gap-5 lg:gap-7" role="menubar">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href;

              return (
                <li key={link.name} role="none">
                  <Link
                    href={link.href}
                    onClick={(e) => handleLinkClick(e, link)}
                    role="menuitem"
                    className={`font-semibold text-sm lg:text-base px-2 py-1.5 relative transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pm-accent rounded-md group ${
                      isActive
                        ? 'text-pm-accent'
                        : 'text-pm-text-secondary hover:text-pm-text-primary'
                    }`}
                  >
                    <span>{link.name}</span>
                    {/* Active/Hover bottom underline */}
                    <span
                      className={`absolute left-0 -bottom-1 h-[2px] bg-pm-primary transition-all duration-300 ${
                        isActive ? 'w-full shadow-[var(--pm-glow)]' : 'w-0 group-hover:w-full'
                      }`}
                    />
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Desktop Join Us Button */}
          <Link
            href="/join"
            id="nav-join-btn"
            className="px-5 py-2.5 text-xs sm:text-sm font-bold uppercase tracking-wider text-pm-text-primary bg-pm-primary hover:bg-pm-primary-hover border border-pm-primary/40 rounded-xl shadow-[var(--pm-glow)] hover:shadow-[var(--pm-glow-strong)] transition-all duration-300 hover:scale-105 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pm-accent cursor-pointer font-nura"
          >
            Join Us
          </Link>
        </div>

        {/* Mobile Hamburger Controls */}
        <div className="md:hidden flex items-center gap-3">
          <Link
            href="/join"
            className="px-4 py-2 text-xs font-bold uppercase tracking-wider text-pm-text-primary bg-pm-primary hover:bg-pm-primary-hover rounded-lg shadow-sm font-nura"
          >
            Join Us
          </Link>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 text-pm-text-primary hover:text-pm-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pm-accent rounded-lg border border-pm-card-border bg-pm-card/60 transition-colors cursor-pointer"
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isOpen && (
        <div
          id="mobile-menu"
          className="md:hidden bg-pm-bg-dark/95 backdrop-blur-2xl border-b border-pm-card-border shadow-2xl transition-all duration-300"
          role="navigation"
        >
          <ul className="flex flex-col divide-y divide-pm-card-border/60 py-2">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href;

              return (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    onClick={(e) => handleLinkClick(e, link)}
                    className={`flex items-center justify-between px-6 py-3.5 text-sm font-semibold transition-colors ${
                      isActive
                        ? 'text-pm-accent bg-pm-card/60'
                        : 'text-pm-text-secondary hover:text-pm-text-primary hover:bg-pm-card/40'
                    }`}
                  >
                    <span>{link.name}</span>
                    {isActive && (
                      <span className="w-1.5 h-1.5 rounded-full bg-pm-accent shadow-[var(--pm-glow)]" />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;