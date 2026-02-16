'use client';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function GallerySection() {
  const t = useTranslations('Index.gallery');

  const images = [
    { src: "https://images.unsplash.com/photo-1624646580989-9f059e25eb78?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", size: "large" },
    { src: "https://images.unsplash.com/photo-1624646580989-9f059e25eb78?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", size: "small" },
    { src: "https://images.unsplash.com/photo-1624646580989-9f059e25eb78?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", size: "small" },
    { src: "https://images.unsplash.com/photo-1624646580989-9f059e25eb78?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", size: "small" },
    { src: "https://images.unsplash.com/photo-1624646580989-9f059e25eb78?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", size: "small" },
    { src: "https://images.unsplash.com/photo-1624646580989-9f059e25eb78?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", size: "large" }
  ];

  return (
    <section id="gallery" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-faji-green/10 text-faji-green text-sm font-bold mb-4"
          >
            <span className="w-2 h-2 rounded-full bg-faji-green"></span>
            {t('subtitle')}
          </motion.div>
          <motion.h3 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl lg:text-5xl font-extrabold text-gray-900"
          >
            {t('title')}
          </motion.h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[200px]">
          {images.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className={`relative overflow-hidden rounded-2xl group ${
                item.size === 'large' ? 'md:col-span-2 md:row-span-2' : 'md:col-span-1 md:row-span-1'
              }`}
            >
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors z-10"></div>
              <Image 
                src={item.src} 
                alt={`Gallery ${index + 1}`} 
                fill
                className="object-cover transform group-hover:scale-110 transition-transform duration-700"
                sizes={item.size === 'large' ? "(max-width: 768px) 100vw, 50vw" : "(max-width: 768px) 100vw, 25vw"}
              />
              <div className="absolute bottom-4 left-4 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="text-white font-semibold text-sm bg-faji-blue/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg">
                  View Photo
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
