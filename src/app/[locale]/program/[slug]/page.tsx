import {getTranslations} from 'next-intl/server';
import PageHeader from '@/components/PageHeader';
import { programs } from '@/data/programs';
import { notFound } from 'next/navigation';
import { Link } from '@/navigation';
import { ArrowLeft, Calendar, MapPin, Users, CheckCircle2 } from 'lucide-react';

export async function generateMetadata({params: {locale, slug}}: {params: {locale: string, slug: string}}) {
  const t = await getTranslations({locale, namespace: `Index.program.items.${slug}`});
  
  if (!programs.find(p => p.key === slug)) {
    return {};
  }

  return {
    title: t('title'),
    description: t('desc')
  };
}

export default async function ProgramDetailPage({params: {locale, slug}}: {params: {locale: string, slug: string}}) {
  const program = programs.find(p => p.key === slug);

  if (!program) {
    notFound();
  }

  const t = await getTranslations({locale, namespace: `Index.program.items.${slug}`});
  const commonT = await getTranslations({locale, namespace: 'Index.program'});

  return (
    <div className="min-h-screen bg-white">
      <PageHeader 
        title={t('title')} 
        subtitle={commonT('subtitle')}
        image={t('imageUrl')}
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="mb-8">
          <Link href="/program" className="inline-flex items-center text-gray-600 hover:text-faji-blue transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Programs
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            <div className="prose prose-lg max-w-none text-gray-600">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">{t('title')}</h2>
              <p className="lead text-xl mb-6">{t('desc')}</p>
              
              {/* Dummy content for detail explanation */}
              <p className="mb-4">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </p>
              <p className="mb-4">
                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
                Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>

              <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Key Objectives</h3>
              <ul className="space-y-3 list-none pl-0">
                {[1, 2, 3, 4].map((item) => (
                  <li key={item} className="flex items-start">
                    <CheckCircle2 className="w-5 h-5 text-faji-green mt-1 mr-3 flex-shrink-0" />
                    <span>Objective point {item} relating to {t('title')}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100 sticky top-24">
              <div className={`w-12 h-12 rounded-xl ${program.color} flex items-center justify-center mb-6`}>
                <program.icon className="w-6 h-6" />
              </div>
              
              <h3 className="text-xl font-bold text-gray-900 mb-6">Program Details</h3>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <Calendar className="w-5 h-5 text-gray-400 mt-1 mr-3" />
                  <div>
                    <div className="font-medium text-gray-900">Schedule</div>
                    <div className="text-gray-500 text-sm">Year-round program</div>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <MapPin className="w-5 h-5 text-gray-400 mt-1 mr-3" />
                  <div>
                    <div className="font-medium text-gray-900">Location</div>
                    <div className="text-gray-500 text-sm">Various rivers across Indonesia</div>
                  </div>
                </div>

                <div className="flex items-start">
                  <Users className="w-5 h-5 text-gray-400 mt-1 mr-3" />
                  <div>
                    <div className="font-medium text-gray-900">Participants</div>
                    <div className="text-gray-500 text-sm">Open for all levels</div>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-8 border-t border-gray-200">
                <button className="w-full py-3 px-4 bg-faji-blue text-white rounded-lg font-bold hover:bg-faji-blue/90 transition-colors shadow-lg shadow-faji-blue/20">
                  Register Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
