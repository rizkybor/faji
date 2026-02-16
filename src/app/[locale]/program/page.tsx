import PageHeader from '@/components/PageHeader';
import ProgramSection from '@/components/ProgramSection';
import {getTranslations} from 'next-intl/server';

export async function generateMetadata({params: {locale}}: {params: {locale: string}}) {
  const t = await getTranslations({locale, namespace: 'Index.program'});
 
  return {
    title: t('title'),
    description: t('description')
  };
}

export default async function ProgramPage({params: {locale}}: {params: {locale: string}}) {
  const t = await getTranslations({locale, namespace: 'Index.program'});

  return (
    <div className="min-h-screen bg-white">
      <PageHeader 
        title={t('title')} 
        subtitle={t('subtitle')}
        image="https://images.unsplash.com/photo-1569790526975-1d494c312bc9?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzZ8fGFydW5nJTIwamVyYW18ZW58MHx8MHx8fDA%3D"
      />
      <ProgramSection />
    </div>
  );
}