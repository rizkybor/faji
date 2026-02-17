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
        image="https://images.unsplash.com/photo-1595637729374-631ef9c4da10?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      />
      <ProgramSection />
    </div>
  );
}