'use client';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';

export default function SponsorsSection() {
  const t = useTranslations('Index.sponsors');

  // Placeholder logos - in a real project, replace with actual sponsor logos
  const sponsors = [
    { name: "Kemenpora", logo: "/images/sponsors/logo-dummy.png" },
    { name: "KONI", logo: "/images/sponsors/logo-dummy.png" },
    { name: "Wonderful Indonesia", logo: "/images/sponsors/logo-dummy.png" },
    { name: "Sponsor 4", logo: "/images/sponsors/logo-dummy.png" },
    { name: "Sponsor 5", logo: "/images/sponsors/logo-dummy.png" },
    { name: "Sponsor 6", logo: "/images/sponsors/logo-dummy.png" },
  ];

  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-gray-500 font-medium mb-8 uppercase tracking-widest text-sm">
          {t('title')}
        </p>
        
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-70 grayscale hover:grayscale-0 transition-all duration-500">
          {sponsors.map((sponsor, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="h-12 md:h-16 relative w-32 md:w-40 flex items-center justify-center"
            >
              <img 
                src={sponsor.logo} 
                alt={sponsor.name} 
                className="max-h-full max-w-full object-contain mix-blend-multiply"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
