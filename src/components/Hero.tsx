'use client';

import { useTranslations } from 'next-intl';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from '@/navigation';
import Image from 'next/image';
import { useRef } from 'react';

export default function Hero() {
  const t = useTranslations('Index.hero');
  const ref = useRef(null);
  
  // Parallax setup
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });
  
  // Parallax effects
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <div ref={ref} className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden bg-gray-900">
      {/* Background Image - Professional, Parallax, High Quality */}
      <motion.div 
        style={{ y, opacity }}
        className="absolute inset-0 z-0"
      >
        <Image
          src="https://images.unsplash.com/photo-1685550903259-96799741df9e?q=80&w=2046&auto=format&fit=crop"
          alt="FAJI Rafting Action"
          fill
          className="object-cover"
          priority
          quality={90}
          sizes="100vw"
        />
        {/* Professional Dark Overlay Gradient for maximum readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/90 via-gray-900/70 to-transparent" />
      </motion.div>

      {/* Content Container - Aligned Left for corporate/org feel */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="max-w-3xl">
          {/* Badge */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-faji-blue/20 border border-faji-blue/30 backdrop-blur-sm mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-faji-green animate-pulse"></span>
            <span className="text-sm font-semibold tracking-widest text-white uppercase">
              {t('badge')}
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6"
          >
            {t('title')}
          </motion.h1>

          {/* Subtitle */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-gray-300 mb-10 leading-relaxed max-w-2xl"
          >
            {t('subtitle')}
          </motion.p>
          
          {/* CTA Buttons */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Link 
              href="/program" 
              className="group inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-faji-blue hover:bg-faji-blue/90 rounded-xl transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-0.5"
            >
              {t('cta')}
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link 
              href="/about" 
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-white/5 border border-white/10 hover:bg-white/10 rounded-xl backdrop-blur-md transition-all duration-300 hover:border-white/20"
            >
              {t('learnMore')}
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Modern Clean Bottom Separator - Smooth Fade to Gray-50 */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-gray-50 via-gray-50/50 to-transparent z-20"></div>
    </div>
  );
}
