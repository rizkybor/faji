import PageHeader from '@/components/PageHeader';
import AboutSection from '@/components/AboutSection';
import MapSection from '@/components/MapSection';
import {getTranslations} from 'next-intl/server';

export async function generateMetadata({params: {locale}}: {params: {locale: string}}) {
  const t = await getTranslations({locale, namespace: 'Index.about'});
 
  return {
    title: t('title'),
    description: t('description')
  };
}

export default async function AboutPage({params: {locale}}: {params: {locale: string}}) {
  const t = await getTranslations({locale, namespace: 'Index.about'});

  return (
    <div className="min-h-screen bg-white">
      <PageHeader 
        title={t('title')} 
        subtitle={t('subtitle')}
        image="https://images.unsplash.com/photo-1508166466920-f65aa51f727c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      />
      <AboutSection />
      {/* Additional content can go here */}
      <section className="py-20 bg-gray-50 border-t border-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h3 className="text-3xl font-bold mb-6 text-gray-900">{t('visiMisi.title')}</h3>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                "{t('visiMisi.content')}"
            </p>
        </div>
      </section>
      
      <MapSection />
    </div>
  );
}