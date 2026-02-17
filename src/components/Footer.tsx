'use client';
import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/navigation';
import { Facebook, Instagram, Twitter, Youtube, Mail, MapPin, Phone, Send } from 'lucide-react';
import Image from 'next/image';

export default function Footer() {
  const t = useTranslations('Index.footer');
  const locale = useLocale();
  const year = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white pt-20 pb-10 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand & Description */}
          <div className="space-y-6">
            <Link href="/" locale={locale as any} className="flex items-center gap-2">
              <div className="relative w-12 h-12">
                 <Image 
                  src="/images/logos/logo.png" 
                  alt="FAJI Logo" 
                  fill 
                  className="object-contain"
                   sizes="48px"
                 />
              </div>
              <span className="text-2xl font-bold tracking-tight">FAJI</span>
              <span className="text-[0.6rem] font-medium tracking-wider uppercase">
                Federasi Arung Jeram Indonesia
              </span>
            </Link>
            <p className="text-gray-400 leading-relaxed">
              {t('description')}
            </p>
            <div className="flex space-x-4">
              <a href="#" aria-label="Instagram" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-faji-blue transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" aria-label="Facebook" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-faji-blue transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" aria-label="YouTube" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-faji-blue transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
              <a href="#" aria-label="Twitter" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-faji-blue transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-6">{t('links')}</h3>
            <ul className="space-y-4">
              <li>
                <Link href="/about" locale={locale as any} className="text-gray-400 hover:text-faji-green transition-colors">
                  {useTranslations('Index.nav')('about')}
                </Link>
              </li>
              <li>
                <Link href="/program" locale={locale as any} className="text-gray-400 hover:text-faji-green transition-colors">
                  {useTranslations('Index.nav')('program')}
                </Link>
              </li>
              <li>
                <Link href="/gallery" locale={locale as any} className="text-gray-400 hover:text-faji-green transition-colors">
                  {useTranslations('Index.nav')('gallery')}
                </Link>
              </li>
              <li>
                <Link href="/live" locale={locale as any} className="text-gray-400 hover:text-faji-green transition-colors">
                  {useTranslations('Index.nav')('live')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-bold mb-6">{t('contact')}</h3>
            <ul className="space-y-4 text-gray-400">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-faji-green flex-shrink-0 mt-1" />
                <span>Gelora Bung Karno, Jakarta, Indonesia</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-faji-green flex-shrink-0" />
                <span>+62 21 1234 5678</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-faji-green flex-shrink-0" />
                <span>info@faji.org</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-bold mb-6">{t('newsletter')}</h3>
            <form className="space-y-4">
              <div className="relative">
                <input 
                  type="email" 
                  aria-label={t('newsletterPlaceholder')}
                  placeholder={t('newsletterPlaceholder')}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg py-3 px-4 text-white focus:outline-none focus:border-faji-blue focus:ring-1 focus:ring-faji-blue transition-colors"
                />
                <button 
                  type="submit" 
                  aria-label={t('subscribe')}
                  className="absolute right-2 top-2 p-1.5 bg-faji-blue rounded-md hover:bg-faji-green transition-colors"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">
            &copy; {year} Federasi Arung Jeram Indonesia. All rights reserved.
          </p>
          <div className="flex space-x-6 text-sm text-gray-500">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
