import Hero from '@/components/Hero';
import AboutSection from '@/components/AboutSection';
import ProgramSection from '@/components/ProgramSection';
import GallerySection from '@/components/GallerySection';
import LivePreviewSection from '@/components/LivePreviewSection';
import SponsorsSection from '@/components/SponsorsSection';
import {getTranslations} from 'next-intl/server';

export async function generateMetadata({params: {locale}}: {params: {locale: string}}) {
  const t = await getTranslations({locale, namespace: 'Index'});
 
  return {
    title: t('title'),
    description: t('hero.subtitle')
  };
}

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Hero />
      <SponsorsSection />
      <AboutSection />
      <ProgramSection />
      <LivePreviewSection />
      <GallerySection />
    </div>
  );
}
