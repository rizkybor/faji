'use client';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from '@/navigation';
import Image from 'next/image';
import { programs } from '@/data/programs';

export default function ProgramSection() {
  const t = useTranslations('Index.program');

  return (
    <section id="program" className="py-24 bg-gray-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-faji-blue/10 text-faji-blue text-sm font-bold mb-4"
          >
            <span className="w-2 h-2 rounded-full bg-faji-blue"></span>
            {t('subtitle')}
          </motion.div>
          
          <motion.h3 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl lg:text-5xl font-extrabold text-gray-900 mb-6"
          >
            {t('title')}
          </motion.h3>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto"
          >
            {t('description')}
          </motion.p>
        </div>

        {/* Scrolling or Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {programs.slice(0, 3).map((program, index) => (
            <motion.div
              key={program.key}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group bg-gray-50 rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 flex flex-col h-full"
            >
              {/* Image Header */}
              <div className="relative h-56 overflow-hidden">
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors z-10"></div>
                <Image 
                  src={t(`items.${program.key}.imageUrl`)} 
                  alt={t(`items.${program.key}.title`)}
                  fill
                  className="object-cover transform group-hover:scale-110 transition-transform duration-700"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className={`absolute top-4 right-4 p-3 rounded-2xl ${program.color} z-20 shadow-sm backdrop-blur-sm bg-opacity-90`}>
                  <program.icon className="w-6 h-6" />
                </div>
              </div>

              {/* Content */}
              <div className="p-8 flex-1 flex flex-col">
                <h4 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-faji-blue transition-colors">
                  {t(`items.${program.key}.title`)}
                </h4>
                <p className="text-gray-600 mb-6 flex-1 leading-relaxed">
                  {t(`items.${program.key}.desc`)}
                </p>
                <div className="pt-6 border-t border-gray-200">
                  <Link href={`/program/${program.key}`} className="inline-flex items-center text-faji-blue font-bold hover:text-faji-green transition-colors group-hover:translate-x-1 duration-300">
                    {t('cta')} <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Link href="/program" className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-base font-bold rounded-full text-white bg-faji-blue hover:bg-faji-blue/90 md:text-lg transition-all shadow-lg hover:shadow-faji-blue/25">
            {t('cta')}
          </Link>
        </div>
      </div>
    </section>
  );
}
