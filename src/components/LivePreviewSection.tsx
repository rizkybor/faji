'use client';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Play, Signal, Radio, ArrowRight } from 'lucide-react';
import { Link } from '@/navigation';
import Image from 'next/image';

export default function LivePreviewSection() {
  const t = useTranslations('Index.live');

  return (
    <section className="relative py-24 bg-slate-950 overflow-hidden">
      {/* Abstract Background Elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-faji-blue/20 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-faji-green/10 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2" />
      
      {/* Dot Pattern Overlay */}
      <div className="absolute inset-0 z-0 opacity-10" 
           style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '30px 30px' }}>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Text Content */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* Live Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-red-500/10 border border-red-500/20 text-red-500 mb-6">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500"></span>
              </span>
              <span className="text-xs font-bold tracking-wider uppercase">
                {t('badge')}
              </span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
              {t('title')}
            </h2>
            <p className="text-lg text-slate-400 mb-8 leading-relaxed max-w-lg">
              {t('description')}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                href="/live" 
                className="group inline-flex items-center justify-center gap-2 bg-white text-slate-950 px-8 py-4 rounded-xl font-bold text-base transition-all hover:bg-gray-100 hover:shadow-lg hover:shadow-white/10 hover:-translate-y-0.5"
              >
                <Play className="w-5 h-5 fill-current" />
                {t('watchNow')}
              </Link>
              <Link 
                href="/live" 
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-semibold text-white border border-white/10 hover:bg-white/5 transition-all"
              >
                Schedule
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Live Stats Simulation */}
            <div className="mt-10 pt-8 border-t border-white/5 flex items-center gap-8 text-sm text-slate-400">
               <div className="flex items-center gap-2">
                 <Radio className="w-4 h-4 text-faji-green" />
                 <span>High Definition 1080p</span>
               </div>
               <div className="flex items-center gap-2">
                 <Signal className="w-4 h-4 text-faji-blue" />
                 <span>Official Broadcast</span>
               </div>
            </div>
          </motion.div>

          {/* Video Preview Card */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            {/* Glow Effect */}
            <div className="absolute -inset-1 bg-gradient-to-tr from-faji-blue to-faji-green rounded-2xl blur-lg opacity-30"></div>
            
            <div className="relative aspect-video rounded-2xl overflow-hidden bg-slate-900 border border-white/10 shadow-2xl group cursor-pointer">
              {/* Thumbnail Image */}
              <Image 
                src="https://images.unsplash.com/photo-1549904625-6ca1bd49c947?q=80&w=2142&auto=format&fit=crop" 
                alt="Live Stream Thumbnail" 
                fill
                className="object-cover opacity-80 group-hover:scale-105 transition-transform duration-700"
              />
              
              {/* Play Button Overlay */}
              <div className="absolute inset-0 bg-black/20 flex items-center justify-center group-hover:bg-black/40 transition-colors">
                <div className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-xl">
                  <Play className="w-8 h-8 text-white fill-white ml-1" />
                </div>
              </div>

              {/* Overlay Info */}
              <div className="absolute top-4 left-4 flex gap-2">
                <div className="bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-md uppercase tracking-wider flex items-center gap-1">
                  LIVE
                </div>
                <div className="bg-black/60 backdrop-blur-sm text-white text-xs font-medium px-2 py-1 rounded-md flex items-center gap-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                  1.2K Viewers
                </div>
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                <h3 className="text-white font-bold text-lg leading-tight">National Rafting Championship 2025</h3>
                <p className="text-gray-300 text-sm mt-1">Day 2 - Citarik River Finals</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
