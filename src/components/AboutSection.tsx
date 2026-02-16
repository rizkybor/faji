'use client';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Users, Waves, Trophy, Target, Heart } from 'lucide-react';
import Image from 'next/image';

export default function AboutSection() {
  const t = useTranslations('Index.about');

  const stats = [
    { icon: Users, label: t('stats.members'), value: "2000+" },
    { icon: Waves, label: t('stats.rivers'), value: "50+" },
    { icon: Trophy, label: t('stats.events'), value: "12+" },
  ];

  const features = [
    { icon: Target, title: t('features.achievement.title'), desc: t('features.achievement.desc') },
    { icon: Heart, title: t('features.conservation.title'), desc: t('features.conservation.desc') },
  ];

  return (
    <section id="about" className="py-24 bg-gray-50 overflow-hidden relative">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 -mr-24 -mt-24 w-96 h-96 bg-faji-blue/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 -ml-24 -mb-24 w-96 h-96 bg-faji-green/5 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Image Grid */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4 mt-8">
                <div className="relative h-64 rounded-2xl overflow-hidden shadow-lg border border-gray-100 transform hover:scale-105 transition-transform duration-500">
                  <Image 
                    src="https://images.unsplash.com/photo-1568282248650-2aff2b2b1bc9?q=80&w=2067&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                    alt="Rafting Competition" 
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                <div className="relative h-48 rounded-2xl overflow-hidden shadow-lg border border-gray-100 transform hover:scale-105 transition-transform duration-500">
                  <Image 
                    src="https://images.unsplash.com/photo-1568282248650-2aff2b2b1bc9?q=80&w=2067&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                    alt="Rafting Competition" 
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
              </div>
              <div className="space-y-4">
                <div className="relative h-48 rounded-2xl overflow-hidden shadow-lg border border-gray-100 transform hover:scale-105 transition-transform duration-500">
                  <Image 
                    src="https://images.unsplash.com/photo-1568282248650-2aff2b2b1bc9?q=80&w=2067&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                    alt="Rafting Competition" 
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                <div className="relative h-64 rounded-2xl overflow-hidden shadow-lg border border-gray-100 transform hover:scale-105 transition-transform duration-500">
                  <Image 
                    src="https://images.unsplash.com/photo-1568282248650-2aff2b2b1bc9?q=80&w=2067&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                    alt="Rafting Competition" 
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
              </div>
            </div>
            
            {/* Experience Badge */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-full shadow-2xl z-20 text-center w-40 h-40 flex flex-col items-center justify-center border-4 border-gray-50">
              <span className="text-4xl font-black text-faji-blue">25+</span>
              <span className="text-xs font-bold text-gray-500 uppercase tracking-wide">Years of Excellence</span>
            </div>
          </motion.div>

          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-faji-blue/10 text-faji-blue text-sm font-bold mb-6">
              <span className="w-2 h-2 rounded-full bg-faji-blue"></span>
              {t('subtitle')}
            </div>
            <h2 className="text-4xl lg:text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
              {t('title')}
            </h2>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              {t('description')}
            </p>

            {/* Features */}
            <div className="space-y-6 mb-10">
              {features.map((feature, idx) => (
                <div key={idx} className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-faji-green/10 flex items-center justify-center text-faji-green">
                    <feature.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-gray-900 mb-1">{feature.title}</h4>
                    <p className="text-gray-600">{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 border-t border-gray-200 pt-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="font-black text-3xl text-faji-blue mb-1">{stat.value}</div>
                  <div className="text-sm font-medium text-gray-500 uppercase tracking-wider">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
