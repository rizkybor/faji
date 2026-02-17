'use client';
import { useTranslations, useLocale } from 'next-intl';
import { Link, usePathname } from '@/navigation';
import LanguageSwitcher from './LanguageSwitcher';
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import clsx from 'clsx';
import Image from 'next/image';

export default function Navigation() {
  const t = useTranslations('Index.nav');
  const locale = useLocale();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '/', label: t('home') },
    { href: '/about', label: t('about') },
    { href: '/program', label: t('program') },
    { href: '/gallery', label: t('gallery') },
    { href: '/live', label: t('live'), isLive: true },
  ];

  return (
    <nav
      className={clsx(
        'fixed w-full z-50 transition-all duration-300',
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-md py-2'
          : 'bg-transparent py-4'
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" locale={locale as any} className="flex items-center gap-2 group">
              <div className="relative w-10 h-10">
                <Image 
                  src="/images/logos/logo.png" 
                  alt="FAJI Logo" 
                  fill 
                  className="object-contain"
                  sizes="40px"
                />
              </div>
              <div className="flex flex-col">
                <span className={clsx("text-2xl font-bold tracking-tight transition-colors leading-none", isScrolled ? "text-faji-blue" : "text-white")}>
                  FAJI
                </span>
                <span className={clsx("text-[0.6rem] font-medium tracking-wider transition-colors uppercase", isScrolled ? "text-gray-600" : "text-gray-300")}>
                  Federasi Arung Jeram Indonesia
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-6">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  locale={locale as any}
                  className={clsx(
                    'px-3 py-2 rounded-full text-sm font-medium transition-all duration-200 flex items-center gap-2',
                    pathname === link.href
                      ? 'bg-faji-blue text-white shadow-md'
                      : isScrolled
                        ? 'text-gray-600 hover:text-faji-blue hover:bg-faji-blue/5'
                        : 'text-white/90 hover:text-white hover:bg-white/10'
                  )}
                >
                  {link.isLive && (
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                    </span>
                  )}
                  {link.label}
                </Link>
              ))}
              <div className="pl-4 border-l border-gray-200/20">
                <LanguageSwitcher isScrolled={isScrolled} />
              </div>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
              aria-expanded={isOpen}
              className={clsx(
                "inline-flex items-center justify-center p-2 rounded-md transition-colors focus:outline-none",
                isScrolled ? "text-gray-700 hover:text-faji-blue" : "text-white hover:text-white/80"
              )}
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-xl absolute top-full left-0 w-full border-t border-gray-100">
          <div className="px-4 pt-2 pb-6 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                locale={locale as any}
                onClick={() => setIsOpen(false)}
                className={clsx(
                  'block px-4 py-3 rounded-lg text-base font-medium transition-colors',
                  pathname === link.href
                    ? 'bg-faji-blue/10 text-faji-blue'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-faji-blue'
                )}
              >
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    {link.label}
                  </span>
                  {link.isLive && (
                    <span className="px-2 py-0.5 rounded text-xs font-bold bg-red-100 text-red-600">
                      LIVE
                    </span>
                  )}
                </div>
              </Link>
            ))}
            <div className="pt-4 mt-4 border-t border-gray-100 px-4 flex justify-center">
               <LanguageSwitcher isScrolled={true} variant="toggle" />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
