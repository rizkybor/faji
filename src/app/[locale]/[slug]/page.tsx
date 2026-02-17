import PageHeader from '@/components/PageHeader';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';

export async function generateMetadata({params: {locale, slug}}: {params: {locale: string, slug: string}}) {
  const messages: any = await getMessages({locale});
  const page = messages.CustomPages?.[slug];

  if (!page || !page.isVisible) {
    return {};
  }
 
  return {
    title: page.title,
    description: page.description || page.content?.substring(0, 150)
  };
}

export default async function CustomPage({params: {locale, slug}}: {params: {locale: string, slug: string}}) {
  const messages: any = await getMessages({locale});
  const page = messages.CustomPages?.[slug];

  if (!page || !page.isVisible) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white">
      <PageHeader 
        title={page.title} 
        subtitle={page.subtitle || ''}
        image={page.image || "https://images.unsplash.com/photo-1530541930197-ff16ac917b0e?q=80&w=2070&auto=format&fit=crop"}
      />
      <section className="py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg prose-blue max-w-none">
            {/* Simple rendering for now, ideally use a markdown parser if content is markdown */}
            {page.content.split('\n').map((paragraph: string, index: number) => (
              <p key={index} className="mb-4 text-gray-600 leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}