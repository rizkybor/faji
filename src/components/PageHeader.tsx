'use client';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import { useRef } from 'react';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  image?: string;
}

export default function PageHeader({ title, subtitle, image }: PageHeaderProps) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const bgImage = image || "https://images.unsplash.com/photo-1530866495561-507c9faab2ed?q=80&w=2832&auto=format&fit=crop";

  return (
    <div ref={ref} className="relative h-[400px] md:h-[500px] flex items-center justify-center overflow-hidden bg-gray-900">
      <motion.div 
        style={{ y, opacity }}
        className="absolute inset-0 z-0"
      >
        <Image
          src={bgImage}
          alt={title}
          fill
          className="object-cover"
          priority
          quality={90}
        />
        {/* Professional Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/90 via-gray-900/60 to-gray-900/30" />
      </motion.div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full mt-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-3xl"
        >
          {subtitle && (
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white text-sm font-medium mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-faji-green animate-pulse"></span>
              {subtitle}
            </div>
          )}
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
            {title}
          </h1>
          {/* Decorative Line */}
          <div className="w-20 h-1.5 bg-gradient-to-r from-faji-blue to-faji-green rounded-full"></div>
        </motion.div>
      </div>
      
      {/* Smooth Bottom Transition */}
      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-gray-50 to-transparent z-20"></div>
    </div>
  );
}
