import PageHeader from '@/components/PageHeader';
import GallerySection from '@/components/GallerySection';
import {getTranslations} from 'next-intl/server';

export async function generateMetadata({params: {locale}}: {params: {locale: string}}) {
  const t = await getTranslations({locale, namespace: 'Index.gallery'});
 
  return {
    title: t('title'),
    description: t('description')
  };
}

export default async function GalleryPage({params: {locale}}: {params: {locale: string}}) {
  const t = await getTranslations({locale, namespace: 'Index.gallery'});

  return (
    <div className="min-h-screen bg-white">
      <PageHeader 
        title={t('title')} 
        subtitle={t('subtitle')}
        image="https://images.unsplash.com/photo-1709810953776-ee6027ff8104?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      />
      <GallerySection />
    </div>
  );
}